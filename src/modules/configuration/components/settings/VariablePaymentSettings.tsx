import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Stack } from "@chakra-ui/react";
import React from "react";
import UnitsSection from "../sections/UnitsSection";
import QuantitySection from "../sections/QuantitySection";
import FixedPaymentQuantitySection from "../sections/FixedPaymentQuantitySection";

export default function VariablePaymentSettings() {
  return (
    <GenericContainer
      title="Reglas pagos variables"
      width={"full"}
      height={"fit-content"}
    >
      <Stack spacing={"10px"}>
        <UnitsSection />
        <QuantitySection />
        <FixedPaymentQuantitySection />
      </Stack>
    </GenericContainer>
  );
}
