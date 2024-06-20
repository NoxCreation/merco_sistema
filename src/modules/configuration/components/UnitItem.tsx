import { Flex, Input, Select, Text, Box } from "@chakra-ui/react";
import React from "react";
import { FaTrash } from "react-icons/fa";

export default function UnitItem() {
  return (
    <Flex alignItems={"center"} gap={"15px"} width={"full"}>
      <Input type="number" width={"full"} />
      <Text fontWeight={"bold"} color={"cyan.500"}>
        %
      </Text>
      <Box>
        <FaTrash color="#00A3C4" width={"30px"} />
      </Box>
    </Flex>
  );
}
