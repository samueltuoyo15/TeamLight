"use client"

import { useState, useEffect } from "react"
import { savePrayerPoint, likePrayer, getAllPrayers } from "@/actions/helper"
import { toast, Toaster } from "sonner"

interface Prayer {
  id: string
  text: string
  likes: number
  createdAt: string
}


export default function Home() {
  const [prayerPoint, setPrayerPoint] = useState("")
  const [loading, setLoading] = useState(false)
  const [prayers, setPrayers] = useState<Prayer[]>([])

  useEffect(() => {
    fetchPrayers()
  }, [])

  const fetchPrayers = async () => {
    const data = await getAllPrayers()
    setPrayers(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prayerPoint.trim()) return
    setLoading(true)
    await savePrayerPoint(prayerPoint)
    setPrayerPoint("")
    setLoading(false)
    fetchPrayers()
    toast.success("Prayer posted successfully 🙏")
  }

  const handleLike = async (id: string) => {
    await likePrayer(id)
    setPrayers(prayers.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <section className="p-6 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-white">
      <Toaster position="top-center" richColors />

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
        🙏 Share Your Prayer Request 
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-5">
        <textarea
          value={prayerPoint}
          onChange={(e) => setPrayerPoint(e.target.value)}
          className="text-black p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Write your prayer here..."
        />
        <button
          type="submit"
          className="w-full mt-3 py-2 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Prayer"}
        </button>
      </form>

      <div className="mt-8 w-full max-w-md flex flex-col gap-6">
        {prayers.length === 0 ? (
          <p className="text-gray-500 text-center">No prayer points yet...</p>
        ) : (
          prayers.map((prayer) => (
            <div key={prayer.id} className="relative p-6 rounded-xl shadow-lg text-white text-center bg-gradient-to-r from-gray-800 to-gray-600">
              <p className="text-lg italic font-semibold">&ldquo;{prayer.text}&rdquo;</p>
              <p className="text-sm text-gray-300 mt-2">
                Posted on {new Date(prayer.createdAt).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <button onClick={() => handleLike(prayer.id)} className="mt-3 flex items-center gap-1 text-lg">
                <span className={prayer.likes > 0 ? "text-red-500" : "text-gray-300"}>❤️</span>
                <span>{prayer.likes}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}