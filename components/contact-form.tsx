"use client"

import React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"

/**
 * ContactForm (styled) — preserves all markup/classes but:
 * - Uses presigned PUT URLs from /api/upload-url to upload files to S3
 * - Sends metadata + presigned GET URLs to /api/contact as JSON
 *
 * Paste this file over the existing components/contact-form.tsx on feat/presigned-uploads
 */

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement | null>(null)

  // Add files to state (dedupe by name+size)
  const pushFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming)
    setFiles((prev) => {
      const combined = [...prev, ...arr]
      // simple dedupe and limit to 20
      const unique: File[] = []
      const seen = new Set<string>()
      for (const f of combined) {
        const key = `${f.name}-${f.size}`
        if (!seen.has(key)) {
          seen.add(key)
          unique.push(f)
        }
      }
      return unique.slice(0, 20)
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      pushFiles(e.target.files)
    }
  }

  // Drag & drop
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const dt = e.dataTransfer
    if (dt && dt.files && dt.files.length) {
      pushFiles(dt.files)
    }
  }
  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = "copy"
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Gather form fields from the form element so we keep existing markup/inputs
      const formEl = e.currentTarget as HTMLFormElement
      const formData = new FormData(formEl)
      const name = String(formData.get("name") ?? "").trim()
      const email = String(formData.get("email") ?? "").trim()
      const hotel = String(formData.get("hotel") ?? "").trim()
      const photoCount = String(formData.get("photoCount") ?? "").trim()
      const message = String(formData.get("message") ?? "").trim()

      // If there are files selected, request presigned URLs and upload
      let fileUrls: string[] = []
      if (files.length > 0) {
        setIsSubmitting(true)
        // Request presigned PUT + GET URLs
        const presignResp = await fetch("/api/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            files: files.map((f) => ({ name: f.name, type: f.type })),
          }),
        })

        const presignJson = await presignResp.json().catch(() => ({}))
        if (!presignResp.ok || !presignJson.ok) {
          console.error("Failed to get presigned URLs", presignJson)
          alert("Failed to prepare file uploads. Please try again.")
          setIsSubmitting(false)
          return
        }

        const results = presignJson.results as Array<{ putUrl: string; getUrl: string }>

        // Upload each file directly to S3 using the returned presigned PUT URL
        await Promise.all(
          results.map(async (r, idx) => {
            const file = files[idx]
            // PUT the file bytes directly to S3
            const putResp = await fetch(r.putUrl, {
              method: "PUT",
              headers: {
                "Content-Type": file.type || "application/octet-stream",
              },
              body: file,
            })
            if (!putResp.ok) {
              throw new Error(`Upload failed for ${file.name}`)
            }
          })
        )

        // Use presigned GET URLs so downstream (Make or server) can download private objects
        fileUrls = results.map((r) => r.getUrl)
      }

      // Build payload to send to /api/contact (JSON)
      const payload = {
        name,
        email,
        hotel,
        photoCount,
        message,
        fileUrls,
        secret: (process.env.NEXT_PUBLIC_MAKE_WEBHOOK_SECRET as string) || undefined,
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const json = await res.json().catch(() => ({}))

      setIsSubmitting(false)

      if (!res.ok) {
        console.error("Submission error", json)
        alert(json.error || "Submission failed")
        return
      }

      setIsSubmitted(true)
      setFiles([])
    } catch (err) {
      console.error("Submit error", err)
      setIsSubmitting(false)
      alert("Submission failed")
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-card border border-border p-6 md:p-10 lg:p-12">
        <p className="text-lg">Thanks — we received your submission.</p>
      </div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-card border border-border p-6 md:p-10 lg:p-12"
    >
      <div className="grid gap-8">
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-muted-foreground">*</span>
              </Label>
              <input
                id="name"
                name="name"
                placeholder="Your name"
                className="h-12 bg-background border-border focus:border-foreground w-full px-4"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-muted-foreground">*</span>
              </Label>
              <input
                id="email"
                name="email"
                placeholder="you@hotel.com"
                className="h-12 bg-background border-border focus:border-foreground w-full px-4"
                required
                type="email"
              />
            </div>
          </motion.div>
        </div>

        {/* Hotel Name & Photo Count Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <div className="space-y-2">
              <Label htmlFor="hotel" className="text-foreground">
                Hotel name <span className="text-muted-foreground">*</span>
              </Label>
              <input
                id="hotel"
                name="hotel"
                placeholder="The Grand Hotel"
                className="h-12 bg-background border-border focus:border-foreground w-full px-4"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
            <div className="space-y-2">
              <Label htmlFor="photoCount" className="text-foreground">
                Number of photos
              </Label>
              <input
                id="photoCount"
                name="photoCount"
                type="number"
                min="1"
                max="50"
                defaultValue={files.length || 2}
                className="h-12 bg-background border-border focus:border-foreground w-full px-4"
              />
            </div>
          </motion.div>
        </div>

        {/* Photo Guidance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-muted/50 border border-border p-5 md:p-6 space-y-3"
        >
          <p className="text-sm text-foreground leading-relaxed">
            Please include photos of the primary areas you want to showcase: lobby, rooms, lounge, pool, exterior, dining, or other signature spaces.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tip: Highlight the spaces that make your hotel unique. The more photos we have, the richer your cinematic walkthrough will be.
          </p>
        </motion.div>

        {/* File Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            ref={dropRef}
            className="border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors cursor-pointer p-8 text-center group"
          >
            <Label className="text-foreground">Upload photos</Label>
            <div className="mx-auto max-w-xl">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3 group-hover:text-foreground transition-colors" />
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG up to 20 files
              </p>
            </div>

            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center gap-2 bg-muted px-3 py-1.5 text-sm"
                  >
                    <span className="truncate max-w-32">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2"
        >
          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message or special requests
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your property or special requests"
              rows={4}
              className="bg-background border-border focus:border-foreground resize-none w-full p-4"
            />
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pt-4"
        >
          <div className="pt-4">
            <Button type="submit" size="lg">
              {isSubmitting ? "Sending..." : "Send my photos"}
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.form>
  )
}

export default ContactForm
