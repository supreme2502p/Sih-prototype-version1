import { type NextRequest, NextResponse } from "next/server"

interface NotificationRequest {
  phone: string
  type: "sms" | "whatsapp"
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: NotificationRequest = await request.json()
    const { phone, type, message } = body

    // Validate input
    if (!phone || !type || !message) {
      return NextResponse.json({ error: "Phone number, type, and message are required" }, { status: 400 })
    }

    // Validate phone number format (basic validation)
    const cleanedPhone = phone.replace(/\D/g, "")
    if (cleanedPhone.length < 10 || cleanedPhone.length > 12) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock notification sending (in real app, this would integrate with SMS/WhatsApp API)
    console.log(`Mock ${type.toUpperCase()} sent to ${phone}: ${message}`)

    return NextResponse.json({
      success: true,
      message: `${type.toUpperCase()} notification scheduled successfully`,
      data: {
        phone: `****${cleanedPhone.slice(-4)}`,
        type,
        scheduledAt: new Date().toISOString(),
        status: "scheduled",
      },
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
