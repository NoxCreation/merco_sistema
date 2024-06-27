import {
  Box,
  Center,
  Flex,
  Progress,
  SlideFade,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa6";
import React, { useEffect } from "react";
import { useSyncToastState } from "../contexts/MercoSistemaProvider";

export default function SyncWithServerToast() {
  const { isSyncToastOpen, setSyncToastOpen } = useSyncToastState();

  function close() {
    setTimeout(() => {
      setSyncToastOpen(false);
    }, 6000);
  }

  useEffect(() => {
    close();
  }, []);

  return (
    <>
      {isSyncToastOpen && (
        <Flex
          width={"full"}
          position={"fixed"}
          bottom={0}
          right={0}
          justifyContent={"end"}
          padding={"20px"}
        >
          <SlideFade in={isSyncToastOpen} offsetY="20px">
            <Flex
              borderColor={"cyan.400"}
              borderWidth={"2px"}
              padding={"10px"}
              gap={"10px"}
              alignItems={"center"}
              background={"white"}
              minWidth={"300px"}
              borderRadius={"6px"}
            >
              <Center
                width={"50px"}
                height={"50px"}
                background={"cyan.100"}
                borderRadius={"full"}
              >
                <FaExclamation color="#00A3C4" />
              </Center>
              <Stack spacing={"4px"}>
                <Text fontWeight={"bold"}>Sincronizando</Text>
                <Text lineHeight={"12px"}>Se está sincronizando</Text>
                <Progress
                  hasStripe
                  value={64}
                  isAnimated
                  colorScheme="cyan"
                  size={"sm"}
                />
              </Stack>
            </Flex>
          </SlideFade>
        </Flex>
      )}
    </>
  );
}
