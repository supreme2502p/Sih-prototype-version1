// Mock data for testing the account checker
export const mockAccounts = [
  {
    aadhaar: "123456789012",
    bankAccount: "1234567890",
    status: "dbt-enabled",
    bankName: "State Bank of India",
  },
  {
    aadhaar: "987654321098",
    bankAccount: "0987654321",
    status: "aadhaar-linked",
    bankName: "HDFC Bank",
  },
  {
    aadhaar: "555666777888",
    bankAccount: "5556667778",
    status: "dbt-enabled",
    bankName: "ICICI Bank",
  },
  {
    aadhaar: "111222333444",
    bankAccount: "1112223334",
    status: "aadhaar-linked",
    bankName: "Punjab National Bank",
  },
]

export type AccountStatus = "dbt-enabled" | "aadhaar-linked"

export interface AccountInfo {
  aadhaar: string
  bankAccount: string
  status: AccountStatus
  bankName: string
}

export function checkAccountStatus(aadhaar: string, bankAccount: string): AccountInfo | null {
  // Simulate API delay
  const account = mockAccounts.find((acc) => acc.aadhaar === aadhaar && acc.bankAccount === bankAccount)

  if (account) {
    return account
  }

  // For demo purposes, randomly assign status for unknown accounts
  const randomStatus: AccountStatus = Math.random() > 0.5 ? "dbt-enabled" : "aadhaar-linked"

  return {
    aadhaar,
    bankAccount,
    status: randomStatus,
    bankName: "Unknown Bank",
  }
}
