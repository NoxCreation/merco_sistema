import { Button, Flex, Text } from "@chakra-ui/react";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import React from "react";

export default function BoxActionButtons() {
  return (
    <Flex gap={"10px"}>
      <Button colorScheme="green">
        <PiArrowFatUp />
        <Text ms={"5px"}>Ingresar Caja</Text>
      </Button>
      <Button colorScheme="red">
        <PiArrowFatUp />
        <Text ms={"5px"}>Retirar Caja</Text>
      </Button>
      <Button colorScheme="green">
        <PiArrowFatUp />
        <Text ms={"5px"}>Ingresar Fondo</Text>
      </Button>
      <Button colorScheme="red">
        <PiArrowFatUp />
        <Text ms={"5px"}>Retirar Fondo</Text>
      </Button>
    </Flex>
  );
}
