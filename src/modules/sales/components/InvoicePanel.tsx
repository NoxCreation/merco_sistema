import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  Stack,
  Text,
  Divider,
  Flex,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
} from "@chakra-ui/react";
import React from "react";
import InvoiceProductItem from "./InvoiceProductItem";

export default function InvoicePanel() {
  return (
    <GenericContainer title="Factura" overflowY={"auto"} height={"80vh"}>
      <Stack maxHeight={"300px"} overflowY={"auto"}>
        <InvoiceProductItem
          currency="USD"
          price={20}
          productName="Aceite refrigerante"
        />
        <InvoiceProductItem
          currency="USD"
          price={20}
          productName="Aceite refrigerante"
        />
      </Stack>
      <Divider marginY={"20px"} />
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Total a pagar
        </Text>
        <Stack>
          <Text fontSize={"14px"} fontWeight={"bold"} color={"cyan.500"}>
            180 USD
          </Text>
          <Text fontSize={"14px"} fontWeight={"bold"} color={"cyan.500"}>
            1000 CUP
          </Text>
          <Text fontSize={"14px"} fontWeight={"bold"} color={"cyan.500"}>
            28.5 MLC
          </Text>
        </Stack>
      </Flex>
      <Divider marginY={"20px"} />
      <Flex justifyContent={"space-between"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Ganancia vendedor
        </Text>
        <Text fontSize={"14px"} fontWeight={"bold"} color={"cyan.500"}>
          2342 CUP
        </Text>
      </Flex>
      <Stack paddingY={"10px"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Moneda de pago
        </Text>
        <Flex gap={"10px"}>
          <Stack width={"full"}>
            <Checkbox colorScheme="cyan">USD</Checkbox>
            <NumberInput>
              <NumberInputField fontSize={"16px"}></NumberInputField>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack width={"full"}>
            <Checkbox colorScheme="cyan">CUP</Checkbox>
            <NumberInput>
              <NumberInputField fontSize={"16px"}></NumberInputField>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack width={"full"}>
            <Checkbox colorScheme="cyan">MLC</Checkbox>
            <NumberInput>
              <NumberInputField fontSize={"16px"}></NumberInputField>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </Flex>
      </Stack>
      <Stack paddingY={"10px"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Metodo de pago
        </Text>
        <Flex>
          <Checkbox width={"full"}>Efectivo</Checkbox>
          <Checkbox width={"full"}>Transferencia</Checkbox>
        </Flex>
      </Stack>
      <Stack paddingY={"10px"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>
          Tarjeta
        </Text>
        <Select colorScheme="cyan" placeholder="9202 9598 4154 6874">
          <option>23242445242</option>
        </Select>
      </Stack>
      <Button
        colorScheme="cyan"
        color={"white"}
        width={"full"}
        marginTop={"20px"}
      >
        Pagado
      </Button>
    </GenericContainer>
  );
}
