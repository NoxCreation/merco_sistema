import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function BussinessCodeForm() {
  return (
    <React.Fragment>
      <Heading as={"h3"} width={"full"} fontSize={"18px"}>
        Codigo
      </Heading>
      <Text color={"gray.600"} fontSize={"15px"}>
        Para comenzar a usar el sistema debe ponerse en contacto con la
        administración y adquirir el código del negocio para poder realizar la
        configuración inicial.
      </Text>
      <Center maxWidth={"300px"}>
        <FormControl>
          <FormLabel color={"gray.500"}>Codigo de negocio</FormLabel>
          <Input placeholder="B-202401" />
        </FormControl>
      </Center>
      <Flex width={"full"} justifyContent={"right"}>
        <Button colorScheme="cyan" color={"white"}>
          Continuar
        </Button>
      </Flex>
    </React.Fragment>
  );
}
