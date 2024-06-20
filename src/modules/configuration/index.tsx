import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CurrencySettings from "./components/CurrencySettings";
import CapitalizationAndFundsSettings from "./components/CapitalizationAndFundsSettings";
import OfferRulesSettings from "./components/OfferRulesSettings";
import PayRangeByResultSettings from "./components/PayRangeByResultSettings";
import WorkersPaySettings from "./components/WorkersPaySettings";
import VariablePaymentSettings from "./components/VariablePaymentSettings";
import SMSSettings from "./components/SMSSettings";

export default function ConfigurationScreen() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: "Inventario",
            icon: undefined,
            link: "/inventario",
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
