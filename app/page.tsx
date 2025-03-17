"use client"

import { useState, useEffect } from "react"
import { savePrayerPoint, likePrayer, getAllPrayers } from "@/actions/helper"

export default function Home() {
  const [prayerPoint, setPrayerPoint] = useState("")
  const [loading, setLoading] = useState(false)
  const [prayers, setPrayers] = useState<any[]>([])

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
  }

  const handleLike = async (id: string) => {
    await likePrayer(id)
    setPrayers(prayers.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <section className="p-4 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold">Hola 👋 Send Prayer Points Here</h1>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <textarea
          value={prayerPoint}
          onChange={(e) => setPrayerPoint(e.target.value)}
          className="text-black p-2 rounded-lg w-64 h-[130px]"
          placeholder="Write your prayer here..."
        />
        <button
          type="submit"
          className="cursor-pointer w-full rounded-2xl text-center p-2 bg-[#308CD8] text-white transition duration-300 hover:bg-[#256ba5]"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      <div className="mt-8 w-full max-w-md flex flex-col gap-4">
        {prayers.length === 0 ? (
          <p className="text-gray-400 text-center">No prayer points yet...</p>
        ) : (
          prayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white text-black p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <p className="text-sm">{prayer.text}</p>
              <button
                onClick={() => handleLike(prayer.id)}
                className="flex items-center gap-1"
              >
                <span className={prayer.likes > 0 ? "text-red-500" : "text-gray-400"}>
                  ❤️
                </span>
                <span className="text-sm">{prayer.likes}</span>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}