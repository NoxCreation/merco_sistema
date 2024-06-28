import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Stack, Checkbox, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Rules from "../Rules";
import { ConfigurationType, OfferRule } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_configuration, get_configuration } from "@/helper/requests/Configuration";
import { Loading } from "@/frontend/core/components/Loading";
import { create_edit_offerrule, remove_offerrule } from "@/helper/requests/OfferRule";

export default function PayRangeByResultSettings() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
  const [apply_payment_results, setApplyPaymentResults] = useState(true as boolean)
  const [payment_results, setPaymentResults] = useState([] as Array<OfferRule>)
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
        const config = data.data[0] as ConfigurationType
        setApplyPaymentResults(config.apply_payment_results)
        setPaymentResults(config.payment_results)
        setConfig(config)
        console.log(config.offers_rules)
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

  const onUpdateApplyPaymentResults = async () => {
    setLoading(true);
    // Filtrar por el id del negocio
    const data = {
      apply_payment_results: !apply_payment_results
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
        setApplyPaymentResults(!apply_payment_results)
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

  const onSaveOfferRule = async (rule: OfferRule, data: { comparative_symbol: string, value: number, percentage: number }) => {
    setLoading(true);
    await create_edit_offerrule("edit", rule?.id, data, (status: number, data: any) => {
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

  const onAdd = async () => {
    setLoading(true);
    const data = {
      anchor_in: 2,
      configurations_id: config ? config?.id : 0,
      comparative_symbol: '>',
      value: 0,
      percentage: 1
    }
    await create_edit_offerrule("create", 0, data, (status: number, data: any) => {
      if (status == 200) {
        toast({
          description: "Se ha guardado satisfactoriamente!",
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: "success"
        })
        onLoad()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar crear una oferta",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
        setLoading(false)
      }

    })
  }
  
  const onRemoveOfferRule = async (rule: OfferRule) => {
    setLoading(true);
    await remove_offerrule(rule?.id, (status: number, data: any) => {
      if (status == 200) {
        toast({
          description: "Se ha eliminado satisfactoriamente!",
          status: 'success',
          duration: 9000,
          isClosable: true,
          variant: "success"
        })
        onLoad()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar eliminar la oferta",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
        setLoading(false)
      }
    })
  }

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <GenericContainer title="Rango de pagos por resultado" position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"10px"} >
        <Checkbox colorScheme="cyan" isChecked={apply_payment_results} onChange={onUpdateApplyPaymentResults}>Aplicar pagos por resultados</Checkbox>
        <Rules
          isDisabled={apply_payment_results}
          rules={payment_results}
          onSaveOfferRule={onSaveOfferRule}
          onRemoveOfferRule={onRemoveOfferRule}
          onAdd={onAdd}
        />
      </Stack>
    </GenericContainer>
  );
}
