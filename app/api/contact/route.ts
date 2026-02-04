import { NextResponse } from 'next/server';

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
const MAKE_WEBHOOK_SECRET = process.env.MAKE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { name, email, message, fileUrls, secret } = payload;

    if (MAKE_WEBHOOK_SECRET && secret !== MAKE_WEBHOOK_SECRET) {
      return NextResponse.json({ ok: false, error: 'invalid secret' }, { status: 401 });
    }

    const submission = {
      timestamp: new Date().toISOString(),
      submissionId: `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`,
      name,
      email,
      message,
      fileUrls: Array.isArray(fileUrls) ? fileUrls : [],
    };

    if (!MAKE_WEBHOOK_URL) {
      console.warn('MAKE_WEBHOOK_URL not set; skipping webhook forward');
      return NextResponse.json({ ok: true, submission });
    }

    const resp = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Make webhook failed', resp.status, text);
      return NextResponse.json({ ok: false, error: 'webhook failed' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, submission });
  } catch (err: any) {
    console.error('contact route error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
