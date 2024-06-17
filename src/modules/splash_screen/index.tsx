import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Logo from "../../frontend/core/components/Logo";
import { useRouter } from "next/router";
import { check_system } from "@/helper/requests/CheckSystem";
import { initialize_system } from "@/helper/requests/InitilizeSystem";

export default function SplashScreen() {
  const router = useRouter()
  const toast = useToast()
  const [state, setState] = useState("Comprobando configuración del sistema")

  useEffect(() => {
    check_system((status: number, data: any) => {
      if (status == 200) {
        if (data.isInit == true) {
          setState("Comprobando conexión a red.")
          setTimeout(() => {
            setState("Sincronizando con el servidor")
            setTimeout(() => {
              router.push("/auth")
            }, 2000)
          }, 2000)
        }
        else {
          setState("Sincronizando con el servidor")
          initialize_system((status: number, data: any) => {
            if (status == 200)
              router.push("/initial-config")
            else {
              toast({
                description: "Error al inicializar",
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: "error"
              })
            }
          })
        }
      }
    })
  }, [])

  return (
    <Flex
      width={"770px"}
      height={"410px"}
      position={"relative"}
      overflow={"hidden"}
      textTransform={"uppercase"}
      fontSize={"10px"}
      color={"gray.500"}
      borderRadius={"lg"}
      boxShadow={'0 4px 120px #E8E8E8'}
    >
      <Box width={"full"}></Box>
      <Stack
        width={"full"}
        zIndex={"50"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"50px"}
      >
        <Stack alignItems={"center"}>
          <Center width={"80px"}>
            <Logo />
          </Center>
          <Heading as={"h1"} fontSize={"12px"}>
            Merco Sistema
          </Heading>
          <Heading as={"h2"} fontSize={"10px"}>
            v0.1.0
          </Heading>
        </Stack>
        <Text>{state}</Text>
        <Text textAlign={"center"}>
          Sistema de gestión de inventario
          <br />© 2024 FrioPlus / MercoVenta / RefriShop <br /> Creado por NOX Creation
        </Text>
      </Stack>
      <Box
        width={"full"}
        height={"full"}
        background={"#00B5D844"}
        top={0}
        left={0}
        zIndex={20}
        position={"absolute"}
        borderRadius={"lg"}
      />
      <Image
        borderRadius={"lg"}
        src={"/images/splash-screen-image.png"}
        alt="Background Image"
        position={"absolute"}
        width={"full"}
        zIndex={1}
      />
      <Box position={"absolute"} borderRadius={"lg"} bottom={0} right={0} zIndex={30}>
        <svg
          width="760"
          height="409"
          viewBox="0 0 760 409"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M776.638 -244.743L-235.76 422.073L770.83 412.025L776.638 -244.743Z"
            fill="url(#paint0_linear_124_6799)"
            fill-opacity="0.95"
          />
          <defs>
            <linearGradient
              id="paint0_linear_124_6799"
              x1="354.259"
              y1="18.4246"
              x2="812.712"
              y2="320.889"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" stop-opacity="0" />
              <stop offset="0.277358" stop-color="white" stop-opacity="0.9" />
              <stop offset="1" stop-color="white" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Flex>
  );
}
