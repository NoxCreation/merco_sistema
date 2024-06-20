import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Center,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CurrencyItem from "../CurrencyItem";
import { AddIcon } from "@chakra-ui/icons";

export default function CurrencySettings() {
  return (
    <GenericContainer title="Divisas" width={"full"}>
      <Stack spacing={"10px"}>
        <FormControl display={"flex"} alignItems={"center"} gap={"10px"}>
          <FormLabel>1 USD</FormLabel>
          <Input flex={1} />
        </FormControl>
        <CurrencyItem />
        <CurrencyItem />
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
