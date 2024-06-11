import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  pages: number;
  selectedPage: number;
};

export default function Pagination({ pages, selectedPage }: Props) {
  return (
    <Flex width={"full"} justifyContent={"space-between"} paddingY={"10px"}>
      <Button colorScheme="cyan" color={"white"}>
        <Flex gap={"8px"}>
          <ArrowBackIcon />
          <Text>Anterior</Text>
        </Flex>
      </Button>
      <Flex gap={"10px"}>
        {Array.from({ length: pages }).map((_, index) => (
          <Button
            color={selectedPage === index ? "white" : "cyan.500"}
            colorScheme="cyan"
            key={index}
            variant={selectedPage === index ? "solid" : "outline"}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
      <Button colorScheme="cyan" color={"white"}>
        <Flex gap={"8px"}>
          <ArrowForwardIcon />
          <Text>Siguiente</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
