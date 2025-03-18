"use client"

import { useState, useEffect } from "react"
import { savePrayerPoint, likePrayer, getAllPrayers } from "@/actions/helper"

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
    const data: Prayer[] = await getAllPrayers()
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
  }

  const handleLike = async (id: string) => {
    await likePrayer(id)
    setPrayers(prayers.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <section className="p-6 min-h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">🙏 Share Your Prayer Points</h1>

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
            <div key={prayer.id} className="p-5 bg-white rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-gray-700">"{prayer.text}"</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(prayer.createdAt).toLocaleDateString()}
              </p>
              <button 
                onClick={() => handleLike(prayer.id)} 
                className="mt-3 flex items-center gap-1 text-lg text-gray-600 hover:text-red-500 transition"
              >
                ❤️ <span>{prayer.likes}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}