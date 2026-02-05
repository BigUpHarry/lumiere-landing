import React, { useState } from 'react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hotel, setHotel] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Preparing upload...');

    const fileArray = files ? Array.from(files) : [];

    const presignResp = await fetch('/api/upload-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        files: fileArray.map((f) => ({ name: f.name, type: f.type })),
      }),
    });
    const presignJson = await presignResp.json();
    if (!presignJson.ok) {
      setStatus('Failed to get upload URLs');
      console.error(presignJson);
      return;
    }

    const results = presignJson.results;
    setStatus('Uploading files to S3...');
    await Promise.all(
      results.map(async (r: any, idx: number) => {
        const file = fileArray[idx];
        await fetch(r.putUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
          },
          body: file,
        });
      })
    );

    // Use the presigned GET URLs so Make (or server) can download private objects
    const fileUrls = results.map((r: any) => r.getUrl);

    setStatus('Submitting form...');
    const contactResp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        hotel,
        message,
        fileUrls,
        secret: (process.env.NEXT_PUBLIC_MAKE_WEBHOOK_SECRET as string) || undefined,
      }),
    });
    const contactJson = await contactResp.json();
    if (!contactJson.ok) {
      setStatus('Submission failed');
      console.error(contactJson);
      return;
    }

    setStatus('Submitted — check your inbox for confirmation (if configured)');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required type="email" />
      <input value={hotel} onChange={(e)=>setHotel(e.target.value)} placeholder="Hotel (optional)" />
      <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message" />
      <input type="file" multiple onChange={(e)=>setFiles(e.target.files)} />
      <button type="submit">Send</button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default ContactForm;
