import { InventaryType } from "@/backend/types";
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
  Flex,
  ModalFooter,
  Button,
  Badge,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Props = {
  inventary: InventaryType | undefined
  isOpen: boolean
  onClose: () => void
  onEditInventary: ({ inventary, stock, price }: { inventary: InventaryType, stock: number, price: number }) => void
};

export default function EditInventoryDialog({ inventary, isOpen, onClose, onEditInventary }: Props) {
  const [stock, setStock] = useState(0 as number)
  const [price, setPrice] = useState(0 as number)

  useEffect(() => {
    if (isOpen) {
      if (inventary) {
        setStock(inventary?.stock / inventary?.product.count_unit)
        setPrice(inventary.valuecoin.value)
      }
    }
  }, [isOpen, inventary])

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Editar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>En stock <small>(por unidades)</small></FormLabel>
              <NumberInput value={stock} onChange={t => setStock(parseInt(t))}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <FormLabel>Precio</FormLabel>
                <Badge
                  variant={"outline"}
                  colorScheme="purple"
                  borderRadius={"full"}
                  px={"10px"}
                >
                  USD
                </Badge>
              </Flex>
              <Input type="number" value={price} onChange={t => setPrice(parseFloat(t.target.value))} />
              <FormHelperText>Esta variación no modificará el precio en el nomenclador del producto.</FormHelperText>
            </FormControl>

          </Stack>
        </ModalBody>

        <ModalFooter gap={5} display={'flex'}>
          <Button
            variant={'ghost'}
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button onClick={() => {
            onEditInventary({
              inventary: inventary as InventaryType,
              stock: inventary ? (stock * inventary?.product.count_unit) : 0,
              price
            })
          }} color={"white"}>
            Editar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
