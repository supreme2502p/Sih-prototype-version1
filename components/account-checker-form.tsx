"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/hooks/use-language"
import { apiClient } from "@/lib/api-client"
import { CheckCircle, AlertCircle, Loader2, CreditCard, Banknote } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AccountResult {
  aadhaar: string
  bankAccount: string
  status: "dbt-enabled" | "aadhaar-linked"
  bankName: string
}

export function AccountCheckerForm() {
  const { t } = useLanguage()
  const [aadhaar, setAadhaar] = useState("")
  const [bankAccount, setBankAccount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AccountResult | null>(null)
  const [errors, setErrors] = useState<{ aadhaar?: string; bankAccount?: string; api?: string }>({})

  const validateAadhaar = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    if (cleaned.length !== 12 || !/^\d{12}$/.test(cleaned)) {
      return "Aadhaar number must be 12 digits"
    }
    return null
  }

  const validateBankAccount = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    if (cleaned.length < 8 || cleaned.length > 18 || !/^\d+$/.test(cleaned)) {
      return "Bank account number must be 8-18 digits"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const aadhaarError = validateAadhaar(aadhaar)
    const bankAccountError = validateBankAccount(bankAccount)

    if (aadhaarError || bankAccountError) {
      setErrors({
        aadhaar: aadhaarError || undefined,
        bankAccount: bankAccountError || undefined,
      })
      return
    }

    setErrors({})
    setIsLoading(true)
    setResult(null)

    const response = await apiClient.checkAccount({
      aadhaar: aadhaar.replace(/\s/g, ""),
      bankAccount: bankAccount.replace(/\s/g, ""),
    })

    setIsLoading(false)

    if (response.success && response.data) {
      setResult(response.data)
    } else {
      setErrors({
        api: response.error || "Failed to check account status. Please try again.",
      })
    }
  }

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const limited = cleaned.slice(0, 12)
    return limited.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  const formatBankAccount = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 18)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t("checkAccount")}</CardTitle>
          <CardDescription>{t("tagline")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="aadhaar">{t("aadhaarNumber")}</Label>
              <Input
                id="aadhaar"
                type="text"
                placeholder={t("enterAadhaar")}
                value={aadhaar}
                onChange={(e) => setAadhaar(formatAadhaar(e.target.value))}
                className={errors.aadhaar ? "border-destructive" : ""}
              />
              {errors.aadhaar && <p className="text-sm text-destructive">{errors.aadhaar}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bankAccount">{t("bankAccount")}</Label>
              <Input
                id="bankAccount"
                type="text"
                placeholder={t("enterBankAccount")}
                value={bankAccount}
                onChange={(e) => setBankAccount(formatBankAccount(e.target.value))}
                className={errors.bankAccount ? "border-destructive" : ""}
              />
              {errors.bankAccount && <p className="text-sm text-destructive">{errors.bankAccount}</p>}
            </div>

            {errors.api && (
              <Alert className="border-destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.api}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                t("checkStatus")
              )}
            </Button>
          </form>

          {/* Results */}
          {result && (
            <div className="mt-8">
              <Card
                className={`border-2 ${result.status === "dbt-enabled" ? "border-primary bg-primary/5" : "border-secondary bg-secondary/5"}`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-2 p-3 rounded-full w-fit ${result.status === "dbt-enabled" ? "bg-primary/10" : "bg-secondary/10"}`}
                  >
                    {result.status === "dbt-enabled" ? (
                      <Banknote className="h-8 w-8 text-primary" />
                    ) : (
                      <CreditCard className="h-8 w-8 text-secondary" />
                    )}
                  </div>
                  <CardTitle className={result.status === "dbt-enabled" ? "text-primary" : "text-secondary"}>
                    Account Status Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className={result.status === "dbt-enabled" ? "border-primary" : "border-secondary"}>
                    <div className="flex items-center gap-2">
                      {result.status === "dbt-enabled" ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-secondary" />
                      )}
                      <AlertDescription className="font-medium">
                        {result.status === "dbt-enabled" ? t("accountEnabled") : t("accountNotEnabled")}
                      </AlertDescription>
                    </div>
                  </Alert>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground">Bank Name</p>
                      <p>{result.bankName}</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground">Account Number</p>
                      <p>****{result.bankAccount.slice(-4)}</p>
                    </div>
                  </div>

                  {result.status === "aadhaar-linked" && (
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-2">Next Steps:</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Visit your bank branch</li>
                        <li>• Request DBT enablement form</li>
                        <li>• Submit required documents</li>
                        <li>• Wait for verification (2-3 days)</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Account Info */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Demo Accounts (for testing):</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>DBT-Enabled: Aadhaar: 1234 5678 9012, Account: 1234567890</p>
              <p>Aadhaar-Linked: Aadhaar: 9876 5432 1098, Account: 0987654321</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
