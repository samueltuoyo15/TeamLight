"use client"

import { useState } from "react"
import { savePrayerPoint } from "@/actions/savePrayer"

export default function Home() {
  const [prayerPoint, setPrayerPointt] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await savePrayerPoint(prayerPoint)
    setPrayerPointt("")
    setLoading(false)
  }

  return (
    <section className="p-4 min-h-screen flex flex-col justify-center items-center">
      Hola 👋 send prayer points here

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <textarea
          type="text"
          value={prayerPoint}
          onChange={(e) => setPrayerPointt(e.target.value)}
          className="text-black p-2 rounded-lg w-64 h-[130px]"
        />
        <button
          type="submit"
          className="cursor-pointer w-full rounded-2xl text-center p-2 bg-[#308CD8] text-white"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
    </section>
  )
}