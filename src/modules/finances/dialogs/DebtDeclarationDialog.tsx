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
  ModalFooter,
  Button,
  Input,
  Text,
  InputRightAddon,
  Center,
  Select,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DebtDeclarationDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Cierre Diario"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Ha elegido declarar una deuda en MLC a Juliana Fonseca. Indique de
            cuánto ha sido el faltante. Este proceso solo podrá ser revertido
            por el adminsitrador.
          </Text>
          <Stack mt={"30px"}>
            <FormControl isRequired>
              <FormLabel>Moto</FormLabel>
              <Input placeholder="100" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Vendedor</FormLabel>
              <Select>
                <option>Maripili Fonseca</option>
                <option>Maripili Fonseca 2</option>
                <option>Maripili Fonseca 3</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Descripción</FormLabel>
              <Input placeholder="Breve descripción" />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={onClose} color={"white"}>
            Agregar Deuda
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
