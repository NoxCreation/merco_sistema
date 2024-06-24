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
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Messenger } from "@/backend/types";
import { create_edit_messenger } from "@/helper/requests/Messenger";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  messenger?: Messenger
}

export default function CreateEditMessengerDialog({
  action,
  isOpen,
  onClose,
  messenger
}: Props) {
  const toast = useToast()

  const [first_name, setFirstName] = useState("" as string)
  const [last_name, setLastName] = useState("" as string)
  const [ci, setCI] = useState("" as string)
  const [email, setEmail] = useState("" as string)
  const [phone, setPhone] = useState("" as string)
  const [more_data, setMoreData] = useState("" as string)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setFirstName(messenger?.first_name as string)
        setLastName(messenger?.last_name as string)
        setCI(messenger?.ci as string)
        setEmail(messenger?.email as string)
        setPhone(messenger?.phone as string)
        setMoreData(messenger?.more_data as string)
      }
      else {
        setFirstName("")
        setLastName("")
        setCI("")
        setEmail("")
        setPhone("")
        setMoreData("")
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      first_name == "" ||
      last_name == "" ||
      ci == "" ||
      email == "" ||
      phone == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        first_name,
        last_name,
        ci,
        email,
        phone,
        more_data,
        businessId: businesses?.id
      }
      await create_edit_messenger(action, messenger?.id as number, data, (status: number, data: any) => {
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
              <FormLabel><Box as="span" color={"red"}>*</Box> Nombres</FormLabel>
              <Input type="text" value={first_name} onChange={t => setFirstName(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Apellidos</FormLabel>
              <Input type="text" value={last_name} onChange={t => setLastName(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> CI</FormLabel>
              <Input type="text" value={ci} onChange={t => setCI(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Correo</FormLabel>
              <Input type="email" value={email} onChange={t => setEmail(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Teléfono</FormLabel>
              <Input type="text" value={phone} onChange={t => setPhone(t.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Más Datos</FormLabel>
              <Textarea value={more_data} onChange={t => setMoreData(t.target.value)} />
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
