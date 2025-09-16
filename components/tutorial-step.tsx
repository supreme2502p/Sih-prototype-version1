"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Search, FileText, Building, CheckCircle, Trophy, type LucideIcon } from "lucide-react"
import type { TutorialStep } from "@/lib/tutorial-data"

const iconMap: Record<string, LucideIcon> = {
  info: Info,
  search: Search,
  file: FileText,
  building: Building,
  check: CheckCircle,
  success: Trophy,
}

interface TutorialStepProps {
  step: TutorialStep
  stepNumber: number
  isActive: boolean
  onClick: () => void
}

export function TutorialStepComponent({ step, stepNumber, isActive, onClick }: TutorialStepProps) {
  const IconComponent = iconMap[step.icon] || Info

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        isActive ? "border-primary bg-primary/5 shadow-lg" : "hover:shadow-md hover:border-primary/50"
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${isActive ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={isActive ? "default" : "secondary"}>Step {stepNumber}</Badge>
            </div>
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </div>
        </div>
        <CardDescription>{step.description}</CardDescription>
      </CardHeader>

      {isActive && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Details:</h4>
              <ul className="space-y-2">
                {step.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {step.tips && step.tips.length > 0 && (
              <div className="p-3 bg-secondary/10 rounded-lg">
                <h4 className="font-semibold mb-2 text-secondary">💡 Tips:</h4>
                <ul className="space-y-1">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-secondary">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
