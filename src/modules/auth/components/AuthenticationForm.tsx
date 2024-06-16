import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { signIn } from 'next-auth/react'
import { Loading } from "@/modules/core/components/Loading";

export default function AuthenticationForm() {
  const router = useRouter()
  const [username, setUsername] = useState('' as string)
  const [password, setPassword] = useState('' as string)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const onAuth = async () => {
    //router.push("/dashboard")
    setLoading(true)
    await signIn('credentials', {
      username,
      password,
      redirect: false,
    }).then((e: any) => {
      if (e.ok) {
        router.push('/dashboard')
      }
      else {
        toast({
          description: "No se ha podido autenticar con estas credenciales",
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
          variant: 'error'
        })
        setLoading(false)
      }
    })
  }

  return (
    <Stack as={"form"} maxWidth={"402px"} width={"full"} paddingX={"20px"}>
      <Loading isLoading={loading} />
      <Heading as={"h3"} fontSize={"32px"} textAlign={'center'}>
        Autenticación
      </Heading>
      <Stack paddingY={"40px"} width={"full"}>
        <FormControl>
          <FormLabel>Usuario</FormLabel>
          <Input backgroundColor={"white"} placeholder="pepe" value={username} onChange={t => setUsername(t.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input backgroundColor={"white"} placeholder="12345*" type="password" value={password} onChange={t => setPassword(t.target.value)} />
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
