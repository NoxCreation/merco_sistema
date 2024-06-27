import React from "react";
import { Box, Flex, Grid, Stack } from "@chakra-ui/react";
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
      <Grid templateColumns={"1fr 1fr"} gap={"25px"}>
        <CurrencySettings />
        <CapitalizationAndFundsSettings />
        <Stack gap={"25px"}>
          <OfferRulesSettings />
          <PayRangeByResultSettings />
          <WorkersPaySettings />
          <SMSSettings />
        </Stack>
        <VariablePaymentSettings />
      </Grid>
    </Box>
  );
}
