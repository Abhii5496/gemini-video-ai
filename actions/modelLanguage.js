"use server"
// Model language handling using cookies
import { cookies } from "next/headers"

const LANG_COOKIE_KEY = "roopa_lang"

// Server-side: set language cookie using Next.js cookies API best practices
export async function setModelLanguage(lang) {
  const cookieStore = cookies()
  cookieStore.set({
    name: LANG_COOKIE_KEY,
    value: lang,
  })
}

// Server-side: get language cookie using Next.js cookies API best practices
export async function getModelLanguage() {
  const cookieStore = cookies()
  return cookieStore.get(LANG_COOKIE_KEY)?.value || "hi"
}
