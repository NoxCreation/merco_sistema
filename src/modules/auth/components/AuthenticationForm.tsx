import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function AuthenticationForm() {
  const router = useRouter()

  const onAuth=()=>{
    router.push("/dashboard")
  }

  return (
    <Stack as={"form"} maxWidth={"402px"} width={"full"} paddingX={"20px"}>
      <Heading as={"h3"} fontSize={"32px"} textAlign={'center'}>
        Autenticación
      </Heading>
      <Stack paddingY={"40px"} width={"full"}>
        <FormControl>
          <FormLabel>Usuario</FormLabel>
          <Input backgroundColor={"white"} placeholder="pepe"/>
        </FormControl>
        <FormControl>
          <FormLabel>Contrasenna</FormLabel>
          <Input backgroundColor={"white"} placeholder="12345*" />
        </FormControl>
      </Stack>
      <Flex width={"full"} justifyContent={"right"}>
        <Button colorScheme="cyan" color="white" onClick={onAuth}>
          Autenticarme
        </Button>
      </Flex>
    </Stack>
  );
}
