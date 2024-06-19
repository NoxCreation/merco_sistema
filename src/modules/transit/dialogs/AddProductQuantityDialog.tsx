import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Input,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Text,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  onNext: () => void;
  onBack: () => void;
  onCancel: () => void;
};

export default function AddProductQuantityDialog({
  onBack,
  onNext,
  onCancel,
}: Props) {
  return (
    <React.Fragment>
      <ModalHeader display={"flex"} alignItems={"center"} gap={"10px"}>
        <Box
          cursor={"pointer"}
          rounded={"full"}
          onClick={onBack}
          padding={"10px"}
          _hover={{ backgroundColor: "gray.100" }}
        >
          <FaArrowLeft size={"12px"} />
        </Box>
        <Text>Agregar</Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={3}>
          <Input placeholder="Aceite Refrigerante" disabled />
          <FormControl isRequired>
            <FormLabel>Cantidad</FormLabel>
            <Flex gap={"10px"} alignItems={"center"}>
              <NumberInput flex={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>Unidades</Text>
            </Flex>
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter gap={"10px"}>
        <Button colorScheme="gray" onClick={onCancel}>
          Cancelar
        </Button>
        <Button colorScheme="cyan" mr={3} onClick={onNext} color={"white"}>
          Aceptar
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
}
