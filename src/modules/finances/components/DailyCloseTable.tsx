import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import DocumentIcon from "@/frontend/core/icons/DocumentIcon";
import { Checkbox, Flex, Badge, Text, IconButton } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

const mockData: DailyCloseItem[] = [
  {
    date: new Date("2024-01-01"),
    dependent: "Dependencia A",
    financial: "Financiero A",
    usdAmount: "$1000",
    cupAmount: 100000,
    mlcAmount: 2000,
    incidents: 2,
  },
  {
    date: new Date("2024-01-02"),
    dependent: "Dependencia B",
    financial: "Financiero B",
    usdAmount: "$1500",
    cupAmount: 150000,
    mlcAmount: 3000,
    incidents: 1,
  },
  {
    date: new Date("2024-01-03"),
    dependent: "Dependencia C",
    financial: "Financiero C",
    usdAmount: "$800",
    cupAmount: 80000,
    mlcAmount: 1600,
    incidents: 3,
  },
  {
    date: new Date("2024-01-04"),
    dependent: "Dependencia D",
    financial: "Financiero D",
    usdAmount: "$1200",
    cupAmount: 120000,
    mlcAmount: 2400,
    incidents: 0,
  },
  {
    date: new Date("2024-01-05"),
    dependent: "Dependencia E",
    financial: "Financiero E",
    usdAmount: "$900",
    cupAmount: 90000,
    mlcAmount: 1800,
    incidents: 2,
  },
];

type DailyCloseItem = {
  date: Date;
  dependent: string;
  financial: string;
  usdAmount: string;
  cupAmount: number;
  mlcAmount: number;
  incidents: number;
};

const columns: ColumnDef<DailyCloseItem>[] = [
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
        Fecha
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
          {formatDate(getValue<Date>())}
        </Checkbox>
      </Flex>
    ),
  },
  {
    header: "Dependiente",
    accessorKey: "dependent",
  },
  {
    header: "Financiero",
    accessorKey: "financial",
  },
  {
    header: "Monto en USD",
    accessorKey: "usdAmount",
    cell: ({ getValue }) => (
      <Flex alignItems={"center"} gap={"10px"}>
        <Text>{getValue<number>()}</Text>
        <Badge>USD</Badge>
      </Flex>
    ),
  },
  {
    header: "Monto en CUP",
    accessorKey: "cupAmount",
    cell: ({ getValue }) => (
      <Flex alignItems={"center"} gap={"10px"}>
        <Text>{getValue<number>()}</Text>
        <Badge>CUP</Badge>
      </Flex>
    ),
  },
  {
    header: "Montoen MLC",
    accessorKey: "mlcAmount",
    cell: ({ getValue }) => (
      <Flex alignItems={"center"} gap={"10px"}>
        <Text>{getValue<number>()}</Text>
        <Badge>MLC</Badge>
      </Flex>
    ),
  },
  {
    header: "Incidencia",
    accessorKey: "incidents",
  },
];

export default function WorkedTable() {
  const page = 1;
  const pageSize = 10;

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Cierres Diarios"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
