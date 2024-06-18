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
} from "@chakra-ui/icons";
import React from "react";

export default function TransitDetailsDialog() {
  const [haveAddress, setHaveAddress] = React.useState<boolean>(false);
  const [haveAmortization, setHaveAmortization] =
    React.useState<boolean>(false);

  return (
    <Modal isOpen={true} onClose={() => null} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={"500px"}>
        <ModalHeader>{"T-023023"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Tipo</FormLabel>
              <Flex width={"full"} alignItems={"center"} paddingX={"20px"}>
                <Checkbox
                  width={"full"}
                  checked={haveAddress}
                  onChange={() => setHaveAddress(!haveAddress)}
                >
                  Domicilio
                </Checkbox>
                <Checkbox
                  width={"full"}
                  checked={haveAmortization}
                  onChange={() => setHaveAmortization(!haveAmortization)}
                >
                  Deuda
                </Checkbox>
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
                <Flex
                  width={"full"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  paddingY={"10px"}
                >
                  <Text>Aceite Refrigerante Universal</Text>
                  <DeleteIcon cursor={"pointer"} />
                </Flex>
                <Flex
                  width={"full"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  paddingY={"10px"}
                >
                  <Text>Aceite Refrigerante Universal</Text>
                  <DeleteIcon cursor={"pointer"} />
                </Flex>
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
            {haveAddress && (
              <React.Fragment>
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
              </React.Fragment>
            )}
            <FormControl isRequired>
              <FormLabel>Nombre del cliente</FormLabel>
              <Input placeholder="Juan Mendieta Rodriguez" />
            </FormControl>
            {haveAddress && (
              <FormControl isRequired>
                <FormLabel>Costo</FormLabel>
                <InputGroup size="sm">
                  <Input placeholder="24.458,65" colorScheme="cyan" />
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
            )}
            <FormControl isRequired>
              <FormLabel>Telefono</FormLabel>
              <Input placeholder="+53 58477311" />
            </FormControl>
            <Flex gap={"5px"} alignItems={"end"}>
              <FormControl isRequired colorScheme="cyan">
                <FormLabel>Fecha Recogida</FormLabel>
                <Input placeholder="24.458,65" colorScheme="cyan" type="date" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hora inicial</FormLabel>
                <Input placeholder="24.458,65" type="time" colorScheme="cyan" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Hora final</FormLabel>
                <Input placeholder="24.458,65" type="time" colorScheme="cyan" />
              </FormControl>
            </Flex>
            {haveAddress && (
              <FormControl isRequired>
                <FormLabel>Direccion</FormLabel>
                <Input placeholder="Calle O e/ E y F #4587" />
              </FormControl>
            )}
            {haveAmortization && (
              <FormControl isRequired>
                <FormLabel>Amortización</FormLabel>
                <InputGroup size="sm">
                  <Input placeholder="24.458,65" colorScheme="cyan" />
                  <InputRightElement width={"fit-content"} paddingX={"10px"}>
                    <Badge
                      variant={"outline"}
                      colorScheme="purple"
                      borderRadius={"full"}
                      paddingX={"10px"}
                      translateX={"-1000px"}
                    >
                      USD
                    </Badge>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="cyan"
            mr={3}
            onClick={() => null}
            color={"white"}
          >
            Guardar
          </Button>
          <Button color={"white"}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
