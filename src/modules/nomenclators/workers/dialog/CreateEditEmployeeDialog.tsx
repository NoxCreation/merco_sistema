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
import { Employees, Charge } from "@/backend/types";
import { create_edit_employees } from "@/helper/requests/Employees";
import { get_charges } from "@/helper/requests/Charges";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  employee?: Employees
}

export default function CreateEditEmployeeDialog({
  action,
  isOpen,
  onClose,
  employee
}: Props) {
  const toast = useToast()

  const [first_name, setFirstName] = useState("" as string)
  const [last_name, setLastName] = useState("" as string)
  const [ci, setCI] = useState("" as string)
  const [email, setEmail] = useState("" as string)
  const [phone, setPhone] = useState("" as string)
  const [chargeId, setChargeId] = useState(0 as number)

  const [charges, setCharges] = useState([] as Array<Charge>)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      if (action == 'edit') {
        setFirstName(employee?.first_name as string)
        setLastName(employee?.last_name as string)
        setCI(employee?.ci as string)
        setEmail(employee?.email as string)
        setPhone(employee?.phone as string)
        setChargeId(employee?.chargeId as number)
      }
      else {
        setFirstName("")
        setLastName("")
        setCI("")
        setEmail("")
        setPhone("")
        setChargeId(1)
      }

    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      // Filtrar por el id del negocio
      const filter = {
        businessId: businesses?.id
      }
      get_charges({
        page: 1,
        pageSize: 10000,
        filter
      }, (status: number, data: any) => {
        if (status == 200) {
          setCharges(data.data as Array<Charge>)
        }
      })
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
        chargeId,
        businessId: businesses?.id
      }
      await create_edit_employees(action, employee?.id as number, data, (status: number, data: any) => {
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
              <FormLabel>Cargo</FormLabel>
              <Select value={chargeId} onChange={t => setChargeId(parseInt(t.target.value))}>
                {charges.map((c, i) => (
                  <option value={c.id} key={i}>{c.name}</option>
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
