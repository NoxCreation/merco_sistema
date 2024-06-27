import { Divider, Flex, FormControl, FormLabel, Heading, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UnitItem from "../UnitItem";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { ConfigurationType } from "@/backend/types";
import { get_configuration } from "@/helper/requests/Configuration";
import { Loading } from "@/frontend/core/components/Loading";

export default function UnitsSection() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState(undefined as ConfigurationType | undefined)
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

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <Stack width={"full"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Flex alignItems={'center'} gap={5}>
        <Heading as="h5" size={"15px"} fontWeight={"800"} color={"gray.500"} w={'fit-content'}>
          UNIDAD
        </Heading>
        <Divider flex={1} />
      </Flex>
      <FormControl>
        <FormLabel fontSize={'14px'} color={'gray.500'}>Promotor</FormLabel>
        <UnitItem />
      </FormControl>
      <FormControl>
        <FormLabel fontSize={'14px'} color={'gray.500'}>Vendedor</FormLabel>
        <UnitItem />
      </FormControl>
    </Stack>
  );
}
