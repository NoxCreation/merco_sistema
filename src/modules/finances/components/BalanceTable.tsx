import GenericTable from "@/frontend/core/components/GenericTable";
import { formatDate } from "@/frontend/core/utils/formatDate";
import { Checkbox, Flex, Badge, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const mockData: BalanceItem[] = [
  {
    openDate: new Date("2024-01-01"),
    closingDate: new Date("2024-01-31"),
    payroll: 50000,
    tPayment: 15000,
    tExpenses: 20000,
    fixedSalaries: 30000,
    earnings: 25000,
  },
  {
    openDate: new Date("2024-02-01"),
    closingDate: new Date("2024-02-29"),
    payroll: 55000,
    tPayment: 16000,
    tExpenses: 22000,
    fixedSalaries: 32000,
    earnings: 27000,
  },
  {
    openDate: new Date("2024-03-01"),
    closingDate: new Date("2024-03-31"),
    payroll: 52000,
    tPayment: 17000,
    tExpenses: 21000,
    fixedSalaries: 33000,
    earnings: 26000,
  },
  {
    openDate: new Date("2024-04-01"),
    closingDate: new Date("2024-04-30"),
    payroll: 51000,
    tPayment: 18000,
    tExpenses: 23000,
    fixedSalaries: 34000,
    earnings: 28000,
  },
  {
    openDate: new Date("2024-05-01"),
    closingDate: new Date("2024-05-31"),
    payroll: 53000,
    tPayment: 19000,
    tExpenses: 24000,
    fixedSalaries: 35000,
    earnings: 29000,
  },
];

type BalanceItem = {
  openDate: Date;
  closingDate: Date;
  payroll: number;
  tPayment: number;
  tExpenses: number;
  fixedSalaries: number;
  earnings: number;
};

export default function BalanceTable() {
  const page = 1;
  const pageSize = 10;

  const columns: ColumnDef<BalanceItem>[] = React.useMemo(
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
            Fecha apertura
          </Checkbox>
        ),
        accessorKey: "openDate",
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
        header: "Fecha cierre",
        accessorKey: "closingDate",
        cell: (date) => formatDate(date.getValue<Date>()),
      },
      {
        header: "Nóminas",
        accessorKey: "payroll",
      },
      {
        header: "T/Pago",
        accessorKey: "tPayment",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "T/Gastos",
        accessorKey: "tExpenses",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "Salarios Fijos",
        accessorKey: "fixedSalaries",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "Ganancia",
        accessorKey: "earnings",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>()}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "70% Ganancia",
        accessorKey: "earnings",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>() * 0.7}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
      {
        header: "30% Ganancia",
        accessorKey: "earnings",
        cell: ({ getValue }) => (
          <Flex alignItems={"center"} gap={"10px"}>
            <Text>{getValue<number>() * 0.3}</Text>
            <Badge>USD</Badge>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Balance"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
