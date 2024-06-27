import { Flex, Input, Select, Text, Box, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaSave, FaTrash } from "react-icons/fa";

export default function UnitItem() {
  return (
    <Flex alignItems={"center"} gap={"15px"} width={"full"}>
      <Input type="number" width={"full"} />
      <Text fontWeight={"bold"} color={"cyan.500"}>
        %
      </Text>
      <Flex>
        <IconButton
          onClick={() => {
            
          }}
          aria-label="eliminar" variant={'ghost'} icon={<FaTrash color="#00A3C4" width={"30px"} />} />
        <IconButton aria-label="salvar"
          onClick={() => {

          }}
          variant={'ghost'} icon={<FaSave color="#00A3C4" width={"30px"} />} />
      </Flex>
    </Flex>
  );
}
