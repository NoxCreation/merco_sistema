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
  Flex,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Expense, Coin } from "@/backend/types";
import { create_edit_expense } from "@/helper/requests/Expenses";
import { get_coin } from "@/helper/requests/Coin";

interface Props {
  action: string
  isOpen: boolean
  onClose: () => void
  expense?: Expense
}

export default function CreateEditExpenseDialog({
  action,
  isOpen,
  onClose,
  expense
}: Props) {
  const toast = useToast()

  const [amount, setAmount] = useState(0 as number)
  const [coinId, setCoinId] = useState(1 as number)
  const [description, setDescription] = useState("" as string)

  const [coins, setCoins] = useState([] as Array<Coin>)

  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      get_coin({ page: 1, pageSize: 10000 }, (status: number, data: any) => {
        if (status == 200)
          setCoins(data.data)
      })

      if (action == 'edit') {
        console.log(expense)
        setAmount(expense?.valuecoin.value as number)
        setCoinId(expense?.valuecoin.coin.id as number)
        setDescription(expense?.description as string)
      }
      else {
        setAmount(0)
        setCoinId(1)
        setDescription("")
      }
    }
  }, [isOpen])

  const isValid = () => {
    let valid = true
    if (
      amount == 0 ||
      description == ""
    ) {
      valid = false
    }

    return valid
  }

  const onCreateEdit = async () => {
    if (isValid()) {
      const data = {
        amount,
        coinId,
        description,
        amountId: expense?.amountId,
        businessId: businesses?.id
      }
      await create_edit_expense(action, expense?.id as number, data, (status: number, data: any) => {
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
            <Flex gap={5}>
              <FormControl>
                <FormLabel><Box as="span" color={"red"}>*</Box> Cantidad</FormLabel>
                <Input type="text" value={amount} onChange={t => setAmount(parseFloat(t.target.value))} />
              </FormControl>
              <FormControl>
                <FormLabel><Box as="span" color={"red"}>*</Box> Cantidad</FormLabel>
                <Select value={coinId} onChange={t => setCoinId(parseInt(t.target.value))}>
                  {coins.map((c, i) => (
                    <option value={c.id} key={i}>{c.symbol}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel><Box as="span" color={"red"}>*</Box> Description</FormLabel>
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
