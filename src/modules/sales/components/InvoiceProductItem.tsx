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
  Box,
  Image,
  IconButton,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Props = {
  onDelete: () => void
  onUpdate: (counts: Array<number>) => void
  productName: string
  price: number
  currency: string
  image: string
  min_stock: number
  count_max_stock: number
  count_max_unit: number
  stock: number
  unit: number
  symbol_unit: string
};

export default function InvoiceProductItem({
  onDelete,
  onUpdate,
  price,
  currency,
  productName,
  image,
  min_stock,
  count_max_stock,
  count_max_unit, 
  stock,
  unit,
  symbol_unit,
}: Props) {

  const [representation, set_representation] = useState("unidad" as string)

  const onChangeValue = (value: number) => {
    if (representation == 'unidad') {
      //[stock, unit]
      onUpdate([value * min_stock, value])
    }
    else if (representation == 'medida') {
      onUpdate([value, value / min_stock])
    }
  }

  return (
    <Card variant={"outline"} padding={"5px"}>
      <Flex alignItems={"center"} width={"full"}>
        <Box width={"100px"} height={"full"}>
          <Image
            src={image}
            alt="Product Image"
            objectFit={"contain"}
          />
        </Box>
        <Stack spacing={"10px"} flex={1}>
          <Text fontSize={"14"}>{productName}</Text>
          <Flex>
            <RadioGroup value={representation} onChange={t => set_representation(t)}>
              <Stack direction='row'>
                <Radio value='unidad' colorScheme="cyan">Unidad</Radio>
                {symbol_unit != "U" && <Radio value='medida' colorScheme="cyan">A Granel</Radio>}
              </Stack>
            </RadioGroup>
          </Flex>
          <Flex alignItems={"center"} gap={"5px"} >
            <NumberInput size={"sm"} width={"100px"}
              precision={2} step={representation == 'unidad' ? 1 : 0.1} min={representation == 'unidad' ? 1 : 0.1} max={representation == 'unidad' ? count_max_unit : count_max_stock}
              value={representation == 'unidad' ? unit : stock} 
              onChange={t => onChangeValue(parseFloat(t))}
            >
              <NumberInputField
                fontSize={"16px"}
              ></NumberInputField>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text w={'70px'} textAlign={'center'}>
              {representation == 'unidad' ? 'U' : symbol_unit} / {representation == 'unidad' ? count_max_unit : count_max_stock}{representation == 'unidad' ? 'U' : symbol_unit}
            </Text>
          </Flex>
        </Stack>
        <Stack padding={"10px"}>
          <Flex justifyContent={"center"}>
            <IconButton
              color={"white"}
              borderRadius={"full"}
              aria-label={"Delete Icon"}
              icon={<DeleteIcon />}
              colorScheme="cyan"
              onClick={onDelete}
            />
          </Flex>
          <Flex gap={"5px"}>
            <Text fontSize={"14px"} textAlign={'center'} w={'100%'}>${price} {currency}</Text>
            {/* <Badge>{currency}</Badge> */}
          </Flex>
        </Stack>
      </Flex>
    </Card>
  );
}
