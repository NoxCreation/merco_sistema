import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React from "react";

export default function CurrencyItem() {
  return (
    <Flex alignItems={"center"} gap={"10px"}>
      <Checkbox colorScheme="cyan"></Checkbox>
      <Input placeholder="CUP" flex={1} />
      <InputGroup flex={3}>
        <Input type="number" />
        <InputRightAddon
          cursor={"pointer"}
          _hover={{ filter: "brightness(0.94)" }}
        >
          <DeleteIcon />
        </InputRightAddon>
      </InputGroup>
    </Flex>
  );
}
