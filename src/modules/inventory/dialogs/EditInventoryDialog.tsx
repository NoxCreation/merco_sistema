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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditInventoryDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
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
                <Badge
                  variant={"outline"}
                  colorScheme="purple"
                  borderRadius={"full"}
                  px={"10px"}
                >
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
                <Badge
                  variant={"outline"}
                  colorScheme="purple"
                  borderRadius={"full"}
                  px={"10px"}
                >
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
          <Button
            colorScheme="gray"
            color={"gray"}
            bgColor={"white"}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button mr={3} onClick={() => null} color={"white"}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
