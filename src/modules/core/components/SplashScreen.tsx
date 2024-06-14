import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Logo from "./Logo";
import { useRouter } from "next/router";

export default function SplashScreen() {
  const router = useRouter()

  useEffect(()=>{
    setTimeout(()=>{
      router.push("/dashboard")
    }, 5000)
  },[])

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
        spacing={"30px"}
      >
        <Stack alignItems={"center"}>
          <Center width={"80px"}>
            <Logo />
          </Center>
          <Heading as={"h1"} fontSize={"12px"}>
            Merco Sistema
          </Heading>
          <Heading as={"h2"} fontSize={"10px"}>
            v1.0.0
          </Heading>
        </Stack>
        <Text>Comprobando conexion de red ...</Text>
        <Text textAlign={"center"}>
          Sistema de gestion de inventario
          <br />© 2024 Frio PLus. Creado por NOX Creation
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
