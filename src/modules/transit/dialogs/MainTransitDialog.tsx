import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

import useMultiStep from "@/frontend/core/hooks/useMultiStep";
import TransitDetailsDialog from "./TransitDetailsDialog";
import SelectProductDialog from "../../../frontend/core/dialogs/SelectProductDialog";
import AddProductQuantityDialog from "../../../frontend/core/dialogs/AddProductQuantityDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MainTransitDialog({ isOpen, onClose }: Props) {
  const { currentStep, nextStep, prevStep, startStep } = useMultiStep();

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={"500px"}>
        {currentStep === 0 && (
          <TransitDetailsDialog onClose={onClose} onNext={nextStep} checkPay/>
        )}
        {currentStep === 1 && (
          <SelectProductDialog onNext={nextStep} onBack={prevStep} />
        )}
        {currentStep === 2 && (
          <AddProductQuantityDialog
            onNext={startStep}
            onBack={prevStep}
            onCancel={startStep}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
