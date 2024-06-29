import { InventaryType } from "@/backend/types";
import { Loading } from "@/frontend/core/components/Loading";
import ProductCard from "@/frontend/core/components/ProductCard";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_inventary } from "@/helper/requests/Inventary";
import { Flex, SimpleGrid, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InvoiceType } from "../type";

interface Props {
  onAddProductOnCar: (inventary: InventaryType) => void
  shop_select: number
  invoice_products: InvoiceType
}

export default function ProductGrid({
  onAddProductOnCar,
  shop_select,
  invoice_products
}: Props) {

  const [loading, setLoading] = useState(true)
  const businesses = useGetBussiness()
  const toast = useToast()
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 10
  } as {
    page: number,
    pageSize: number,
    count: number
  })

  // Load Inventary
  const [inventary, setInventary] = useState([] as Array<InventaryType>)
  const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
    const filter = {
      businessId: businesses?.id,
      shopId: shop_select
    }
    setLoading(true)
    get_inventary({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter: new_filter ? new_filter : filter }, (status: number, data: any) => {
      if (status == 200) {
        setInventary(data.data)
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las tiendas",
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
  }, [pagination, shop_select])

  const isSelected = (inv: InventaryType) => {
    return invoice_products.products.find(t => t.inventary.id == inv.id) != null
  }

  const onFindAndSelect = (code: string) => {
    const filter = {
      businessId: businesses?.id,
      shopId: shop_select,
      "$product.code$": code
    }
    setLoading(true)
    get_inventary({ page: 1, pageSize: 10000, filter: filter }, (status: number, data: any) => {
      if (status == 200) {
        //setInventary(data.data)
        const inv = data.data[0] as InventaryType
        console.log(inv)
        if (!isSelected(inv))
          onAddProductOnCar(inv)
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las tiendas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
      setLoading(false)
    })
  }

  // Para detectar el escaner
  const [codeBars, setCodeBars] = useState('')
  useEffect(() => {
    const handleInputKeyboard = (evento: any) => {
      if (evento.key === 'Enter') {
        onFindAndSelect(codeBars)
        setCodeBars('');
      } else {
        setCodeBars(codeBars + evento.key);
        setTimeout(() => {
          setCodeBars('')
        }, 1000)
      }
    }
    window.addEventListener('keydown', handleInputKeyboard);
    return () => {
      window.removeEventListener('keydown', handleInputKeyboard);
    }
  }, [codeBars]);

  return (
    <Flex gap={"18px"} flex={4} position={'relative'} wrap={'wrap'}>
      {/* <Loading isLoading={loading} adapted /> */}

      {inventary.map((inv, index) => (
        <ProductCard
          isSelected={isSelected(inv)}
          price={inv.valuecoin.value}
          currency="USD"
          photoUrl={`/api/statics${inv.product.image}`}
          productName={inv.product.name}
          key={index}
          onClick={() => {
            if (!isSelected(inv))
              onAddProductOnCar(inv)
          }}
        />
      ))}

    </Flex>
  );
}
