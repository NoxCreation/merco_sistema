import React from "react";
import { Stack, Heading, Text, Flex, Divider } from "@chakra-ui/react";
import Rules from "../Rules";

export default function FixedPaymentQuantitySection() {
  return (
    <Stack width={"full"} spacing={"20px"} my={"20px"}>
      <Flex alignItems={'center'} gap={5}>
        <Heading as="h5" size={"15px"} fontWeight={"800"} color={"gray.500"} w={'fit-content'}>
          CANTIDAD PAGOS FIJOS
        </Heading>
        <Divider flex={1} />
      </Flex>
      <Stack>
        <Text color={"gray.500"} fontSize={'14px'}>
          Promotor
        </Text>
        <Rules />
      </Stack>
      <Stack>
        <Text color={"gray.500"} fontSize={'14px'}>
          Vendedor
        </Text>
        <Rules />
      </Stack>
    </Stack>
  );
}
