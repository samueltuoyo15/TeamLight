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
    toast.success("Question sent successfully")
  }

  return (
    <section className="p-6 min-h-screen flex flex-col items-center bg-neutral-100">
      <Toaster position="top-center" richColors />

      <h1 className="text-3xl font-bold text-center mb-6 text-neutral-800">
        ❓ Ask a Question
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white border border-gray-200 shadow-sm rounded-md p-6">
        <label htmlFor="question" className="block text-sm font-medium text-neutral-700 mb-2">
          Your question
        </label>
        <textarea
          id="question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-neutral-600 resize-none"
          placeholder="What do you want to ask?"
        />
        <button
          type="submit"
          className="w-full mt-4 py-2 rounded-md bg-neutral-800 text-white text-sm font-medium hover:bg-neutral-900 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Question"}
        </button>
      </form>
    </section>
  )
}
