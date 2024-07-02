import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Loading } from "@/frontend/core/components/Loading";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_configuration, get_configuration } from "@/helper/requests/Configuration";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function CapitalizationAndFundsSettings() {

  const [loading, setLoading] = useState(true)
  const [config_id, setConfigId] = useState(0 as number)
  const [administrative_payments, setAdministrativePayments] = useState(0 as number)
  const [re_investment, setReInvestment] = useState(0 as number)
  const businesses = useGetBussiness()
  const toast = useToast()

  const onLoad = async () => {
    setLoading(true);
    // Filtrar por el id del negocio
    const filter = {
      businessId: businesses?.id
    }
    await get_configuration({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        setAdministrativePayments(data.data[0].administrative_payments)
        setReInvestment(data.data[0].re_investment)
        setConfigId(data.data[0].id)
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar la configuración",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
      setLoading(false)
    })
  }

  const onSave = async () => {
    setLoading(true);
    // Filtrar por el id del negocio
    const data = {
      administrative_payments,
      re_investment
    }
    await create_edit_configuration("edit", config_id, data, (status: number, data: any) => {
      if (status == 200) {
        toast({
          description: "Se ha guardado satisfactoriamente!",
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: "success"
        })
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar la configuración",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <GenericContainer title="Capitalización y fondos" position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"10px"}>
        <FormControl isRequired>
          <FormLabel fontSize={'14px'} color={'gray.500'}>Pagos administrativos</FormLabel>
          <InputGroup>
            <Input type="number" value={administrative_payments} onChange={t => {
              setReInvestment(100 - parseFloat(t.target.value))
              setAdministrativePayments(parseFloat(t.target.value))
            }} />
            <InputRightElement>%</InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel fontSize={'14px'} color={'gray.500'}>Re inversión</FormLabel>
          <InputGroup>
            <Input type="number" value={re_investment} onChange={t => {
              setAdministrativePayments(100 - parseFloat(t.target.value))
              setReInvestment(parseFloat(t.target.value))
            }} />
            <InputRightElement>%</InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex justifyContent={"end"}>
          <Button w={"fit-content"} colorScheme="cyan" color={"white"} isDisabled={loading} onClick={onSave}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </GenericContainer>
  );
}
