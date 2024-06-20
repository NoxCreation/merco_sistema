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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_unit, get_unit } from "@/helper/requests/Unit";
import { Unit } from "@/backend/types";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  unit?: Unit
}

export default function CreateEditUnitDialog({
  action,
  isOpen,
  onClose,
  unit
}: Props) {
  const toast = useToast()

  const [name, setName] = useState("" as string)
  const [symbol, setSymbol] = useState("" as string)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setName(unit?.name as string)
        setSymbol(unit?.symbol as string)
      }
      else {
        setName("")
        setSymbol("")
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      name == "" ||
      symbol == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        name,
        symbol,
        businessId: businesses?.id
      }
      await create_edit_unit(action, unit?.id as number, data, (status: number, data: any) => {
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
