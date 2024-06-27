import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  active: boolean
  symbol: string
  value_change: number
}

export default function CurrencyItem({ active, symbol, value_change }: Props) {
  const router = useRouter()

  return (
    <Flex alignItems={"center"} gap={"10px"}>
      {symbol != "USD" && (<Checkbox colorScheme="cyan" isChecked={active} isDisabled></Checkbox>)}
      <Input value={symbol} flex={1} fontSize={'14px'} isDisabled />
      <InputGroup flex={3}>
        <Input type="number" fontSize={'14px'} value={value_change} isDisabled />
        {symbol != "USD" && (
          <InputRightAddon
            fontSize={'14px'}
            cursor={"pointer"}
            _hover={{ filter: "brightness(0.94)" }}
            onClick={() => router.push("/nomenclators/coins")}
          >
            <DeleteIcon />
          </InputRightAddon>
        )}
      </InputGroup>
    </Flex>
  );
}
