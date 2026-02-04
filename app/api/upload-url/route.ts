/**
 * app/api/upload-url/route.ts
 *
 * POST JSON { filename, contentType }
 * Returns { url, key, publicUrl } where:
 * - url: presigned PUT URL to upload the file directly
 * - key: object key in the bucket
 * - publicUrl: the publicly accessible URL (depends on bucket settings)
 *
 * Note: configure AWS credentials and S3_BUCKET/S3_REGION in Vercel env vars.
 */

import { NextResponse } from "next/server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const BUCKET = process.env.S3_BUCKET
const REGION = process.env.S3_REGION

if (!BUCKET || !REGION) {
  console.warn("S3_BUCKET or S3_REGION not configured")
}

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

function sanitizeKey(name: string) {
  // Basic sanitize - remove spaces and control chars
  return name.replace(/[^A-Za-z0-9_\-./]/g, "-")
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const filename = String(body.filename ?? "file")
    const contentType = String(body.contentType ?? "application/octet-stream")

    if (!BUCKET || !REGION) {
      return NextResponse.json({ error: "S3 not configured" }, { status: 500 })
    }

    const key = `${Date.now()}-${sanitizeKey(filename)}`

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
      // ACL: 'public-read', // you can enable if desired and bucket allows it
    })

    const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }) // 5 minutes

    // Construct public URL - adjust if you use a custom domain or different style endpoint
    // For most regions:
    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${encodeURIComponent(key)}`

    return NextResponse.json({ url, key, publicUrl })
  } catch (err) {
    console.error("Error in /api/upload-url:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
