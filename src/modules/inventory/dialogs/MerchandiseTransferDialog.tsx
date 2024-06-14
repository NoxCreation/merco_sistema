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

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function MerchandiseTransferDialog({
  isOpen,
  onClose
}: Props) {


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg='#00000030'
        backdropFilter='blur(10px)'
      />
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
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={30}
                  colorScheme="cyan"
                >
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
                <Slider
                  aria-label="slider-ex-1"
                  defaultValue={30}
                  colorScheme="cyan"
                >
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
              <Textarea
                placeholder="Escriba una breve descripcion aca si lo desea..."
                colorScheme="cyan"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="white" color={"gray"}>Cancelar</Button>
          <Button mr={3} onClick={() => null} color={"white"}>
            Trasladar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
