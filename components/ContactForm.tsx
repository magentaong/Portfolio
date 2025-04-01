"use client"

import { useState } from "react"
import Image from "next/image"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    setLoading(false)

    if (data.success) {
      setSuccess(true)
      setForm({ name: "", email: "", message: "" })
    } else {
      setError(data.error || "Something went wrong.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-orange-500/30 px-3 py-2 bg-background/60 backdrop-blur-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-orange-500/30 px-3 py-2 bg-background/60 backdrop-blur-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full min-h-[120px] rounded-md border border-orange-500/30 px-3 py-2 bg-background/60 backdrop-blur-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {loading && (
        <div className="flex justify-center pt-4">
          <Image
            src="/images/cat-typing.gif"
            alt="Sending..."
            width={60}
            height={60}
            className="rounded-md"
          />
        </div>
      )}

      {success && <p className="text-green-500">Message sent!</p>}
      {error && <p className="text-red-500"> {error}</p>}
    </form>
  )
}
