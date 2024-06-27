import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  FormControl,
  Input,
  Stack,
  Button,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CurrencyItem from "../CurrencyItem";
import { AddIcon } from "@chakra-ui/icons";
import { Coin } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_coin } from "@/helper/requests/Coin";
import { Loading } from "@/frontend/core/components/Loading";
import { useRouter } from "next/router";

export default function CurrencySettings() {
  const [loading, setLoading] = useState(true)
  const [coins, setCoins] = useState([] as Array<Coin>)
  const businesses = useGetBussiness()
  const toast = useToast()
  const router = useRouter()

  const onLoad = async () => {
    setLoading(true);
    // Filtrar por el id del negocio
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
  }

  useEffect(() => {
    onLoad()
  }, []);

  return (
    <GenericContainer title="Divisas" width={"full"} position={'relative'}>
      <Loading isLoading={loading} adapted />
      <Stack spacing={"10px"}>
        {(coins.toReversed()).map((c, i) => (
          <CurrencyItem key={i} active={c.active} symbol={c.symbol} value_change={c.value_change} />
        ))}
        <Button colorScheme="cyan" color={"white"} onClick={()=>router.push("/nomenclators/coins")}>
          <Center gap={"20px"}>
            <AddIcon />
            <Text fontSize={'14px'}>Agregar</Text>
          </Center>
        </Button>
      </Stack>
    </GenericContainer>
  );
}
