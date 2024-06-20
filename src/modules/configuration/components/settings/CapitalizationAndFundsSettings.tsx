import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";

export default function CapitalizationAndFundsSettings() {
  return (
    <GenericContainer title="Capitalización y fondos" width={"full"}>
      <Stack spacing={"10px"}>
        <FormControl isRequired>
          <FormLabel>Pagos administrativos</FormLabel>
          <InputGroup>
            <Input type="number" />
            <InputRightElement>%</InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Re inversión</FormLabel>
          <InputGroup>
            <Input type="number" />
            <InputRightElement>%</InputRightElement>
          </InputGroup>
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
