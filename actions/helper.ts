"use server"

import { db } from "@/firebase/firebaseAdmin"
import admin from "firebase-admin"

export async function saveQuestion(question: string) {
  try {
    await db.collection("questions").add({
      text: question,
      createdAt: new Date().toISOString()
    })
  } catch (error) {
    console.error("Error saving question:", error)
  }
}

