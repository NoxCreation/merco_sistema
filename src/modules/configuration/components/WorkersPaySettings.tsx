import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Button,
  Select,
} from "@chakra-ui/react";
import React from "react";

export default function WorkersPaySettings() {
  return (
    <GenericContainer title="Moneda de pago" w={"full"}>
      <Stack spacing={"10px"}>
        <FormControl isRequired>
          <FormLabel>
            Selecciona la moneda en la que serán pagados los trabajadores
          </FormLabel>
          <Select>
            <option>CUP</option>
            <option>MLC</option>
            <option>USD</option>
          </Select>
        </FormControl>
        <Flex justifyContent={"end"}>
          <Button w={"fit-content"} colorScheme="cyan" color={"white"}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </GenericContainer>
  );
}
