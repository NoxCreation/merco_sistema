import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Stack, Checkbox, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Rules from "../Rules";
import { create_edit_configuration, get_configuration } from "@/helper/requests/Configuration";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Loading } from "@/frontend/core/components/Loading";
import { ConfigurationType, OfferRule } from "@/backend/types";
import { create_edit_offerrule, remove_offerrule } from "@/helper/requests/OfferRule";

export default function OfferRulesSettings() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
  const [apply_rules_ofers, setApplyRulesOfers] = useState(true as boolean)
  const [offers_rules, setOffersRules] = useState([] as Array<OfferRule>)
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
        setApplyRulesOfers(config.apply_rules_ofers)
        setOffersRules(config.offers_rules)
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

  const onUpdateApplyRulesOfers = async () => {
    setLoading(true);
    // Filtrar por el id del negocio
    const data = {
      apply_rules_ofers: !apply_rules_ofers
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
        setApplyRulesOfers(!apply_rules_ofers)
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
      anchor_in: 1,
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
    <GenericContainer title="Reglas y ofertas" width={"full"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"10px"}>
        <Checkbox colorScheme="cyan" isChecked={apply_rules_ofers} onChange={onUpdateApplyRulesOfers}>Aplicar ofertas</Checkbox>
        <Rules
          isDisabled={apply_rules_ofers}
          rules={offers_rules}
          onSaveOfferRule={onSaveOfferRule}
          onRemoveOfferRule={onRemoveOfferRule}
          onAdd={onAdd}
        />
      </Stack>
    </GenericContainer>
  );
}
