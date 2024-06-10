import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Slider,
  Flex,
  Text,
  Textarea,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Stack,
} from "@chakra-ui/react";
import React from "react";

export default function MerchandiseTransferDialog() {
  return (
    <Modal isOpen={true} onClose={() => null}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Traslado de mercancia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Text>
              Las siguientes mercancías será trasladadas hacia alguna tienda.
              Revise bien antes de proceder con el traslado.
            </Text>
            <FormControl>
              <FormLabel>Trasladar a:</FormLabel>
              <Select>
                <option>Frio Plus</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel margin={0}>Aflojalo Todo WD40 691ml</FormLabel>
              <Flex gap={"10px"}>
                <Slider aria-label="slider-ex-1" defaultValue={30}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text whiteSpace={"nowrap"}>5 unidades en stock</Text>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel margin={0}>Aceite Refrigerante Universal</FormLabel>
              <Flex gap={"10px"}>
                <Slider aria-label="slider-ex-1" defaultValue={30}>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text whiteSpace={"nowrap"}>2 unidades en stock</Text>
              </Flex>
            </FormControl>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Textarea placeholder="Escriba una breve descripcion aca si lo desea..." />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="cyan" mr={3} onClick={() => null}>
            Trasladar
          </Button>
          <Button>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
