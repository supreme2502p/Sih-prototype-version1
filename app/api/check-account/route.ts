import { type NextRequest, NextResponse } from "next/server"
import { checkAccountStatus } from "@/lib/mock-data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { aadhaar, bankAccount } = body

    // Validate input
    if (!aadhaar || !bankAccount) {
      return NextResponse.json({ error: "Aadhaar number and bank account number are required" }, { status: 400 })
    }

    // Validate Aadhaar format (12 digits)
    const cleanedAadhaar = aadhaar.replace(/\s/g, "")
    if (!/^\d{12}$/.test(cleanedAadhaar)) {
      return NextResponse.json({ error: "Invalid Aadhaar number format. Must be 12 digits." }, { status: 400 })
    }

    // Validate bank account format (8-18 digits)
    const cleanedBankAccount = bankAccount.replace(/\s/g, "")
    if (!/^\d{8,18}$/.test(cleanedBankAccount)) {
      return NextResponse.json({ error: "Invalid bank account number format. Must be 8-18 digits." }, { status: 400 })
    }

    // Simulate API processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check account status using mock data
    const result = checkAccountStatus(cleanedAadhaar, cleanedBankAccount)

    if (!result) {
      return NextResponse.json({ error: "Account not found or invalid details" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error checking account status:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
