import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.S3_REGION;
const BUCKET = process.env.S3_BUCKET;
if (!BUCKET || !REGION) console.warn('S3_BUCKET or S3_REGION not set in env');

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const files = Array.isArray(body.files) ? body.files : [];
    const putExpiresIn = typeof body.putExpiresIn === 'number' ? body.putExpiresIn : 900; // seconds
    const getExpiresIn = typeof body.getExpiresIn === 'number' ? body.getExpiresIn : 3600; // seconds

    const results = await Promise.all(
      files.map(async (f: { name: string; type?: string }) => {
        const timestamp = Date.now();
        const safeName = f.name ? f.name.replace(/[^a-zA-Z0-9._-]/g, '_') : 'file';
        const key = `uploads/${timestamp}_${Math.random().toString(36).slice(2, 8)}_${safeName}`;

        const putCmd = new PutObjectCommand({
          Bucket: BUCKET,
          Key: key,
          ContentType: f.type || 'application/octet-stream',
        });
        const putUrl = await getSignedUrl(s3, putCmd, { expiresIn: putExpiresIn });

        const getCmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
        const getUrl = await getSignedUrl(s3, getCmd, { expiresIn: getExpiresIn });

        const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

        return { key, putUrl, getUrl, publicUrl };
      })
    );

    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    console.error('upload-url error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
