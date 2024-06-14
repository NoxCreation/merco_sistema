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

interface Props {
  onNext: () => void
  onPreview: () => void
}

export default function BussinessCodeForm({ onNext, onPreview }: Props) {
  return (
    <React.Fragment>
      <Heading as={"h3"} width={"full"} fontSize={"18px"}>
        Código
      </Heading>
      <Text color={"gray.600"} fontSize={"15px"}>
        Para comenzar a usar el sistema debe ponerse en contacto con la
        administración y adquirir el código del negocio para poder realizar la
        configuración inicial.
      </Text>
      <Center maxWidth={"300px"}>
        <FormControl>
          <FormLabel color={"gray.500"}>Código de negocio</FormLabel>
          <Input placeholder="B-202401" />
        </FormControl>
      </Center>
      <Flex width={"full"} justifyContent={"right"} gap={5}>
        <Button colorScheme="cyan" variant={'ghost'} onClick={onPreview}>
          Retroceder
        </Button>
        <Button colorScheme="cyan" color={"white"} onClick={onNext}>
          Continuar
        </Button>
      </Flex>
    </React.Fragment>
  );
}
