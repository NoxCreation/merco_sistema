import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Stack, Flex, Text, Center } from "@chakra-ui/react";
import React from "react";
import SMSPricingCard from "../SMSPricingCard";
import SMSTable from "../SMSTable";

export default function SMSSettings() {
  return (
    <GenericContainer title="SMS" w={"full"} >
      <Stack spacing={"25px"}>
        <Center width={"full"}>
          <Stack
            spacing={"2px"}
            rounded={"full"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"cyan.500"}
            width={"fit-content"}
            paddingX={"20px"}
            paddingY={"32px"}
          >
            <Text fontSize={"30px"} fontWeight={"bold"} lineHeight={"25px"}>
              1000
            </Text>
            <Text lineHeight={"25px"}>SMS</Text>
          </Stack>
        </Center>
        <Flex gap={"15px"}>
          <SMSPricingCard
            title="1000 SMS/180 días"
            price={5500}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
          <SMSPricingCard
            isSelected
            title="2000 SMS/180 días"
            price={1100}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
          <SMSPricingCard
            title="4000 SMS/180 días"
            price={22000}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
        </Flex>
        <Text fontSize={"15px"}>
          Los SMS son usados para notificar a los promotores cuando se amorticen
          sus órdenes, también para notificar a los administradores del sistema
          de deudas que hayan pasado el día estimado que debe ser cancelada.
        </Text>
        <SMSTable />
      </Stack>
    </GenericContainer>
  );
}
