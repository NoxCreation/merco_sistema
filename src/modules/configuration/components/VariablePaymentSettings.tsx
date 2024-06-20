import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";
import React from "react";
import UnitsSection from "./UnitsSection";
import QuantitySection from "./QuantitySection";
import FixedPaymentQuantitySection from "./FixedPaymentQuantitySection";

export default function VariablePaymentSettings() {
  return (
    <GenericContainer title="Reglas pagos variables" width={"full"}>
      <Stack spacing={"10px"}>
        <UnitsSection />
        <QuantitySection />
        <FixedPaymentQuantitySection />
      </Stack>
    </GenericContainer>
  );
}
