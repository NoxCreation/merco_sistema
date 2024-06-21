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
import { Shop } from "@/backend/types";
import { create_edit_categorie } from "@/helper/requests/Category";
import { create_edit_shop } from "@/helper/requests/Shop";
import { useRouter } from "next/router";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  shop?: Shop
  business_id?: string
}

export default function CreateEditShopDialog({
  action,
  isOpen,
  onClose,
  shop,
  business_id
}: Props) {
  const toast = useToast()
  const router = useRouter()
  const { inShow } = router.query

  const [name, setName] = useState("" as string)
  const [description, setDescription] = useState("" as string)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setName(shop?.name as string)
        setDescription(shop?.description as string)
      }
      else {
        setName("")
        setDescription("")
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      name == "" ||
      description == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        name,
        description,
        businessId: business_id ? business_id : businesses?.id
      }
      await create_edit_shop(action, shop?.id as number, data, (status: number, data: any) => {
        if (status == 200 && (data[0] == undefined || data[0] == 1)) {
          onClose()
          if(inShow)
            router.push("/nomenclators/business")
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
              <FormLabel><Box as="span" color={"red"}>*</Box> Descripción</FormLabel>
              <Textarea value={description} onChange={t => setDescription(t.target.value)}/>
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
