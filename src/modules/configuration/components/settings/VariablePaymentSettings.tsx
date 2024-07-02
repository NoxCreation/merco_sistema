import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import UnitsSection from "../sections/UnitsSection";
import QuantitySection from "../sections/QuantitySection";
import FixedPaymentQuantitySection from "../sections/FixedPaymentQuantitySection";

export default function VariablePaymentSettings() {
  return (
    <GenericContainer
      title="Reglas pagos variables"
    >
      <Flex flexDir={'column'} /* spacing={"20px"} */ >
        <UnitsSection />
        <QuantitySection />
        <FixedPaymentQuantitySection />
      </Flex>
    </GenericContainer>
  );
}
