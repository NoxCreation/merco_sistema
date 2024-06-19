import GenericTable from "@/frontend/core/components/GenericTable";
import DocumentIcon from "@/frontend/core/icons/DocumentIcon";
import { formatDate } from "@/frontend/core/utils/formatDate";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, IconButton, Box, Badge } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type SellingHistoryItem = {
  id?: string;
  date?: Date;
  product: string;
  quantity: number;
  paymentCurrency?: string;
  paymentMethod?: "Transferencia" | "Efectivo";
  sellerName?: string;
  subRows?: SellingHistoryItem[];
};

const columns: ColumnDef<SellingHistoryItem>[] = [
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
          <Box onClick={() => row.toggleExpanded()}>
            {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </Box>
        )}
      </Flex>
    ),
  },
  {
    header: "Fecha",
    accessorKey: "date",
    cell: (dateCell) => formatDate(dateCell.getValue<Date>()),
  },
  {
    header: "Producto",
    accessorKey: "product",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  },
  {
    header: "Moneda de pago",
    accessorKey: "paymentCurrency",
    cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
  },
  {
    accessorKey: "paymentMethod",
    cell: ({ getValue }) => (
      <Badge
        boxShadow={"none"}
        color={"white"}
        backgroundColor={
          getValue<string>() === "Transferencia" ? "green.400" : "cyan.400"
        }
      >
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    header: "Vendededor",
    accessorKey: "sellerName",
  },
];

const mockData: SellingHistoryItem[] = [
  {
    id: "001",
    date: new Date("2024-06-15"),
    product: "Cafetera Automática",
    quantity: 2,
    paymentCurrency: "USD",
    paymentMethod: "Transferencia",
    sellerName: "Juan Pérez",
    subRows: [
      {
        id: "002",
        date: new Date("2024-06-16"),
        product: "Molino de Café",
        quantity: 1,
        paymentCurrency: "EUR",
        paymentMethod: "Efectivo",
        sellerName: "Ana García",
      },
    ],
  },
  {
    id: "003",
    date: new Date("2024-06-17"),
    product: "Taza de Cerámica",
    quantity: 10,
    paymentCurrency: "USD",
    paymentMethod: "Transferencia",
    sellerName: "Carlos Rodríguez",
  },
  {
    id: "004",
    date: new Date("2024-06-18"),
    product: "Café Molido",
    quantity: 5,
    paymentCurrency: "EUR",
    paymentMethod: "Efectivo",
    sellerName: "María López",
    subRows: [
      {
        id: "005",
        date: new Date("2024-06-19"),
        product: "Leche Entera",
        quantity: 3,
        paymentCurrency: "USD",
        paymentMethod: "Transferencia",
        sellerName: "Pedro Martínez",
      },
    ],
  },
];

export default function SellingHistoryTable() {
  return (
    <GenericTable
      title="Historial"
      data={mockData}
      columns={columns}
      pagination={{
        count: 1,
        pageSize: 10,
        page: 1,
      }}
    />
  );
}
