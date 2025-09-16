"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Phone, Clock, CheckCircle, RefreshCw } from "lucide-react"

interface NotificationRecord {
  id: string
  phone: string
  type: "sms" | "whatsapp"
  message: string
  status: "scheduled" | "sent" | "failed"
  scheduledAt: string
  sentAt?: string
}

export function NotificationHistory() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock notification history
  const mockNotifications: NotificationRecord[] = [
    {
      id: "1",
      phone: "****1234",
      type: "sms",
      message: "Reminder: Please visit your bank to enable DBT for your account.",
      status: "sent",
      scheduledAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30000).toISOString(),
    },
    {
      id: "2",
      phone: "****5678",
      type: "whatsapp",
      message: "🏦 DBT Reminder: Visit your bank branch to enable Direct Benefit Transfer.",
      status: "scheduled",
      scheduledAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      phone: "****9012",
      type: "sms",
      message: "Your DBT account status has been updated. Check the app for details.",
      status: "failed",
      scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  useEffect(() => {
    // Load mock data
    setNotifications(mockNotifications)
  }, [])

  const refreshHistory = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications)
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "failed":
        return <RefreshCw className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>Your recent notification activity</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={refreshHistory} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No notifications sent yet</p>
            <p className="text-sm">Your notification history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {notification.type === "sms" ? (
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{notification.phone}</span>
                    <Badge variant="outline" className="text-xs">
                      {notification.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(notification.status)}
                    <Badge className={`text-xs ${getStatusColor(notification.status)}`}>{notification.status}</Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{notification.message}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Scheduled: {formatTime(notification.scheduledAt)}</span>
                  {notification.sentAt && <span>Sent: {formatTime(notification.sentAt)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
