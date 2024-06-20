import React from "react";
import RuleItem from "../RuleItem";
import { AddIcon } from "@chakra-ui/icons";
import { Stack, Heading, Button, Center, Text } from "@chakra-ui/react";

export default function FixedPaymentQuantitySection() {
  return (
    <Stack width={"full"} spacing={"20px"} my={"20px"}>
      <Heading as="h5" size={"15px"} fontWeight={"bold"} color={"gray.500"}>
        Cantidad pagos fijos
      </Heading>
      <Stack>
        <Text color={"gray.500"} fontSize={"15px"}>
          Promotor
        </Text>
        <RuleItem />
        <RuleItem />
        <RuleItem />
        <Button width={"full"} colorScheme="cyan" color={"white"}>
          <Center gap={"20px"}>
            <AddIcon />
            <Text>Agregar</Text>
          </Center>
        </Button>
      </Stack>
      <Stack>
        <Text color={"gray.500"} fontSize={"15px"}>
          Vendedor
        </Text>
        <RuleItem />
        <RuleItem />
        <RuleItem />
        <Button width={"full"} colorScheme="cyan" color={"white"}>
          <Center gap={"20px"}>
            <AddIcon />
            <Text>Agregar</Text>
          </Center>
        </Button>
      </Stack>
    </Stack>
  );
}
