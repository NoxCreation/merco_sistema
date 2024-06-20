import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CurrencySettings from "./components/settings/CurrencySettings";
import CapitalizationAndFundsSettings from "./components/settings/CapitalizationAndFundsSettings";
import OfferRulesSettings from "./components/settings/OfferRulesSettings";
import PayRangeByResultSettings from "./components/settings/PayRangeByResultSettings";
import WorkersPaySettings from "./components/settings/WorkersPaySettings";
import VariablePaymentSettings from "./components/settings/VariablePaymentSettings";
import SMSSettings from "./components/settings/SMSSettings";

export default function ConfigurationScreen() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: "Configuración",
            icon: undefined,
            link: "/configuration",
          },
        ]}
      />
      <Stack>
        <Flex gap={"10px"}>
          <CurrencySettings />
          <Stack width={"full"}>
            <CapitalizationAndFundsSettings />
          </Stack>
        </Flex>
        <Flex gap={"10px"}>
          <Stack width={"full"}>
            <OfferRulesSettings />
            <PayRangeByResultSettings />
            <WorkersPaySettings />
            <SMSSettings />
          </Stack>
          <VariablePaymentSettings />
        </Flex>
      </Stack>
    </Box>
  );
}
