import GenericContainer from "@/frontend/core/components/GenericContainer";
import { Stack, Flex, Text, Center, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SMSPricingCard from "../SMSPricingCard";
import SMSTable from "../SMSTable";
import { ConfigurationType, SmsHistory } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_configuration } from "@/helper/requests/Configuration";
import { Loading } from "@/frontend/core/components/Loading";

export default function SMSSettings() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
  const [sms_history, setSmsHistory] = useState([] as Array<SmsHistory>)
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
        setSmsHistory(config.sms_history)
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

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <GenericContainer title="SMS" w={"full"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"25px"}>
        <Center width={"full"}>
          <Stack
            spacing={"2px"}
            rounded={"full"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"cyan.500"}
            width={"fit-content"}
            paddingX={"20px"}
            paddingY={"32px"}
          >
            <Text fontSize={"30px"} fontWeight={"bold"} lineHeight={"25px"}>
              1000
            </Text>
            <Text lineHeight={"25px"}>SMS</Text>
          </Stack>
        </Center>
        <Flex gap={"15px"}>
          <SMSPricingCard
            title="1000 SMS/180 días"
            price={5500}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
          <SMSPricingCard
            isSelected
            title="2000 SMS/180 días"
            price={1100}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
          <SMSPricingCard
            title="4000 SMS/180 días"
            price={22000}
            benefits={[
              "Paga solo los SMS que necesita consumir",
              "Envia tus campañas a todo el territorio nacional",
              "Vigencia de 180 días",
            ]}
          />
        </Flex>
        <Text fontSize={"15px"}>
          Los SMS son usados para notificar a los promotores cuando se amorticen
          sus órdenes, también para notificar a los administradores del sistema
          de deudas que hayan pasado el día estimado que debe ser cancelada.
        </Text>
        <SMSTable sms_history={sms_history}/>
      </Stack>
    </GenericContainer>
  );
}
