import React, { useEffect, useState } from "react";
import { Stack, Heading, Text, Flex, Divider, useToast } from "@chakra-ui/react";
import Rules from "../Rules";
import { ConfigurationType, OfferRule } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_configuration } from "@/helper/requests/Configuration";
import { create_edit_offerrule, remove_offerrule } from "@/helper/requests/OfferRule";
import { Loading } from "@/frontend/core/components/Loading";

export default function FixedPaymentQuantitySection() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
  const [data_by_quantity_sponser_fixed_payment, setDataByQuantitySponserFixedPayment] = useState([] as Array<OfferRule>)
  const [data_by_quantity_seller_fixed_payment, setDataByQuantitySellerFixedPayment] = useState([] as Array<OfferRule>)
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
        setDataByQuantitySponserFixedPayment(config.paymentrule.data_by_quantity_sponser_fixed_payment)
        setDataByQuantitySellerFixedPayment(config.paymentrule.data_by_quantity_seller_fixed_payment)
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

  const onAdd = async (anchor_in: number) => {
    setLoading(true);
    const data = {
      anchor_in,
      paymentruleId: config?.paymentrule.id,
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
    <Stack width={"full"} spacing={"20px"} my={"20px"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Flex alignItems={'center'} gap={5}>
        <Heading as="h5" size={"15px"} fontWeight={"800"} color={"gray.500"} w={'fit-content'}>
          CANTIDAD PAGOS FIJOS
        </Heading>
        <Divider flex={1} />
      </Flex>
      <Stack>
        <Text color={"gray.500"} fontSize={'14px'}>
          Promotor
        </Text>
        <Rules
          isDisabled={true}
          rules={data_by_quantity_sponser_fixed_payment}
          onAdd={() => onAdd(5)}
          onSaveOfferRule={onSaveOfferRule}
          onRemoveOfferRule={onRemoveOfferRule}
        />
      </Stack>
      <Stack>
        <Text color={"gray.500"} fontSize={'14px'}>
          Vendedor
        </Text>
        <Rules
          isDisabled={true}
          rules={data_by_quantity_seller_fixed_payment}
          onAdd={() => onAdd(6)}
          onSaveOfferRule={onSaveOfferRule}
          onRemoveOfferRule={onRemoveOfferRule}
        />
      </Stack>
    </Stack>
  );
}
