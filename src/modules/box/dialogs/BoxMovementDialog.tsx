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
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BoxMovementDialog({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>{"Movimiento"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              Si desea realizar un movimiento en la caja, indique su acción y
              montos.
            </Text>
            <FormControl>
              <FormLabel>Acción</FormLabel>
              <Select>
                <option>Ingreso a caja</option>
                <option>Retiro a caja</option>
                <option>Ingreso a fondo</option>
                <option>Retiro a fondo</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Moneda</FormLabel>
              <Select>
                <option>USD</option>
                <option>CUP</option>
                <option>MLC</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Monto</FormLabel>
              <Input size="md" placeholder="576,5" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea placeholder="Pequeña descripción del movimiento" />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" ms={3} onClick={onClose}>
            Ejecutar movimiento
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
