import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import { Badge, Checkbox, Flex, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type BoxHistoryItem = {
  action: "Ingreso" | "Retiro";
  date: Date;
  amount: number;
  via: string;
};

const mockData: BoxHistoryItem[] = [
  {
    action: "Ingreso",
    date: new Date("2024-06-01"),
    amount: 500,
    via: "Depósito Bancario",
  },
  {
    action: "Retiro",
    date: new Date("2024-06-05"),
    amount: 200,
    via: "Tarjeta Débito",
  },
  {
    action: "Ingreso",
    date: new Date("2024-06-10"),
    amount: 1000,
    via: "Transferencia Electrónica",
  },
  {
    action: "Retiro",
    date: new Date("2024-06-15"),
    amount: 300,
    via: "Cheque",
  },
  {
    action: "Ingreso",
    date: new Date("2024-06-20"),
    amount: 1500,
    via: "Depósito en Efectivo",
  },
];

const columns: ColumnDef<BoxHistoryItem>[] = [
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
        Acción
      </Checkbox>
    ),
    accessorKey: "action",
    cell: ({ row, getValue }) => (
      <Checkbox
        size={"sm"}
        colorScheme="cyan"
        type="checkbox"
        isChecked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
      >
        <Flex gap={"10px"}>
            
        </Flex>
        <Badge
          boxShadow={"none"}
          color={"white"}
          background={
            getValue<string>() === "Ingreso" ? "green.500" : "red.500"
          }
        >
          {getValue<string>()}
        </Badge>
      </Checkbox>
    ),
  },
  {
    header: "Fecha",
    accessorKey: "date",
    cell: ({ getValue }) => formatDate(getValue<Date>()),
  },
  {
    header: "Monto",
    accessorKey: "amount",
    cell: ({ getValue }) => (
      <Flex gap={"10px"}>
        <Text>{getValue<number>()}</Text>
        <Badge>USD</Badge>
      </Flex>
    ),
  },
  {
    header: "Via",
    accessorKey: "via",
  },
];

export default function BoxHistoryTable() {
  return (
    <GenericTable
      title="Historial"
      data={mockData}
      columns={columns}
      pagination={{
        count: 1,
        page: 1,
        pageSize: 10,
      }}
    />
  );
}
