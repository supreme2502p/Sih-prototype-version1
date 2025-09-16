"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TutorialNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
}

export function TutorialNavigation({ currentStep, totalSteps, onPrevious, onNext }: TutorialNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button variant="outline" onClick={onPrevious} disabled={currentStep === 0}>
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentStep ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      <Button variant="outline" onClick={onNext} disabled={currentStep === totalSteps - 1}>
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}
