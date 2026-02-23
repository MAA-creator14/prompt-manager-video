"use server"

import fs from "fs/promises"
import path from "path"
import { randomUUID } from "crypto"

const DATA_FILE = path.join(process.cwd(), "data", "messages.json")

type ContactResult =
  | { success: true }
  | { success: false; errors: Partial<Record<"name" | "email" | "message", string>> }

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitContact(formData: {
  name: string
  email: string
  message: string
}): Promise<ContactResult> {
  const errors: Partial<Record<"name" | "email" | "message", string>> = {}

  if (!formData.name.trim()) errors.name = "Name is required."
  if (!formData.email.trim()) {
    errors.email = "Email is required."
  } else if (!isValidEmail(formData.email.trim())) {
    errors.email = "Please enter a valid email address."
  }
  if (!formData.message.trim()) errors.message = "Message is required."

  if (Object.keys(errors).length > 0) return { success: false, errors }

  const entry = {
    id: randomUUID(),
    name: formData.name.trim(),
    email: formData.email.trim(),
    message: formData.message.trim(),
    createdAt: new Date().toISOString(),
  }

  let messages: unknown[] = []
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8")
    messages = JSON.parse(raw)
  } catch {
    // File doesn't exist yet — start fresh
  }

  messages.push(entry)
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2))

  return { success: true }
}
