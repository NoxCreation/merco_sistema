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
    <Flex mt={"50px"} gap={'25px'}>
      <Flex flex={1} flexDir={'column'} gap={'25px'} w={'50%'}>
        <CurrencySettings />
        <Flex flexDir={'column'} gap={"25px"}>
          <OfferRulesSettings />
          <PayRangeByResultSettings />
          <WorkersPaySettings />
          <SMSSettings />
        </Flex>
      </Flex>
      <Flex flex={1} flexDir={'column'} gap={"25px"} w={'50%'}>
        <CapitalizationAndFundsSettings />
        <VariablePaymentSettings />
      </Flex>
    </Flex>
  );
}
