import { DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  Flex,
  Text,
  Stack,
  NumberInput,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInputStepper,
  Select,
  Box,
  Image,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  productName: string;
  price: number;
  currency: string;
};

export default function InvoiceProductItem({
  price,
  currency,
  productName,
}: Props) {
  return (
    <Card variant={"outline"} padding={"5px"}>
      <Flex alignItems={"center"} width={"full"}>
        <Box width={"100px"} height={"full"}>
          <Image
            src="https://th.bing.com/th/id/OIP.eQxdgKp-vNL0ZIq6Eq_oTwHaE8?w=269&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Product Image"
            objectFit={"contain"}
          />
        </Box>
        <Stack spacing={"10px"} flex={1}>
          <Text fontSize={"14"}>{productName}</Text>
          <Flex alignItems={"center"} gap={"5px"} >
            <NumberInput size={"sm"} width={"full"}>
              <NumberInputField
                fontSize={"16px"}
              ></NumberInputField>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select isDisabled size={"sm"} width={"full"}>
              <option>ml</option>
              <option>unidad</option>
            </Select>
          </Flex>
        </Stack>
        <Stack padding={"10px"}>
          <Flex justifyContent={"end"}>
            <IconButton
              color={"white"}
              borderRadius={"full"}
              aria-label={"Delete Icon"}
              icon={<DeleteIcon />}
              colorScheme="cyan"
            />
          </Flex>
          <Flex gap={"5px"}>
            <Text fontSize={"14px"}>${price}</Text>
            <Badge>{currency}</Badge>
          </Flex>
        </Stack>
      </Flex>
    </Card>
  );
}
