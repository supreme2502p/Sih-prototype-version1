"use client"

import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import { getTutorialSteps } from "@/lib/tutorial-data"
import { TutorialStepComponent } from "@/components/tutorial-step"
import { TutorialNavigation } from "@/components/tutorial-navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export function InteractiveTutorial() {
  const { language, t } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const steps = getTutorialSteps(language)

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tutorial Header */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl">{t("tutorial")}</CardTitle>
          <CardDescription className="text-lg">
            Step-by-step guide to enable Direct Benefit Transfer for your bank account
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>📱 Mobile Friendly</span>
            <span>🌐 Works Offline</span>
            <span>🔒 Secure Process</span>
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Steps */}
      <div className="space-y-4 mb-8">
        {steps.map((step, index) => (
          <TutorialStepComponent
            key={step.id}
            step={step}
            stepNumber={index + 1}
            isActive={index === activeStep}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>

      {/* Navigation */}
      <TutorialNavigation
        currentStep={activeStep}
        totalSteps={steps.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      {/* Call to Action */}
      <Card className="mt-8 bg-primary/5 border-primary">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Ready to check your account status?</h3>
          <p className="text-muted-foreground mb-6">
            Use our account checker to see if your bank account is already DBT-enabled
          </p>
          <Link href="/check">
            <Button size="lg">
              {t("checkAccount")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
