import { Product } from "@/backend/types/UserType";
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
  Box,
  Input,
  Radio,
  RadioGroup,
  InputGroup,
  InputRightElement,
  Badge
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  product?: Product
}

export default function CreateEditProductDialog({
  action,
  isOpen,
  onClose,
  product
}: Props) {

  const [code, setCode] = useState("" as string)
  const [name, setName] = useState("" as string)
  const [categoryId, setCategoryId] = useState(0 as number)
  const [coste_usd, setCoste_usd] = useState(0 as number)
  const [price_usd, setPrice_usd] = useState(0 as number)
  const [count_unit, setCount_unit] = useState(0 as number)
  const [unitId, setUnitId] = useState("" as number)
  const [gain_rate, setGain_rate] = useState(true as boolean)
  const [rate_seller, setRate_seller] = useState(0 as number)
  const [rate_sponsor, setRate_sponsor] = useState(0 as number)

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setCode(product?.code as string)
        setName(product?.name as string)
        setCategoryId(product?.categoryId as number)
        setCoste_usd(product?.coste_usd as number)
        setPrice_usd(product?.price_usd as number)
        setCount_unit(product?.count_unit as number)
        setUnitId(product?.code as number)
        setGain_rate(product?.gain_rate as boolean)
        setRate_seller(product?.rate_seller as number)
        setRate_sponsor(product?.rate_sponsor as number)
      }
      else {
        setCode("")
        setName("")
        setCategoryId(0)
        setCoste_usd(0)
        setPrice_usd(0)
        setCount_unit(1)
        setUnitId(1)
        setGain_rate(false)
        setRate_seller(0)
        setRate_sponsor(0)
      }
    }
  }, [isOpen])

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
        <ModalHeader>{action == "edit" ? "Editar" : "Crear"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Código</FormLabel>
              <Input type="text" value={code} onChange={t => setCode(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Nombre</FormLabel>
              <Input type="text" value={name} onChange={t => setCode(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Categoría</FormLabel>
              <Select value={categoryId} onChange={t => setCategoryId(parseInt(t.target.value))}>
                <option value="1">Tecnologia</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Costo</FormLabel>
              <InputGroup >
                <Input type="text" value={coste_usd} onChange={t => setCoste_usd(parseFloat(t.target.value))} />
                <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                  <Badge>USD</Badge>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Precio</FormLabel>
              <InputGroup >
                <Input type="text" value={price_usd} onChange={t => setPrice_usd(parseFloat(t.target.value))} />
                <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                  <Badge>USD</Badge>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Cantidad</FormLabel>
              <Input type="text" value={count_unit} onChange={t => setCount_unit(parseFloat(t.target.value))} />
            </FormControl>
            <FormControl>
              <RadioGroup >
                <Flex>
                  <Radio colorScheme="cyan" flex={1} isChecked={gain_rate} onChange={t => setGain_rate(true)}>Fijo</Radio>
                  <Radio colorScheme="cyan" flex={1} isChecked={!gain_rate} onChange={t => setGain_rate(false)}>Variable</Radio>
                </Flex>
              </RadioGroup>
            </FormControl>
            {gain_rate && (
              <>
                <FormControl>
                  <FormLabel><Box as="span" color={"red"}>*</Box> Ganancia Vendedor</FormLabel>
                  <InputGroup >
                    <Input type="text" value={rate_seller} onChange={t => setRate_seller(parseFloat(t.target.value))} />
                    <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                      <Badge>USD</Badge>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel><Box as="span" color={"red"}>*</Box> Ganancia Promotor</FormLabel>
                  <InputGroup >
                    <Input type="text" value={rate_sponsor} onChange={t => setRate_sponsor(parseFloat(t.target.value))} />
                    <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                      <Badge>USD</Badge>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </>
            )}

          </Stack>
        </ModalBody>

        <ModalFooter gap={5} display={'flex'}>
          <Button variant={'ghost'} onClick={onClose}>Cancelar</Button>
          <Button onClick={() => null} color={"white"}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
