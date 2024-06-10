import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  ModalFooter,
  Button,
  Badge,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

export default function EditInventoryDialog() {
  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"{nombre del producto a editar}"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>En stock</FormLabel>
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel>Trasladar a:</FormLabel>
                <Badge variant={"outline"} colorScheme="purple" borderRadius={"full"} px={"10px"}>
                  USD
                </Badge>
              </Flex>
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel>Trasladar a:</FormLabel>
                <Badge variant={"outline"} colorScheme="purple" borderRadius={"full"} px={"10px"}>
                  USD
                </Badge>
              </Flex>
              <NumberInput>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="cyan" mr={3} onClick={() => null}>
            Editar
          </Button>
          <Button>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
