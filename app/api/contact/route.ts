/**
 * app/api/contact/route.ts
 *
 * Validates incoming multipart/form-data and forwards it to your Make.com webhook.
 * - Add MAKE_WEBHOOK_URL and optional MAKE_WEBHOOK_SECRET in .env.local
 * - Limits: MAX_FILES, MAX_FILE_BYTES (tweak to your needs)
 *
 * Returns:
 *  - 200 { ok: true, submissionId } on success
 *  - 4xx JSON { error } for validation errors
 *  - 5xx JSON { error } for server errors
 */

import { NextResponse } from "next/server"

const MAX_FILES = 20
const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB per file (tweak if needed)

function genSubmissionId() {
  // Prefer crypto.randomUUID if available, otherwise fallback to timestamp
  try {
    // @ts-ignore - some runtimes expose globalThis.crypto.randomUUID
    return (globalThis.crypto && (globalThis.crypto as any).randomUUID?.()) ?? `s-${Date.now()}`
  } catch {
    return `s-${Date.now()}`
  }
}

export async function POST(request: Request) {
  try {
    // Parse multipart/form-data from the incoming request
    const form = await request.formData()

    // Required text fields
    const name = String(form.get("name") ?? "").trim()
    const email = String(form.get("email") ?? "").trim()
    const hotel = String(form.get("hotel") ?? "").trim()
    const photoCount = String(form.get("photoCount") ?? "").trim()
    const message = String(form.get("message") ?? "").trim()

    // Collect File entries (we accept any File in the form and forward as "photos")
    const files: File[] = []
    for (const [, value] of form.entries()) {
      if (value instanceof File && value.size > 0) {
        files.push(value)
      }
    }

    // Basic validation
    if (!name || !email || !hotel) {
      return NextResponse.json(
        { error: "Missing required fields: name, email and hotel are required." },
        { status: 400 },
      )
    }

    // Very simple email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 })
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json({ error: `Too many files. Maximum ${MAX_FILES} files allowed.` }, { status: 400 })
    }

    // Validate files: type + size, and prepare filenames summary
    const fileSummaries: Array<{ name: string; size: number; type: string }> = []
    for (const file of files) {
      const type = file.type ?? ""
      const size = typeof file.size === "number" ? file.size : 0

      if (!type.startsWith("image/")) {
        return NextResponse.json({ error: `Only image files are allowed (${file.name}).` }, { status: 400 })
      }

      if (size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `File ${file.name} is too large. Max ${MAX_FILE_BYTES} bytes.` }, { status: 400 })
      }

      fileSummaries.push({ name: file.name, size, type })
    }

    // Metadata for Make: submissionId + timestamp + filenames
    const submissionId = genSubmissionId()
    const timestamp = new Date().toISOString()
    const filenames = fileSummaries.map((f) => f.name)

    // Make webhook URL from env
    const makeUrl = process.env.MAKE_WEBHOOK_URL
    if (!makeUrl) {
      console.error("MAKE_WEBHOOK_URL not configured")
      return NextResponse.json({ error: "Server not configured." }, { status: 500 })
    }

    // Build new FormData to forward to Make. (Do NOT set Content-Type header manually.)
    const forward = new FormData()
    forward.append("submissionId", submissionId)
    forward.append("timestamp", timestamp)
    forward.append("name", name)
    forward.append("email", email)
    forward.append("hotel", hotel)
    forward.append("photoCount", photoCount)
    forward.append("message", message)
    forward.append("filenames", JSON.stringify(filenames))
    forward.append("fileCount", String(filenames.length))

    // Optional secret check: include to allow Make to verify origin
    if (process.env.MAKE_WEBHOOK_SECRET) {
      forward.append("secret", process.env.MAKE_WEBHOOK_SECRET)
    }

    // Append files as "photos" (multiple fields with same name)
    // The File objects we received can be appended directly.
    for (const file of files) {
      // In server runtimes File is a Blob-like object; append directly
      forward.append("photos", file as unknown as Blob, file.name)
    }

    // Log a concise summary locally (no file contents)
    console.info("Contact submission:", {
      submissionId,
      timestamp,
      name,
      email,
      hotel,
      fileCount: filenames.length,
    })

    // Forward to Make (no extra headers; fetch will set multipart boundary automatically)
    const resp = await fetch(makeUrl, {
      method: "POST",
      body: forward,
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      console.error("Make webhook error:", resp.status, text)
      return NextResponse.json({ error: "Failed to forward submission to Make." }, { status: 502 })
    }

    // Success
    return NextResponse.json({ ok: true, submissionId })
  } catch (err) {
    console.error("Error in /api/contact:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
