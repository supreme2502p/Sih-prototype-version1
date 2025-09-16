import { NextResponse } from "next/server"
import { mockAccounts } from "@/lib/mock-data"

export async function GET() {
  try {
    // Return mock data for testing purposes
    const sanitizedAccounts = mockAccounts.map((account) => ({
      aadhaar: `****${account.aadhaar.slice(-4)}`,
      bankAccount: `****${account.bankAccount.slice(-4)}`,
      status: account.status,
      bankName: account.bankName,
    }))

    return NextResponse.json({
      success: true,
      data: sanitizedAccounts,
      message: "Mock accounts for testing (Aadhaar and account numbers are masked)",
    })
  } catch (error) {
    console.error("Error fetching mock data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
