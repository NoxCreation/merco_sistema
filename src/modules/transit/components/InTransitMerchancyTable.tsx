import React from "react";
import {
  Table,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  TableCaption,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ExportableTableContainer from "@/modules/core/components/ExportableTableContainer";
import { table } from "console";

type InTransitMerchancyItem = {
  id: string;
  category: string;
  product: string;
  deliveryDate: Date;
  paymentDate: Date;
  quantity: number;
  amount: string;
  amortized: string;
  type: string;
};

export default function InTransitMerchancyTable() {
  const mockData = React.useMemo<InTransitMerchancyItem[]>(
    () => [
      {
        id: "item001",
        category: "Electrónicos",
        product: "Smartphone Samsung Galaxy S21 Ultra",
        deliveryDate: new Date("2024-07-15T00:00:00"),
        paymentDate: new Date("2024-06-20T00:00:00"),
        quantity: 10,
        amount: "$1200",
        amortized: "$100",
        type: "New",
      },
      {
        id: "item002",
        category: "Ropa",
        product: "Camisa Polo Ralph Lauren",
        deliveryDate: new Date("2024-08-01T00:00:00"),
        paymentDate: new Date("2024-06-25T00:00:00"),
        quantity: 5,
        amount: "$150",
        amortized: "$12.50",
        type: "Used",
      },
      {
        id: "item003",
        category: "Libros",
        product: "El Principito - Antoine de Saint-Exupéry",
        deliveryDate: new Date("2024-09-05T00:00:00"),
        paymentDate: new Date("2024-06-30T00:00:00"),
        quantity: 20,
        amount: "$40",
        amortized: "$2",
        type: "New",
      },
    ],
    []
  );

  const columns = React.useMemo<ColumnDef<InTransitMerchancyItem>[]>(
    () => [
      {
        header: ({ table }) => (
          <Checkbox
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
          <Checkbox
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
        header: "Categoria",
        accessorKey: "category",
      },
      {
        header: "Producto",
        accessorKey: "product",
      },
      {
        header: "Fecha Entrega",
        accessorKey: "deliveryDate",
        cell: (deliveryDate) => deliveryDate.getValue<Date>().toDateString(),
      },
      {
        header: "Fecha Pago",
        accessorKey: "paymentDate",
        cell: (paymentDate) => paymentDate.getValue<Date>().toDateString(),
      },
      {
        header: "Cantidad",
        accessorKey: "quantity",
      },
      {
        header: "Importe",
        accessorKey: "amount",
        cell: (amount) => (
          <Badge
            variant={"outline"}
            colorScheme="purple"
            borderRadius={"full"}
            paddingX={"12px"}
          >
            {amount.getValue<number>()}
          </Badge>
        ),
      },
      {
        header: "Amortizado",
        accessorKey: "amortized",
        cell: (amortized) => (
          <Badge
            colorScheme={
              amortized.getValue<string>() === "Pagado" ? "green" : "red"
            }
            borderRadius={"full"}
            paddingX={"12px"}
          >
            {amortized.getValue<string>()}
          </Badge>
        ),
      },
      {
        header: "Tipo",
        accessorKey: "type",
      },
    ],
    []
  );

  const { getRowModel, getHeaderGroups, getState } = useReactTable({
    data: mockData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  console.log(getState().rowSelection);

  return (
    <ExportableTableContainer title="Mercancias en transito">
      <TableContainer>
        <Table variant="striped">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </ExportableTableContainer>
  );
}
