"use client"

import { NotificationForm } from "@/components/notification-form"
import { NotificationHistory } from "@/components/notification-history"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/hooks/use-language"
import { ArrowLeft, Shield, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
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
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <Bell className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Notification Center</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Set up reminders to help you remember to enable DBT for your bank account
          </p>
        </div>

        <Tabs defaultValue="send" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send Reminder</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="mt-8">
            <NotificationForm />
          </TabsContent>

          <TabsContent value="history" className="mt-8">
            <NotificationHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
