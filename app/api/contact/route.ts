/**
 * Updated app/api/contact/route.ts
 * Expects form-data with fields: name, email, hotel, photoCount, message, and repeated fileUrls fields.
 * Forwards metadata + fileUrls to Make webhook (no file binary proxying).
 */

import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const form = await request.formData()

    const name = String(form.get("name") ?? "").trim()
    const email = String(form.get("email") ?? "").trim()
    const hotel = String(form.get("hotel") ?? "").trim()
    const photoCount = String(form.get("photoCount") ?? "").trim()
    const message = String(form.get("message") ?? "").trim()

    // Collect fileUrls - repeated fields named "fileUrls"
    const fileUrls: string[] = []
    for (const [key, value] of form.entries()) {
      if (key === "fileUrls") {
        fileUrls.push(String(value))
      }
    }

    if (!name || !email || !hotel) {
      return NextResponse.json({ error: "Missing required fields: name, email and hotel are required." }, { status: 400 })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 })
    }

    // Add metadata
    const submissionId = `s-${Date.now()}`
    const timestamp = new Date().toISOString()

    const makeUrl = process.env.MAKE_WEBHOOK_URL
    if (!makeUrl) {
      console.error("MAKE_WEBHOOK_URL not configured")
      return NextResponse.json({ error: "Server not configured." }, { status: 500 })
    }

    // Forward to Make as form-data so Make receives fields easily
    const forward = new FormData()
    forward.append("submissionId", submissionId)
    forward.append("timestamp", timestamp)
    forward.append("name", name)
    forward.append("email", email)
    forward.append("hotel", hotel)
    forward.append("photoCount", photoCount)
    forward.append("message", message)
    forward.append("fileCount", String(fileUrls.length))
    forward.append("filenames", JSON.stringify(fileUrls.map((u) => u.split("/").pop() || u)))

    // append each file URL, Make will receive them as text fields
    fileUrls.forEach((u) => forward.append("fileUrls", u))

    if (process.env.MAKE_WEBHOOK_SECRET) {
      forward.append("secret", process.env.MAKE_WEBHOOK_SECRET)
    }

    console.info("Contact submission (urls):", { submissionId, timestamp, name, email, hotel, fileCount: fileUrls.length })

    const resp = await fetch(makeUrl, { method: "POST", body: forward })

    if (!resp.ok) {
      const text = await resp.text().catch(() => "")
      console.error("Make webhook responded non-OK:", resp.status, text)
      return NextResponse.json({ error: "Failed to forward submission." }, { status: 502 })
    }

    return NextResponse.json({ ok: true, submissionId })
  } catch (err) {
    console.error("Error in /api/contact:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
