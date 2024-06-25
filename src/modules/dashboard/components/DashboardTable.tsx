import GenericTable from "@/frontend/core/components/GenericTable";
import { Checkbox, Flex, Badge, Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

type DashboardTableItem = {
  name: string;
  sold: number;
  profit: number;
};

const mockData: DashboardTableItem[] = [
  {
    name: "Producto A",
    sold: 150,
    profit: 2500,
  },
  {
    name: "Producto B",
    sold: 200,
    profit: 3000,
  },
  {
    name: "Producto C",
    sold: 100,
    profit: 1800,
  },
];

type Props = {
  title: string;
};

const columns: ColumnDef<DashboardTableItem>[] = [
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
      <Checkbox
        size={"sm"}
        colorScheme="cyan"
        type="checkbox"
        isChecked={row.getIsSelected()}
        onChange={(event) => row.toggleSelected(event.target.checked)}
      >
        {getValue<string>()}
      </Checkbox>
    ),
  },
  {
    header: "Vendidos",
    accessorKey: "sold",
  },
  {
    header: "Ganancia",
    accessorKey: "profit",
  },
];

export default function DashboardTable({ title }: Props) {
  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title={title}
      pagination={{
        count: 10,
        page: 1,
        pageSize: 10,
      }}
    />
  );
}
