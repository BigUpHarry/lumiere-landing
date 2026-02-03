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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles].slice(0, 20))
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
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
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-2"
          >
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
          <Label className="text-foreground">Upload photos</Label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors cursor-pointer p-8 text-center group"
          >
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
                  key={index}
                  className="flex items-center gap-2 bg-muted px-3 py-1.5 text-sm"
                >
                  <span className="truncate max-w-32">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2"
        >
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
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pt-4"
        >
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full md:w-auto bg-foreground text-background hover:bg-foreground/90 px-12 h-12 text-sm disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send my photos"}
          </Button>
        </motion.div>
      </div>
    </motion.form>
  )
}
