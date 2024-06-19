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
  Badge,
  Button,
  Checkbox,
  Flex,
  InputGroup,
  Input,
  Text,
  InputRightAddon,
  Center,
  Select,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import DollarIcon from "@/frontend/core/icons/DollarIcon";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onGenerateDebt: () => void;
};

export default function DailyCloseDialog({
  isOpen,
  onClose,
  onGenerateDebt,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{"Cierre Diario"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Debe realizar el conteo en físico del dinero en la tienda y
            confirmar que la caja cierra sin incidencias. Si hay un faltante,
            debe generar una deuda a este vendedor para que le sea descontado de
            su sueldo.
          </Text>
          <Stack mt={"30px"}>
            <FormControl>
              <FormLabel>Vendedor</FormLabel>
              <Select>
                <option>Maripili Fonseca</option>
                <option>Maripili Fonseca 2</option>
                <option>Maripili Fonseca 3</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>USD</FormLabel>
              <InputGroup>
                <Input
                  borderTopRightRadius={0}
                  borderBottomRightRadius={0}
                  type="number"
                />
                <Tooltip label={"Generar Deuda"} hasArrow placement="top-end">
                  <InputRightAddon backgroundColor={"green.400"}>
                    <DollarIcon color="#fff" />
                  </InputRightAddon>
                </Tooltip>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>CUP</FormLabel>
              <InputGroup>
                <Input
                  borderTopRightRadius={0}
                  borderBottomRightRadius={0}
                  type="number"
                />
                <Tooltip label={"Generar Deuda"} hasArrow placement="top-end">
                  <InputRightAddon
                    backgroundColor={"green.400"}
                    onClick={onGenerateDebt}
                  >
                    <DollarIcon color="#fff" />
                  </InputRightAddon>
                </Tooltip>
              </InputGroup>
            </FormControl>
            <FormControl isDisabled>
              <FormLabel>MLC</FormLabel>
              <InputGroup>
                <Input
                  borderTopRightRadius={0}
                  borderBottomRightRadius={0}
                  type="number"
                />
                <Tooltip label={"Generar Deuda"} hasArrow placement="top-end">
                  <InputRightAddon
                    backgroundColor={"red.300"}
                    onClick={onGenerateDebt}
                  >
                    <DollarIcon color="#fff" />
                  </InputRightAddon>
                </Tooltip>
              </InputGroup>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3}>
            Cancelar
          </Button>
          <Button colorScheme="cyan" onClick={onClose} color={"white"}>
            Crear Cierre
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
