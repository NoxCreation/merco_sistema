import { Coin, ConfigurationType } from "@/backend/types";
import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Loading } from "@/frontend/core/components/Loading";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_coin } from "@/helper/requests/Coin";
import { create_edit_configuration, get_configuration } from "@/helper/requests/Configuration";
import {
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function WorkersPaySettings() {

  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState([] as Array<Coin>)
  const businesses = useGetBussiness()
  const toast = useToast()
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
  const [currency_payment_to_workers, setCurrencyPaymentWorkers] = useState(0 as number)

  const onLoad = async () => {
    setLoading(true);
    // obtiene monedas
    const filter = {
      businessId: businesses?.id
    }
    await get_coin({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        setCoins(data.data)
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las monedas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
      setLoading(false)
    })

    // Obtiene configuracion
    setLoading(true);
    await get_configuration({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        const config = data.data[0] as ConfigurationType
        setCurrencyPaymentWorkers(config.currency_payment_to_workers_id)
        setConfig(config)
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

  const onSave= async () => {
    setLoading(true);
    const data = {
      currency_payment_to_workers_id: currency_payment_to_workers
    }
    await create_edit_configuration("edit", config ? config?.id : 0, data, (status: number, data: any) => {
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
    <GenericContainer title="Moneda de pago" w={"full"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"10px"}>
        <FormControl isRequired>
          <FormLabel fontSize={'14px'}>
            Selecciona la moneda en la que serán pagados los trabajadores
          </FormLabel>
          <Select fontSize={'14px'} value={currency_payment_to_workers} onChange={t => setCurrencyPaymentWorkers(parseInt(t.target.value))}>
            {coins.map((c, i) => (
              <option value={c.id} key={i}>{c.symbol}</option>
            ))}
          </Select>
        </FormControl>
        <Flex justifyContent={"end"}>
          <Button w={"fit-content"} colorScheme="cyan" color={"white"} fontSize={'14px'} onClick={onSave}>
            Guardar
          </Button>
        </Flex>
      </Stack>
    </GenericContainer>
  );
}
