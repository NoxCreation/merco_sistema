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
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Rol, Shop, Shop, UserType } from "@/backend/types";
import { create_edit_messenger } from "@/helper/requests/Messenger";
import { create_edit_user } from "@/helper/requests/User";
import { get_rol } from "@/helper/requests/Rol";
import { get_shops } from "@/helper/requests/Shop";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  user?: UserType
}

export default function CreateEditUserDialog({
  action,
  isOpen,
  onClose,
  user
}: Props) {
  const toast = useToast()

  const [first_name, setFirstName] = useState("" as string)
  const [last_name, setLastName] = useState("" as string)
  const [username, setUsername] = useState("" as string)
  const [ci, setCI] = useState("" as string)
  const [email, setEmail] = useState("" as string)
  const [phone, setPhone] = useState("" as string)
  const [roleId, setRoleId] = useState(1 as number)
  const [shopId, setShopId] = useState(1 as number)

  const [roles, setRoles] = useState([] as Array<Rol>)
  const [shops, setShops] = useState([] as Array<Shop>)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      let filter = {
        businessId: businesses?.id
      } as any
      get_rol({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
        if(status == 200){
          const rols = data.data as Array<Rol>
          setRoles(rols)
        }
      })

      filter = {
        "$Businesses.id$": businesses?.id
      }
      get_shops({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
        if(status == 200){
          const shops = data.data as Array<Shop>
          setShops(shops)
        }
      })

      if (action == 'edit') {
        setFirstName(user?.first_name as string)
        setLastName(user?.last_name as string)
        setUsername(user?.username as string)
        setCI(user?.ci as string)
        setEmail(user?.email as string)
        setPhone(user?.phone as string)
        setRoleId(user?.roleId as number)
        setShopId(user?.shopId as number)
      }
      else {
        setFirstName("")
        setLastName("")
        setUsername("")
        setCI("")
        setEmail("")
        setPhone("")
        setRoleId(1)
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
        username,
        ci,
        email,
        phone,
        roleId,
        shopId,
        "shop.businesses.id": businesses?.id
      }
      await create_edit_user(action, user?.id as number, data, (status: number, data: any) => {
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
              <FormLabel><Box as="span" color={"red"}>*</Box> Usuario</FormLabel>
              <Input type="text" value={username} onChange={t => setUsername(t.target.value)} />
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
              <FormLabel><Box as="span" color={"red"}>*</Box> Rol</FormLabel>
              <Select value={roleId} onChange={t => setRoleId(parseInt(t.target.value))}>
                {roles.map((r, i)=>(
                  <option value={r.id} key={i}>{r.name}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Tienda</FormLabel>
              <Select value={shopId} onChange={t => setShopId(parseInt(t.target.value))}>
                {shops.map((r, i)=>(
                  <option value={r.id} key={i}>{r.name}</option>
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
