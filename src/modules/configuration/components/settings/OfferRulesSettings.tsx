import GenericContainer from "@/frontend/core/components/GenericContainer";
import { AddIcon } from "@chakra-ui/icons";
import { Stack, Button, Center, Text, Checkbox } from "@chakra-ui/react";
import React from "react";
import RuleItem from "../RuleItem";

export default function OfferRulesSettings() {
  return (
    <GenericContainer title="Reglas y ofertas" width={"full"}>
      <Stack spacing={"10px"}>
        <Checkbox colorScheme="cyan">Aplicar ofertas</Checkbox>
        <RuleItem />
        <RuleItem />
        <RuleItem />
        <Button colorScheme="cyan" color={"white"}>
          <Center gap={"20px"}>
            <AddIcon />
            <Text>Agregar</Text>
          </Center>
        </Button>
      </Stack>
    </GenericContainer>
  );
}
