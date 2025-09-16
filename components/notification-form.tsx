"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/use-language"
import { apiClient } from "@/lib/api-client"
import { MessageSquare, Phone, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function NotificationForm() {
  const { t } = useLanguage()
  const [phone, setPhone] = useState("")
  const [notificationType, setNotificationType] = useState<"sms" | "whatsapp">("sms")
  const [customMessage, setCustomMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [errors, setErrors] = useState<{ phone?: string; api?: string }>({})

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length < 10 || cleaned.length > 12) {
      return "Phone number must be 10-12 digits"
    }
    return null
  }

  const defaultMessages = {
    sms: "Reminder: Please visit your bank to enable DBT for your account. This will help you receive government benefits directly.",
    whatsapp:
      "🏦 DBT Reminder: Visit your bank branch to enable Direct Benefit Transfer. Get government subsidies directly in your account! 💰",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const phoneError = validatePhone(phone)
    if (phoneError) {
      setErrors({ phone: phoneError })
      return
    }

    setErrors({})
    setIsLoading(true)
    setResult(null)

    const message = customMessage.trim() || defaultMessages[notificationType]

    const response = await apiClient.sendNotification({
      phone: phone.replace(/\D/g, ""),
      type: notificationType,
      message,
    })

    setIsLoading(false)

    if (response.success) {
      setResult({
        success: true,
        message: response.message || "Notification scheduled successfully!",
      })
      // Reset form
      setPhone("")
      setCustomMessage("")
    } else {
      setErrors({
        api: response.error || "Failed to schedule notification. Please try again.",
      })
    }
  }

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const limited = cleaned.slice(0, 12)

    // Format as +91 XXXXX XXXXX for Indian numbers
    if (limited.length > 10) {
      return `+${limited.slice(0, 2)} ${limited.slice(2, 7)} ${limited.slice(7)}`
    } else if (limited.length > 5) {
      return `${limited.slice(0, 5)} ${limited.slice(5)}`
    }
    return limited
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("notifications")}</CardTitle>
          <CardDescription>Get reminders to enable DBT for your bank account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your mobile number"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            </div>

            <div className="space-y-3">
              <Label>Notification Type</Label>
              <RadioGroup
                value={notificationType}
                onValueChange={(value) => setNotificationType(value as "sms" | "whatsapp")}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer">
                    <Phone className="h-4 w-4" />
                    SMS
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="whatsapp" id="whatsapp" />
                  <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Custom Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder={`Default: ${defaultMessages[notificationType]}`}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">Leave empty to use default message</p>
            </div>

            {errors.api && (
              <Alert className="border-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.api}</AlertDescription>
              </Alert>
            )}

            {result && (
              <Alert className="border-primary bg-primary/5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary">{result.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                `Send ${notificationType.toUpperCase()} Reminder`
              )}
            </Button>
          </form>

          {/* Feature Info */}
          <div className="mt-8 p-4 bg-secondary/10 rounded-lg">
            <h4 className="font-semibold mb-2 text-secondary">🚀 Coming Soon Features:</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Automatic reminders based on account status</li>
              <li>• Push notifications for status updates</li>
              <li>• Integration with government DBT portal</li>
              <li>• Multi-language notification support</li>
            </ul>
          </div>

          {/* Demo Notice */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Demo Mode</h4>
            <p className="text-sm text-muted-foreground">
              This is a demonstration. No actual SMS or WhatsApp messages will be sent. In a real implementation, this
              would integrate with SMS/WhatsApp APIs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
