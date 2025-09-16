"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { CheckCircle, AlertCircle, CreditCard, Banknote } from "lucide-react"

export function AccountComparison() {
  const { t } = useLanguage()

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card className="border-2 border-muted">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 p-3 bg-muted rounded-full w-fit">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">{t("aadhaarLinked")}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="mb-4">{t("aadhaarLinkedDesc")}</CardDescription>
          <div className="flex items-center justify-center gap-2 text-secondary">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Limited Benefits</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary bg-primary/5">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
            <Banknote className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg text-primary">{t("dbtEnabled")}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="mb-4">{t("dbtEnabledDesc")}</CardDescription>
          <div className="flex items-center justify-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Full Benefits</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
