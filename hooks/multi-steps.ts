import { FormStep } from "@/types";
import { FormStepState } from "@/types";
import { useState } from "react";

export default function useMultiSteps(steps: FormStep[]): FormStepState {
    const [currentIndex, setCurrentIndex] = useState(0)

    function next() {
        setCurrentIndex(i => {
            if (i >= steps.length - 1)
                return i
            return i + 1
        })
    }
    function back() {
        setCurrentIndex(i => {
            if (i <= 0)
                return 0
            return i - 1
        })
    }
    function goTo(index: number) {
        setCurrentIndex(index);
    }
    return {
        next,
        back,
        goTo,
        currentIndex,
        isFirst: currentIndex === 0,
        isLast: currentIndex === steps.length - 1,
        currentStep: steps[currentIndex]
    }
}