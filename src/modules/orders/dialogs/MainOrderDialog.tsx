import React from "react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import useMultiStep from "@/frontend/core/hooks/useMultiStep";
import SelectProductDialog from "../../../frontend/core/dialogs/SelectProductDialog";
import AddProductQuantityDialog from "../../../frontend/core/dialogs/AddProductQuantityDialog";
import OrderDetailsDialog from "./OrderDetailsDialog";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MainOrderDialog({ isOpen, onClose }: Props) {
  const { currentStep, nextStep, prevStep, startStep } = useMultiStep();

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent maxWidth={"500px"}>
        {currentStep === 0 && (
          <OrderDetailsDialog
            isOpen={isOpen}
            onClose={onClose}
            onNext={nextStep}
            checkPay
          />
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
