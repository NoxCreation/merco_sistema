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
  Stack,
  Box,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { CardAccount, Coin } from "@/backend/types";
import { create_edit_cardaccount } from "@/helper/requests/CardAccount";
import { get_coin } from "@/helper/requests/Coin";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  card?: CardAccount
}

export default function CreateEditCardAccountDialog({
  action,
  isOpen,
  onClose,
  card
}: Props) {
  const toast = useToast()

  const [name, setName] = useState("" as string)
  const [code, setCode] = useState("" as string)
  const [limit, setLimit] = useState(0 as number)
  const [flexibility, setFlexibility] = useState("comision" as string)
  const [percent_flexibility, setPercentFlexibility] = useState(0 as number)
  const [coinId, setCoinId] = useState(1 as number)

  const [coins, setCoins] = useState([] as Array<Coin>)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      get_coin({ page: 1, pageSize: 10000 }, (status: number, data: any) => {
        if (status == 200)
          setCoins(data.data)
      })

      if (action == 'edit') {
        setName(card?.name as string)
        setCode(card?.code as string)
        setLimit(card?.limit as number)
        setFlexibility(card?.flexibility as string)
        setPercentFlexibility(card?.percent_flexibility as number)
        setCoinId(card?.coinId as number)
      }
      else {
        setName("")
        setCode("")
        setLimit(0)
        setFlexibility("comision")
        setPercentFlexibility(0)
        setCoinId(1)
      }
    }
  }, [isOpen])


  const isValid = () => {
    let valid = true
    if (
      name == "" ||
      code == "" ||
      isNaN(limit) ||
      isNaN(percent_flexibility)
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        active: card ? card?.active : true,
        name,
        code,
        value: card ? card?.value : 0,
        limit,
        coinId,
        flexibility,
        percent_flexibility,
        businessId: businesses?.id,
        historyId: card ? card?.historycardaccount : [],
      }
      await create_edit_cardaccount(action, card?.id as number, data, (status: number, data: any) => {
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
              <FormLabel><Box as="span" color={"red"}>*</Box> Nombre</FormLabel>
              <Input type="text" value={name} onChange={t => setName(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Código</FormLabel>
              <Input type="text" value={code} onChange={t => setCode(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Límite</FormLabel>
              <Input type="text" value={limit} onChange={t => setLimit(parseFloat(t.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Tipo de Flexibilización</FormLabel>
              <Select value={flexibility} onChange={t => setFlexibility(t.target.value)} >
                <option value={"comision"}>Comisión</option>
                <option value={"tax"}>Impuesto</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Porcentaje de Flexibilización</FormLabel>
              <Input type="text" value={percent_flexibility} onChange={t => setPercentFlexibility(parseFloat(t.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Moneda</FormLabel>
              <Select value={coinId} onChange={t => setCoinId(parseInt(t.target.value))}>
                {coins.map((c, i) => (
                  <option value={c.id} key={i}>{c.symbol}</option>
                ))}
              </Select>
            </FormControl>
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
