import ProductCard from "@/frontend/core/components/ProductCard";
import { FaArrowLeft } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import {
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
  Text,
  Box,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function AddProductDialog({ onNext, onBack }: Props) {
  const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>([]);

  function handleSelected(index: number) {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(
        selectedIndexes.filter((selectedIndex) => selectedIndex != index)
      );
      return;
    }
    setSelectedIndexes([...selectedIndexes, index]);
  }

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
          <InputGroup>
            <Input placeholder="Buscar por nombre o codigo" />
            <InputRightElement>
              <SearchIcon color={"gray.400"} />
            </InputRightElement>
          </InputGroup>
          <SimpleGrid
            columns={3}
            height={"450px"}
            spacing={"10px"}
            padding={"10px"}
            overflowY={"scroll"}
            overflowX={"hidden"}
          >
            {Array.from({ length: 10 }).map((product, index) => (
              <ProductCard
                onClick={() => handleSelected(index)}
                key={index}
                isSelected={selectedIndexes.includes(index)}
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
        <Button onClick={onBack} colorScheme="gray">Cancelar</Button>
        <Button colorScheme="cyan" ms={3} onClick={onNext} color={"white"}>
          Aceptar
        </Button>
      </ModalFooter>
    </React.Fragment>
  );
}
