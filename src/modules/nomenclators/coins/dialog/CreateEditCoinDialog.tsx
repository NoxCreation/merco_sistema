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
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_unit, get_unit } from "@/helper/requests/Unit";
import { Coin } from "@/backend/types";
import { create_edit_coin } from "@/helper/requests/Coin";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  coin?: Coin
}

export default function CreateEditCoinDialog({
  action,
  isOpen,
  onClose,
  coin
}: Props) {
  const toast = useToast()

  const [active, setActive] = useState(true as boolean)
  const [value_change, setValueChange] = useState(0 as number)
  const [symbol, setSymbol] = useState("" as string)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setActive(coin?.active as boolean)
        setValueChange(coin?.value_change as number)
        setSymbol(coin?.symbol as string)
      }
      else {
        setActive(true)
        setValueChange(0)
        setSymbol("")
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      value_change == 0 ||
      symbol == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        active,
        symbol,
        value_change,
        businessId: businesses?.id
      }
      await create_edit_coin(action, coin?.id as number, data, (status: number, data: any) => {
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
              <Checkbox isChecked={active} onChange={t => setActive(t.target.checked)}>Activo</Checkbox>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Valor de Cambio</FormLabel>
              <Input type="number" value={value_change} onChange={t => setValueChange(parseFloat(t.target.value))} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Símbolo</FormLabel>
              <Input type="text" value={symbol} onChange={t => setSymbol(t.target.value)} />
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
