import React from "react";

function useMultiStep(initialStep: number = 0) {
  const [currentStep, setCurrentStep] = React.useState<number>(initialStep);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }
  function prevStep() {
    setCurrentStep(currentStep - 1);
  }
  function startStep() {
    setCurrentStep(initialStep);
  }

  return { currentStep, nextStep, prevStep, startStep };
}

export default useMultiStep;
