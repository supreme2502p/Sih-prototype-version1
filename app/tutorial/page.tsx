"use client"

import { InteractiveTutorial } from "@/components/interactive-tutorial"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TutorialPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-primary">{t("appTitle")}</h1>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <InteractiveTutorial />
      </main>
    </div>
  )
}
