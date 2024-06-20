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
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  ExternalLinkIcon,
  CalendarIcon,
  RepeatClockIcon,
} from "@chakra-ui/icons";
import React from "react";

export default function MakeOrderDialog() {
  return (
    <Modal isOpen={true} onClose={() => null} isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>{"{Nombre de la orden}"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Flex
                width={"full"}
                alignItems={"center"}
                paddingX={"20px"}
              >
                <Checkbox width={"full"}>Tienda</Checkbox>
                <Checkbox width={"full"}>Domicilio</Checkbox>
              </Flex>
            </FormControl>
            <FormControl isRequired>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel>Productos</FormLabel>
                <Flex gap={"10px"}>
                  <Badge
                    variant={"outline"}
                    colorScheme="purple"
                    borderRadius={"full"}
                    paddingX={"12px"}
                  >
                    19 CUP
                  </Badge>
                  <Badge
                    variant={"outline"}
                    colorScheme="purple"
                    borderRadius={"full"}
                    paddingX={"12px"}
                  >
                    25 MLC
                  </Badge>
                  <Badge
                    variant={"outline"}
                    colorScheme="purple"
                    borderRadius={"full"}
                    paddingX={"12px"}
                  >
                    47 USD
                  </Badge>
                </Flex>
              </Flex>
              <Stack>
                <InputGroup size="sm">
                  <Input placeholder="Aceite Refrigerante Universal" />
                  <InputRightAddon
                    cursor={"pointer"}
                    _hover={{ filter: "brightness(0.94)" }}
                    transition={"filter .2s ease"}
                  >
                    <DeleteIcon />
                  </InputRightAddon>
                </InputGroup>
                <InputGroup size="sm">
                  <Input placeholder="Aceite Refrigerante Universal" />
                  <InputRightAddon
                    cursor={"pointer"}
                    _hover={{ filter: "brightness(0.94)" }}
                    transition={"filter .2s ease"}
                  >
                    <DeleteIcon />
                  </InputRightAddon>
                </InputGroup>
                <Button width={"full"} colorScheme="cyan" color={"white"}>
                  <Center gap={"20px"}>
                    <AddIcon />
                    <Text>Agregar</Text>
                  </Center>
                </Button>
              </Stack>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Otros Datos</FormLabel>
            </FormControl>
            <FormControl>
              <FormLabel>Promotor</FormLabel>
              <InputGroup size="sm">
                <Input placeholder="Alina Fonseca Molina" />
                <InputRightAddon
                  cursor={"pointer"}
                  _hover={{ filter: "brightness(0.94)" }}
                  transition={"filter .2s ease"}
                >
                  <ExternalLinkIcon />
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Mensajero</FormLabel>
              <Select>
                <option>Maria Mendieta Rodriguez</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Nombre del cliente</FormLabel>
              <Input placeholder="Juan Mendieta Rodriguez" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Costo</FormLabel>
              <InputGroup size="sm">
                <Input placeholder="24.458,65" />
                <InputRightElement width={"fit-content"} paddingX={"10px"}>
                  <Badge
                    variant={"outline"}
                    colorScheme="purple"
                    borderRadius={"full"}
                    paddingX={"10px"}
                    translateX={"-1000px"}
                  >
                    CUP
                  </Badge>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder="+53 58477311" />
            </FormControl>
            <Flex gap={"5px"}>
              <FormControl isRequired>
                <FormLabel>Fecha Recogida</FormLabel>
                <InputGroup size="sm">
                  <Input placeholder="24.458,65" />
                  <InputRightElement width={"fit-content"} paddingX={"10px"}>
                    <CalendarIcon />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hora inicial</FormLabel>
                <InputGroup size="sm">
                  <Input placeholder="24.458,65" />
                  <InputRightElement width={"fit-content"} paddingX={"10px"}>
                    <RepeatClockIcon />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hora final</FormLabel>
                <InputGroup size="sm">
                  <Input placeholder="24.458,65" />
                  <InputRightElement width={"fit-content"} paddingX={"10px"}>
                    <RepeatClockIcon />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Flex>
            <FormControl isRequired>
              <FormLabel>Direccion</FormLabel>
              <Input placeholder="Calle O e/ E y F #4587" />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="cyan" mr={3} onClick={() => null}>
            Guardar
          </Button>
          <Button>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
