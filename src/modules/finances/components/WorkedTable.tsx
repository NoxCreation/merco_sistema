import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import DocumentIcon from "@/frontend/core/icons/DocumentIcon";
import { Checkbox, Flex, Badge, Text, IconButton } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

const mockData: WorkedItem[] = [
  {
    name: "Juan Pérez",
    type: "Promotor",
    initDate: new Date("2024-01-01"),
    finalDate: new Date("2024-01-31"),
    fixed: "Fijo",
    earning: 5000,
  },
  {
    name: "María García",
    type: "Vendedor",
    initDate: new Date("2024-02-01"),
    finalDate: new Date("2024-02-29"),
    fixed: "Venta",
    earning: 6000,
  },
  {
    name: "Carlos Rodríguez",
    type: "Promotor",
    initDate: new Date("2024-03-01"),
    finalDate: new Date("2024-03-31"),
    fixed: "Fijo",
    earning: 5500,
  },
  {
    name: "Ana López",
    type: "Vendedor",
    initDate: new Date("2024-04-01"),
    finalDate: new Date("2024-04-30"),
    fixed: "Venta",
    earning: 6500,
  },
  {
    name: "Pedro Martínez",
    type: "Promotor",
    initDate: new Date("2024-05-01"),
    finalDate: new Date("2024-05-31"),
    fixed: "Fijo",
    earning: 5200,
  },
];

type WorkedItem = {
  name: string;
  type: "Promotor" | "Vendedor";
  initDate: Date;
  finalDate: Date;
  fixed: "Fijo" | "Venta";
  earning: number;
};

const columns: ColumnDef<WorkedItem>[] = [
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
        Nombre
      </Checkbox>
    ),
    accessorKey: "name",
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
      </Flex>
    ),
  },
  {
    header: "Tipo",
    accessorKey: "type",
    cell: ({ getValue }) => (
      <Badge
        boxShadow={"none"}
        color={"white"}
        backgroundColor={
          getValue<string>() === "Promotor" ? "gray.500" : "teal.500"
        }
      >
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    header: "Fecha de inicio",
    accessorKey: "initDate",
    cell: ({ getValue }) => formatDate(getValue<Date>()),
  },
  {
    header: "Fecha final",
    accessorKey: "initDate",
    cell: ({ getValue }) => formatDate(getValue<Date>()),
  },
  {
    header: "Fijo",
    accessorKey: "fixed",
    cell: ({ getValue }) => (
      <Badge
        boxShadow={"none"}
        color={"white"}
        backgroundColor={
          getValue<string>() === "Fijo" ? "green.400" : "cyan.400"
        }
      >
        {getValue<string>()}
      </Badge>
    ),
  },
  {
    header: "Ganancia",
    accessorKey: "earning",
    cell: ({ getValue }) => (
      <Flex alignItems={"center"} gap={"10px"}>
        <Text>{getValue<number>()}</Text>
        <Badge>USD</Badge>
      </Flex>
    ),
  },
  {
    id: "actions",
    cell: ({ getValue }) => (
      <IconButton
        aria-label="Icon Button"
        icon={<DocumentIcon color="#fff" />}
        colorScheme="cyan"
      />
    ),
  },
];

export default function WorkedTable() {
  const page = 1;
  const pageSize = 10;

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Finanzas"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
