import { InventaryType, Shop } from "@/backend/types";
import { generateRandomString } from "@/helper/generatePassword";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { set_inventary_relocation } from "@/helper/requests/Inventary";
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
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean
  onClose: () => void
  onEndTransfer: () => void
  inventariesSelects: Array<InventaryType>
  shops: Array<Shop>
};


export default function MerchandiseTransferDialog({ isOpen, inventariesSelects, shops, onClose, onEndTransfer }: Props) {
  const [count, setCount] = useState([] as Array<number>)
  const [shop, setShop] = useState(0 as number)
  const [description, setDescription] = useState("" as string)
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const { data: session } = useSession()
  const businesses = useGetBussiness()

  const labelStyles = {
    mt: '8',
    ml: '0',
    fontSize: 'sm',
    color: 'silver'
  }

  useEffect(() => {
    if (isOpen) {
      setCount(inventariesSelects.map(t => 1))
      setShop(shops[0].id)
      setDescription("")
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    count.forEach(c => {
      if (c == 0)
        valid = false
    })

    return valid
  }

  const onRelocation = () => {
    if (isValid()) {
      setLoading(true)
      const inventary_relocation = inventariesSelects.map((t, i) => {
        return {
          inventaryId: t.id,
          stock: count[i] * t.product.count_unit
        }
      })

      const historyId = `H-${generateRandomString(5)}`
      const data = {
        historyId,
        userId: session?.user.id,
        shopId: shop,
        inventary_relocation,
        description,
        businessId: businesses?.id
      }

      set_inventary_relocation(data, (status: number, data: any) => {
        setTimeout(() => {
          if (status == 200) {
            onEndTransfer()
            onClose()
          }
          else {
            console.log("error", status, data)
            toast({
              description: "No se ha podido transferir los productos del inventario.",
              status: 'error',
              duration: 9000,
              isClosable: true,
              variant: "error"
            })
          }
          setLoading(false)
        }, 1000)
      })
    }
    else {
      toast({
        description: "La cantidad a transferir debe ser mayor a cero.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: "error"
      })
    }
  }


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader>Traslado de mercancia</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Stack spacing={4}>
            <Text>
              Las siguientes mercancías serán trasladadas hacia alguna tienda.
              Revise bien antes de proceder con el traslado.
            </Text>
            <FormControl>
              <FormLabel>Trasladar a:</FormLabel>
              <Select value={shop} onChange={t => setShop(parseInt(t.target.value))} isDisabled={loading}>
                {shops.map((s, i) => (
                  <option key={i} value={s.id}>{s.name}</option>
                ))}
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
                    isDisabled={loading}
                    aria-label="slider-ex-1"
                    max={inv.stock / inv.product.count_unit}
                    colorScheme="cyan"
                    defaultValue={count[i]}
                    value={count[i]}
                    onChange={t => {
                      let temp = JSON.parse(JSON.stringify(count))
                      temp[i] = t
                      setCount(temp)
                    }}
                  >
                    {Array.from({ length: (inv.stock / inv.product.count_unit) + 1 }).map((_, i) => (
                      <SliderMark value={i} {...labelStyles} key={i}>
                        {i}
                      </SliderMark>
                    ))}
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <Flex flexDir={'column'}>
                    <Text whiteSpace={"nowrap"}>{count[i]} / {inv.stock / inv.product.count_unit} Unidad en Stock</Text>
                    <Text>{count[i] * inv.product.count_unit} {inv.product.unit.name}</Text>
                  </Flex>
                </Flex>
              </FormControl>
            ))}

            <FormControl>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                value={description}
                onChange={t => setDescription(t.target.value)}
                placeholder="Escriba una breve descripción acá si lo desea..."
                colorScheme="cyan"
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter display={'flex'} gap={2}>
          <Button colorScheme="gray" color={"gray"} bgColor={"white"} onClick={onClose} isDisabled={loading}>
            Cancelar
          </Button>
          <Button mr={3} onClick={onRelocation} color={"white"} isLoading={loading}>
            Trasladar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
