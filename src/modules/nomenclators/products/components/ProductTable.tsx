import {
  Image,
  Text,
  Checkbox,
  Badge,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  ColumnDef,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import GenericTable from "@/frontend/core/components/GenericTable";
import CRUDActionsButtonGroup from "./CRUDActionsButtonGroup";
import { Product } from "@/backend/types/UserType";
import { get_products } from "@/helper/requests/Products";
import { Loading } from "@/frontend/core/components/Loading";
import { useSession } from "next-auth/react";

interface Props {
  shopSelect: number
}

export default function CRUDTable({ shopSelect }: Props) {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([] as Array<Product>)
  const [page, setPage] = useState(1 as number)
  const [pageSize, setPageSize] = useState(10 as number)
  const [count, setCount] = useState(3 as number)
  const { data } = useSession()

  const Load = async (npage?: number, npageSize?: number) => {
    setLoading(true)
    const filter = {
      shopId: shopSelect
    }
    await get_products({ page: npage ? npage : page, pageSize: npageSize ? npageSize : pageSize, filter }, (status: number, data: any) => {
      if (status == 200) {
        setProducts(data.data)
        setCount(data.count)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    Load()
  }, [shopSelect])

  const columns: ColumnDef<Product>[] = [
    {
      header: ({ table }) => (
        <Checkbox
          size={'sm'}
          colorScheme="cyan"
          isChecked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={(event) => {
            table.toggleAllRowsSelected(event.target.checked);
          }}
        >
          <Text fontSize={'12px'}>Código</Text>
        </Checkbox>
      ),
      accessorKey: "code",
      cell: ({ row, getValue }) => (
        <Checkbox
          size={'sm'}
          colorScheme="cyan"
          type="checkbox"
          isChecked={row.getIsSelected()}
          onChange={(event) => row.toggleSelected(event.target.checked)}
          fontSize={'0.75rem'}
        >
          {getValue<string>()}
        </Checkbox>
      ),
    },
    {
      header: "Imagen",
      accessorKey: "image",
      cell: (image) => (
        <Image
          src={image.getValue<string>()}
          alt="Product Image"
          width={"60px"}
        ></Image>
      ),
    },
    {
      header: "Categoria",
      accessorKey: "category",
      cell: (item) => (
        <>{item.getValue<any>().name}</>
      ),
    },
    {
      header: "Producto",
      accessorKey: "name",
      cell: (item) => (
        <Box maxW={'150px'} whiteSpace={"wrap"}>{item.getValue<string>()}</Box>
      ),
    },
    {
      header: "Costo",
      accessorKey: "coste_usd",
      cell: (item) => (
        <Flex gap={2}>
          $ {item.getValue<number>()}
          <Badge>USD</Badge>
        </Flex>
      ),
    },
    {
      header: "Precio",
      accessorKey: "price_usd",
      cell: (item) => (
        <Flex gap={2}>
          $ {item.getValue<number>()}
          <Badge>USD</Badge>
        </Flex>
      ),
    },
    {
      header: "T/Pago",
      accessorKey: "gain_rate",
      cell: (item) => (
        <Flex gap={2}>
          {item.getValue<boolean>() ? <Badge variant='solid' colorScheme='yellow'>Fijo</Badge> : <Badge variant='solid' colorScheme='green'>Variable</Badge>}
        </Flex>
      ),
    },
    {
      id: "actions",
      cell: (props) => <CRUDActionsButtonGroup inTable />,
    },
  ];

  return (
    <>
      <Loading isLoading={loading} />
      <GenericTable
        columns={columns}
        data={products}
        title="Productos"
        pagination={{
          count,
          page,
          pageSize,
          onChange: (e: number) => {
            setPage(e)
            Load(e)
          }
        }}
        onChangeFilterCount={(e: number) => {
          setPageSize(e)
          Load(page, e)
        }}
      />
    </>
  )
}