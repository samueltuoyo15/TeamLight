"use client"

import { useState } from "react"
import { saveQuestion } from "@/actions/helper"
import { toast, Toaster } from "sonner"

export default function Home() {
  const [questionText, setQuestionText] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!questionText.trim()) return
    setLoading(true)
    await saveQuestion(questionText)
    setQuestionText("")
    setLoading(false)
    toast.success("Question posted successfully ")
  }

  return (
    <section className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-white">
      <Toaster position="top-center" richColors />

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
        ❓ Ask a Question
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-5">
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="text-black p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="What's on your mind? Ask a question..."
        />
        <button
          type="submit"
          className="w-full mt-3 py-2 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </form>
    </section>
  )
}
