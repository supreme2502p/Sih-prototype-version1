"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-2 bg-transparent">
      <Languages className="h-4 w-4" />
      {language === "en" ? "हिंदी" : "English"}
    </Button>
  )
}
