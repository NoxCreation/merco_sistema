import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, Badge, Box, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type OperationItem = {
  id: string;
  category: string;
  product: string;
  date: Date;
  quantity: number;
  paymentType?: "Pago variable" | "Pago fijo";
  price?: number;
  offer?: number;
  vUnit?: number;
  amount?: string;
  subRows?: OperationItem[];
};

const mockData: OperationItem[] = [
  {
    id: "item1",
    category: "Electrónica",
    product: "Smartphone Samsung Galaxy S21",
    date: new Date("2024-06-20T00:00:00"),
    quantity: 10,
    paymentType: "Pago fijo",
    price: 1200,
    offer: 1100,
    vUnit: 100,
    amount: "$12,000",
    subRows: [
      {
        id: "item1-sub1",
        category: "Accesorios",
        product: "Cargador USB-C",
        date: new Date("2024-06-20T00:00:00"),
        quantity: 5,
        paymentType: "Pago variable",
        price: 200,
        offer: 180,
        vUnit: 40,
        amount: "$1,000",
        subRows: []
      },
      {
        id: "item1-sub2",
        category: "Accesorios",
        product: "Caja de almacenamiento externa",
        date: new Date("2024-06-20T00:00:00"),
        quantity: 2,
        paymentType: "Pago fijo",
        price: 300,
        offer: 270,
        vUnit: 60,
        amount: "$600",
        subRows: []
      }
    ]
  },
  {
    id: "item2",
    category: "Ropa",
    product: "Camisa de vestir",
    date: new Date("2024-06-22T00:00:00"),
    quantity: 15,
    paymentType: "Pago variable",
    price: 150,
    offer: 135,
    vUnit: 75,
    amount: "$2,250",
    subRows: []
  }
];

export default function OperationsTable() {
  const columns: ColumnDef<OperationItem>[] = React.useMemo(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
            size={"sm"}
            colorScheme="cyan"
            isChecked={table.getIsAllRowsSelected()}
            isIndeterminate={table.getIsSomeRowsSelected()}
            onChange={(event) => {
              table.toggleAllRowsSelected(event.target.checked);
            }}
          >
            Id
          </Checkbox>
        ),
        accessorKey: "id",
        cell: ({ row, getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Checkbox
              size={"sm"}
              colorScheme="cyan"
              type="checkbox"
              isChecked={row.getIsSelected()}
              onChange={(event) => row.toggleSelected(event.target.checked)}
            >
              {getValue<string>()}
            </Checkbox>
            {row.getCanExpand() && (
              <Box onClick={() => row.toggleExpanded()} cursor={"pointer"}>
                {row.getIsExpanded() ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </Box>
            )}
          </Flex>
        ),
      },
      {
        header: "Categoría",
        accessorKey: "category",
      },
      {
        header: "Producto",
        accessorKey: "product",
      },
      {
        header: "Fecha",
        accessorKey: "date",
        cell: (date) => formatDate(date.getValue<Date>()),
      },
      {
        header: "Cantidad",
        accessorKey: "quantity",
      },
      {
        header: "T/Pago",
        accessorKey: "paymentType",
        cell: (type) => (
          <Badge
            boxShadow={"none"}
            backgroundColor={
              type.getValue<string>() === "Pago variable"
                ? "gray.500"
                : "teal.500"
            }
            color={"white"}
          >
            {type.getValue<string>()}
          </Badge>
        ),
      },
      {
        header: "Precio",
        accessorKey: "price",
        cell: (amount) => (
          <Flex gap={"10px"} alignItems={"center"}>
            <Text>{amount.getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "Oferta",
        accessorKey: "offer",
        cell: (amount) => (
          <Flex gap={"10px"} alignItems={"center"}>
            <Text>{amount.getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "V/Unidad",
        accessorKey: "vUnit",
        cell: (amount) => (
          <Flex gap={"10px"} alignItems={"center"}>
            <Text>{amount.getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "Importe",
        accessorKey: "amount",
        cell: (amount) => (
          <Flex gap={"10px"} alignItems={"center"}>
            <Text>{amount.getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <GenericTable
      onFind={() => {}}
      columns={columns}
      data={mockData}
      title="Mercancías en Tránsito"
      pagination={{
        count: 10,
        page: 1,
        pageSize: 10,
      }}
    />
  );
}
