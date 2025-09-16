"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { translations, type Language } from "@/lib/translations"

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof translations.en) => string
}

export const useLanguage = create<LanguageStore>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: keyof typeof translations.en) => {
        const { language } = get()
        return translations[language][key] || translations.en[key]
      },
    }),
    {
      name: "dbt-language-storage",
    },
  ),
)
