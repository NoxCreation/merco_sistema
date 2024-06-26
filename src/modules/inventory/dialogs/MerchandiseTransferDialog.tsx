import { InventaryType } from "@/backend/types";
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
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  inventariesSelects: Array<InventaryType>
};


export default function MerchandiseTransferDialog({ isOpen, inventariesSelects, onClose }: Props) {
  const [count, setCount] = useState([] as Array<number>)

  const labelStyles = {
    mt: '8',
    ml: '0',
    fontSize: 'sm',
    color: 'silver'
  }

  useEffect(()=>{
    if(isOpen){
      
    }
  }, [isOpen])

  console.log(inventariesSelects)
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Traslado de mercancia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
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
            {inventariesSelects.map((inv, i) => (
              <FormControl key={i}>
                <Tooltip label={inv.product.name}>
                  <FormLabel 
                    margin={0} 
                    maxW={'210px'} 
                    overflow={'hidden'} 
                    whiteSpace={'nowrap'} 
                    textOverflow={"ellipsis"}
                  >{inv.product.name}</FormLabel>
                </Tooltip>
                <Flex gap={"20px"}>
                  <Slider
                    aria-label="slider-ex-1"
                    defaultValue={0}
                    max={inv.stock / inv.product.count_unit}
                    colorScheme="cyan"
                  >
                    {Array.from({ length: (inv.stock / inv.product.count_unit) + 1 }).map((_, i) => (
                      <SliderMark value={i} {...labelStyles}>
                        {i}
                      </SliderMark>
                    ))}
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Flex flexDir={'column'}>
                    <Text whiteSpace={"nowrap"}>0 / {inv.stock / inv.product.count_unit} Unidad en Stock</Text>
                    <Text>0 {inv.product.unit.name}</Text>
                  </Flex>
                </Flex>
              </FormControl>
            ))}

            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                placeholder="Escriba una breve descripción acá si lo desea..."
                colorScheme="cyan"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" color={"gray"} bgColor={"white"}>
            Cancelar
          </Button>
          <Button mr={3} onClick={() => null} color={"white"}>
            Trasladar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
