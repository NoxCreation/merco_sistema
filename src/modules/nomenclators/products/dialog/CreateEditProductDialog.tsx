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
  Flex,
  Stack,
  Box,
  Input,
  Radio,
  RadioGroup,
  InputGroup,
  InputRightElement,
  Badge,
  useToast,
  FormHelperText
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ImageLoadButton } from "../components/ImageLoadButton";
import { create_edit_product } from "@/helper/requests/Products";
import { get_categorie } from "@/helper/requests/Category";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_unit } from "@/helper/requests/Unit";
import { Category, Product, Unit } from "@/backend/types";

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
  const toast = useToast()
  const [categories, setCategories] = useState([] as Array<Category>)
  const [units, setUnits] = useState([] as Array<Unit>)

  const [image, setImage] = useState(undefined as string | undefined)
  const [code, setCode] = useState("" as string)
  const [name, setName] = useState("" as string)
  const [categoryId, setCategoryId] = useState(1 as number)
  const [coste_usd, setCoste_usd] = useState(0 as number)
  const [price_usd, setPrice_usd] = useState(0 as number)
  const [count_unit, setCount_unit] = useState(0 as number)
  const [unitId, setUnitId] = useState(1 as number)
  const [gain_rate, setGain_rate] = useState(true as boolean)
  const [rate_seller, setRate_seller] = useState(0 as number)
  const [rate_sponsor, setRate_sponsor] = useState(0 as number)
  const [file, setFile] = useState(null);
  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setCode(product?.code as string)
        setName(product?.name as string)
        setCategoryId(product?.categoryId as number)
        setCoste_usd(product?.coste_usd as number)
        setPrice_usd(product?.price_usd as number)
        setCount_unit(product?.count_unit as number)
        setUnitId(product?.unitId as number)
        setGain_rate(product?.gain_rate as boolean)
        setRate_seller(product?.rate_seller as number)
        setRate_sponsor(product?.rate_sponsor as number)
        setImage(`${product?.image}`)
        setFile(null)
      }
      else {
        setCode("")
        setName("")
        setCategoryId(1)
        setCoste_usd(0)
        setPrice_usd(0)
        setCount_unit(1)
        setUnitId(1)
        setGain_rate(false)
        setRate_seller(0)
        setRate_sponsor(0)
        setFile(null)
        setImage(undefined)
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      code == "" ||
      name == "" ||
      coste_usd == 0 ||
      isNaN(coste_usd) ||
      price_usd == 0 ||
      isNaN(price_usd) ||
      count_unit == 0 ||
      isNaN(count_unit)
    ) {
      valid = false
    }

    if (action == 'create' && file == null)
      valid = false

    if (gain_rate) {
      if (
        rate_seller == 0 ||
        rate_seller == null ||
        rate_sponsor == 0 ||
        rate_sponsor == null
      ) {
        valid = false
      }
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        image,
        code,
        name,
        categoryId,
        unitId,
        coste_usd,
        price_usd,
        count_unit,
        gain_rate,
        rate_seller,
        rate_sponsor,
        barcode: "",
        businessId: businesses?.id
      }
      await create_edit_product(action, product?.id as number, file, data, (status: number, data: any) => {
        console.log("data", data[0])
        if (status == 200 && (data[0] == undefined || data[0] == 1)) {
          onClose()
        }
        else {
          console.log("error", status, data)
          toast({
            description: "Ocurrió un error al editar/crear. Revise tenga creado y elegido al menos una unidad y una categoría.",
            status: 'error',
            duration: 9000,
            isClosable: true,
            variant: "error"
          })
        }
      })
    }
    else {
      toast({
        description: "Hay campos sin llenar o con valores no válidos.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: "error"
      })
    }

  }

  useEffect(() => {
    if (isOpen) {
      // Filtrar por el id del negocio
      const filter = {
        businessId: businesses?.id
      }
      get_categorie({
        page: 1,
        pageSize: 1000,
        filter
      }, (status: number, data: any) => {
        if (status == 200) {
          setCategories(data.data as Array<Category>)
        }
      })

      get_unit({
        page: 1,
        pageSize: 1000,
        filter
      }, (status: number, data: any) => {
        if (status == 200) {
          setUnits(data.data as Array<Unit>)
        }
      })
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
            <Flex gap={5}>
              <ImageLoadButton file={file} setFile={setFile} image={image} />
              <FormControl>
                <FormLabel><Box as="span" color={"red"}>*</Box> Código</FormLabel>
                <Input type="text" value={code} onChange={t => setCode(t.target.value)} />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Nombre</FormLabel>
              <Input type="text" value={name} onChange={t => setName(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Categoría</FormLabel>
              <Select value={categoryId} onChange={t => setCategoryId(parseInt(t.target.value))}>
                {categories.map((c, i) => (
                  <option value={c.id} key={i}>{c.name}</option>
                ))}
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
              <FormHelperText>Debe ser mayor a cero</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Precio</FormLabel>
              <InputGroup >
                <Input type="text" value={price_usd} onChange={t => setPrice_usd(parseFloat(t.target.value))} />
                <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                  <Badge>USD</Badge>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>Debe ser mayor a cero</FormHelperText>
            </FormControl>
            <Flex gap={5}>
              <FormControl>
                <FormLabel><Box as="span" color={"red"}>*</Box> Cantidad</FormLabel>
                <Input type="text" value={count_unit} onChange={t => setCount_unit(parseFloat(t.target.value))} />
                <FormHelperText>Debe ser mayor a cero</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel><Box as="span" color={"red"}>*</Box> Unidad</FormLabel>
                <Select value={unitId} onChange={t => setUnitId(parseInt(t.target.value))}>
                  {units.map((c, i) => (
                    <option value={c.id} key={i}>{c.symbol} | {c.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
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
                  <FormHelperText>Debe ser mayor a cero</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel><Box as="span" color={"red"}>*</Box> Ganancia Promotor</FormLabel>
                  <InputGroup >
                    <Input type="text" value={rate_sponsor} onChange={t => setRate_sponsor(parseFloat(t.target.value))} />
                    <InputRightElement pointerEvents='none' w={'fit-content'} pr={1}>
                      <Badge>USD</Badge>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText>Debe ser mayor a cero</FormHelperText>
                </FormControl>
              </>
            )}

          </Stack>
        </ModalBody>

        <ModalFooter gap={5} display={'flex'}>
          <Button variant={'ghost'} onClick={onClose}>Cancelar</Button>
          <Button onClick={onCreateEdit} color={"white"}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
