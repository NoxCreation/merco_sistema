import React, { useEffect, useState } from "react";
import {
  Image,
  Checkbox,
  IconButton,
  Box,
  Flex,
  Text,
  useToast,
  Badge
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import DocumentIcon from "@/frontend/core/icons/DocumentIcon";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { InventaryHistoryType } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_inventary_history } from "@/helper/requests/InventaryHistory";
import { Loading } from "@/frontend/core/components/Loading";


export default function HistoryTable() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 10
  } as {
    page: number,
    pageSize: number,
    count: number
  })
  const businesses = useGetBussiness()
  const toast = useToast()
  const [loading, setLoading] = useState(true)

  const [history, setHistory] = useState([] as Array<InventaryHistoryType>)
  const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
    const filter = {
      businessId: businesses?.id
    }
    setLoading(true)
    get_inventary_history({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter: new_filter ? new_filter : filter }, (status: number, data: any) => {
      if (status == 200) {
        setHistory(data.data)
        setPagination({
          page: data.page,
          pageSize: data.pageSize,
          count: data.count,
        })
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
  }, [])

  const columns: ColumnDef<InventaryHistoryType>[] = [
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
          <Text fontSize={'12px'}>ID</Text>
        </Checkbox>
      ),
      accessorKey: "historyId",
      id: "historyId",
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
      header: "Creado",
      accessorKey: "createdAt",
    },
    {
      header: "Acción",
      accessorKey: "action",
      cell: ({ getValue }) => {
        return (
          <>
            {getValue<string>() == 'delete' ? (
              <Badge variant={'solid'} colorScheme="red" fontSize={'10px'}>Eliminado</Badge>
            ) : (
              <>
                {getValue<string>() == 'traslate' ? (
                  <Badge variant={'solid'} colorScheme="purple" fontSize={'10px'}>Traslado</Badge>
                ) : (
                  <Badge variant={'solid'} colorScheme="green" fontSize={'10px'}>Creado</Badge>
                )}
              </>

            )}
          </>
        )
      }
    },
    {
      header: "Descripción",
      accessorKey: "description",
    },
    {
      header: "Producto",
      accessorKey: "product.name",
    },
    {
      header: "Tienda",
      accessorKey: "shop.name",
    },
    {
      header: "Usuario",
      accessorKey: "user.username",
    },
  ];

  return (
    <>
      <Loading isLoading={loading} />
      <GenericTable
        columns={columns}
        data={history}
        title="Inventario"
        pagination={{
          count: pagination.count,
          page: pagination.page,
          pageSize: pagination.pageSize,
          onChange: (page: number) => {
            let temp = JSON.parse(JSON.stringify(pagination))
            temp.page = page
            setPagination(temp);
            onLoad(page);
          },
        }}
        onChangeFilterCount={(pageSize: number) => {
          let temp = JSON.parse(JSON.stringify(pagination))
          temp.pageSize = pageSize
          setPagination(temp);
          onLoad(pagination.page, pageSize);
        }}
      />
    </>
  );
}
