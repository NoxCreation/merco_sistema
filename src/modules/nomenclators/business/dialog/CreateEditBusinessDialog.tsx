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
  Text,
  Flex,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Bussines } from "@/backend/types";
import { create_edit_bussiness } from "@/helper/requests/Bussiness";
import { AddIcon, DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  business?: Bussines
}

export default function CreateEditBusinessDialog({
  action,
  isOpen,
  onClose,
  business
}: Props) {
  const toast = useToast()

  const [name, setName] = useState("" as string)
  const [shopsId, setShopsId] = useState([] as Array<number>)

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setName(business?.name as string)
        setShopsId(business?.shops.map(s => s.id) as [])
      }
      else {
        setName("")
        setShopsId([])
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      name == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        name,
        shopsId
      }
      await create_edit_bussiness(action, business?.id as number, data, (status: number, data: any) => {
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
            {/* <Flex gap={3} flexDir={'column'}>
              <FormLabel><Box as="span" color={"red"}>*</Box> Tiendas</FormLabel>
              <Flex flexDir={'column'} gap={3}>
                <Flex>
                  <Text flex={1}>Tienda 1</Text>
                  <DeleteIcon />
                </Flex>
                <Flex>
                  <Text flex={1}>Tienda 2</Text>
                  <DeleteIcon />
                </Flex>
              </Flex>
              <Flex>
                <Button
                  width={"full"}
                  colorScheme="cyan"
                  color={"white"}
                >
                  <Center gap={"20px"}>
                    <AddIcon />
                    <Text>Agregar</Text>
                  </Center>
                </Button>
              </Flex>
            </Flex> */}
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
