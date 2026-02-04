"use client"

import React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, Check, X } from "lucide-react"

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formEl = e.currentTarget as HTMLFormElement
      const formData = new FormData(formEl)

      // Append files from state explicitly (ensure 'photos' field)
      files.forEach((file) => formData.append("photos", file))

      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="bg-card border border-border p-8 md:p-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-foreground" />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          Thank you
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          We'll review your photos and send a cinematic demo in 1–3 days.
        </p>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className="bg-card border border-border p-6 md:p-10 lg:p-12"
    >
      <div className="grid gap-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Name <span className="text-muted-foreground">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="h-12 bg-background border-border focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email <span className="text-muted-foreground">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@hotel.com"
              className="h-12 bg-background border-border focus:border-foreground"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="hotel" className="text-foreground">
              Hotel name <span className="text-muted-foreground">*</span>
            </Label>
            <Input
              id="hotel"
              name="hotel"
              type="text"
              required
              placeholder="The Grand Hotel"
              className="h-12 bg-background border-border focus:border-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoCount" className="text-foreground">
              Number of photos
            </Label>
            <Input
              id="photoCount"
              name="photoCount"
              type="number"
              placeholder="10–20 recommended"
              min="1"
              max="50"
              className="h-12 bg-background border-border focus:border-foreground"
            />
          </div>
        </div>

        <div className="bg-muted/50 border border-border p-5 md:p-6 space-y-3">
          <p className="text-sm text-foreground leading-relaxed">
            Please include photos of the primary areas you want to showcase: lobby, rooms, lounge, pool, exterior, dining, or other signature spaces.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tip: Highlight the spaces that make your hotel unique. The more photos we have, the richer your cinematic walkthrough will be.
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          ref={dropRef}
          className="border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors cursor-pointer p-8 text-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            name="photos"
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

        <div className="space-y-2">
          <Label htmlFor="message" className="text-foreground">
            Message or special requests
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your hotel or any specific requirements..."
            rows={4}
            className="bg-background border-border focus:border-foreground resize-none"
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90 px-12 h-12 text-sm disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send my photos"}
          </Button>
        </div>
      </div>
    </motion.form>
  )
}
