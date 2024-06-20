import { Button, Flex, Text } from "@chakra-ui/react";
import { PiArrowFatUp, PiArrowFatDown } from "react-icons/pi";
import React from "react";

type Props = {
  onAction: () => void;
};

export default function BoxActionButtons({ onAction }: Props) {
  return (
    <Flex gap={"10px"}>
      <Button colorScheme="green" onClick={onAction}>
        <PiArrowFatUp />
        <Text ms={"5px"}>Ingresar Caja</Text>
      </Button>
      <Button colorScheme="red" onClick={onAction}>
        <PiArrowFatUp />
        <Text ms={"5px"}>Retirar Caja</Text>
      </Button>
      <Button colorScheme="green" onClick={onAction}>
        <PiArrowFatUp />
        <Text ms={"5px"}>Ingresar Fondo</Text>
      </Button>
      <Button colorScheme="red" onClick={onAction}>
        <PiArrowFatUp />
        <Text ms={"5px"}>Retirar Fondo</Text>
      </Button>
    </Flex>
  );
}
