"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageToggle } from "@/components/language-toggle"
import { AccountComparison } from "@/components/account-comparison"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"
import { useLanguage } from "@/hooks/use-language"
import { ArrowRight, Shield, Smartphone, BookOpen, Bell } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <PWAInstallPrompt />
      <OfflineIndicator />

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">{t("appTitle")}</h1>
          </div>
          <LanguageToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">{t("tagline")}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">{t("dbtDescription")}</p>
          <Link href="/check">
            <Button size="lg" className="text-lg px-8 py-6">
              {t("checkAccount")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Account Comparison */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">{t("whatIsDBT")}</h3>
          <AccountComparison />
        </section>

        {/* How to Enable DBT */}
        <section className="mb-12">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("howToEnable")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">{t("visitBank")}</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit your nearest bank branch with required documents
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">{t("submitForm")}</h4>
                  <p className="text-sm text-muted-foreground">Fill and submit the DBT enablement form</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">{t("verifyDetails")}</h4>
                  <p className="text-sm text-muted-foreground">Bank will verify your Aadhaar and account details</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6">
          <Link href="/check">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("checkAccount")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">Quickly verify your account status</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/tutorial">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("tutorial")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">Step-by-step guide to enable DBT</CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/notifications">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Bell className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>{t("notifications")}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">Get reminders and updates</CardDescription>
              </CardContent>
            </Card>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">Built to help citizens access government benefits easily</p>
        </div>
      </footer>
    </div>
  )
}
