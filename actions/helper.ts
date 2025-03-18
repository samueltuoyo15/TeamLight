"use server"

import { db } from "@/firebase/firebaseAdmin"
import admin from "firebase-admin"

export async function savePrayerPoint(prayer: string) {
  try {
    await db.collection("prayers").add({
      text: prayer,
      createdAt: new Date().toISOString(),
      likes: 0
    })
  } catch (error) {
    console.error("Error saving prayer:", error)
  }
}

interface Prayer {
  id: string
  text: string
  likes: number
  createdAt: string
}

export async function getAllPrayers(): Promise<Prayer[]> {
  try {
    const snapshot = await db.collection("prayers").orderBy("createdAt", "desc").get()

    return snapshot.docs.map(doc => {
      const data = doc.data() as Prayer
      return {
        id: doc.id,
        text: data.text || "",
        likes: data.likes || 0,
        createdAt: data.createdAt || new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Error fetching prayers:", error)
    return []
  }
}

export async function likePrayer(prayerId: string) {
  try {
    const prayerRef = db.collection("prayers").doc(prayerId)
    await prayerRef.update({ likes: admin.firestore.FieldValue.increment(1) })
  } catch (error) {
    console.error("Error liking prayer:", error)
  }
}