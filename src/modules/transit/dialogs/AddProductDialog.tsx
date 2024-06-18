import ProductCard from "@/frontend/core/components/ProductCard";
import { SearchIcon } from "@chakra-ui/icons";
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
  InputGroup,
  InputRightElement,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

export default function AddProductDialog() {
  return (
    <Modal isOpen={true} onClose={() => null} size={"xl"} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent backgroundColor={""}>
        <ModalHeader>Agregar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <InputGroup>
              <Input placeholder="Buscar por nombre o codigo" />
              <InputRightElement>
                <SearchIcon color={"gray.400"} />
              </InputRightElement>
            </InputGroup>
            <SimpleGrid columns={3} height={"450px"} spacing={"10px"} padding={"10px"} overflowY={"scroll"} overflowX={"hidden"}>
              {Array.from({ length: 10 }).map((product, index) => (
                <ProductCard
                  key={index}
                  currency="USD"
                  photoUrl=""
                  price={28.88}
                  productName="Aceite refrigerante"
                />
              ))}
            </SimpleGrid>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="cyan" mr={3} onClick={() => null}>
            Aceptar
          </Button>
          <Button>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
