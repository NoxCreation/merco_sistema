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
} from "@chakra-ui/react";
import React from "react";

export default function AddProductQuantityDialog() {
  return (
    <Modal
      isOpen={true}
      onClose={() => null}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent backgroundColor={""}>
        <ModalHeader>Agregar</ModalHeader>
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
          <Button colorScheme="gray">Cancelar</Button>
          <Button colorScheme="cyan" mr={3} onClick={() => null} color={"white"}>
            Aceptar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
