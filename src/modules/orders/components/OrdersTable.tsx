import { Image, Text, Checkbox, Badge, Box, Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";
import OrderActionsButtonGroup from "./OrdersActionsButtonGroup";
import { formatDate } from "@/frontend/core/utils/formatDate";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import OrdersTableActions from "./OrdersTableActions";

const mockData: MerchancyItem[] = [
  {
    id: "001",
    category: "Electrónica",
    product: "Laptop Dell XPS 13",
    deliveryDate: new Date("2024-07-15"),
    paymentDate: new Date("2024-08-01"),
    quantity: 1,
    amount: "USD",
    amortized: "Pagado",
    type: "Compra",
  },
  {
    id: "002",
    category: "Libros",
    product: "El Principito",
    deliveryDate: new Date("2024-06-20"),
    quantity: 3,
    amount: "USD",
    amortized: "Pendiente",
    type: "Venta",
    subRows: [
      {
        id: "002a",
        category: "Libros",
        product: "El Principito - Edición Especial",
        deliveryDate: new Date("2024-06-22"),
        quantity: 1,
        amount: "USD",
        amortized: "Pendiente",
        type: "Venta",
      },
    ],
  },
  {
    id: "003",
    category: "Ropa",
    product: "Camiseta Manga Larga",
    deliveryDate: new Date("2024-07-10"),
    paymentDate: new Date("2024-07-30"),
    quantity: 5,
    amount: "USD",
    amortized: "Pagado",
    type: "Compra",
  },
  {
    id: "004",
    category: "Herramientas",
    product: "Martillo",
    deliveryDate: new Date("2024-05-25"),
    quantity: 2,
    amount: "USD",
    amortized: "Pendiente",
    type: "Compra",
  },
  {
    id: "005",
    category: "Jardín",
    product: "Regadera",
    deliveryDate: new Date("2024-06-01"),
    paymentDate: new Date("2024-06-15"),
    quantity: 1,
    amount: "USD",
    amortized: "Pagado",
    type: "Venta",
    subRows: [
      {
        id: "005a",
        category: "Jardín",
        product: "Manguera",
        deliveryDate: new Date("2024-06-03"),
        quantity: 1,
        amount: "USD",
        amortized: "Pagado",
        type: "Venta",
      },
    ],
  },
];

type MerchancyItem = {
  id: string;
  category: string;
  product: string;
  deliveryDate: Date;
  paymentDate?: Date;
  quantity: number;
  amount: string;
  amortized: "Pagado" | "Pendiente";
  type: string;
  subRows?: MerchancyItem[];
};

interface Props {}

export default function TransitTable({}: Props) {
  const page = 1;
  const pageSize = 10;

  const columns: ColumnDef<MerchancyItem>[] = [
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
      accessorKey: "code",
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
              {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </Box>
          )}
        </Flex>
      ),
    },
    {
      header: "Categoria",
      accessorKey: "category",
    },
    {
      header: "Producto",
      accessorKey: "product",
    },
    {
      header: "Fecha de entrega",
      accessorKey: "deliveryDate",
      cell: (date) => formatDate(date.getValue<Date>()),
    },
    {
      header: "Fecha Pago",
      accessorKey: "paymentDate",
      cell: (date) => formatDate(date.getValue<Date>()),
    },
    {
      header: "Cantidad",
      accessorKey: "quantity",
    },
    {
      header: "Importe",
      accessorKey: "amount",
      cell: (amount) => <Badge>{amount.getValue<string>()}</Badge>,
    },
    {
      header: "Amortizado",
      accessorKey: "amortized",
      cell: (amortized) => (
        <Badge
          boxShadow={"none"}
          backgroundColor={
            amortized.getValue<string>() === "Pagado" ? "green.500" : "red.500"
          }
          color={"white"}
        >
          {amortized.getValue<string>()}
        </Badge>
      ),
    },
    {
      header: "Tipo",
      accessorKey: "type",
    },
    {
      id: "actions",
      cell: (props) => <OrdersTableActions />,
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Mercancías en Tránsito"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
