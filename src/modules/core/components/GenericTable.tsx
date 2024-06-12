import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Flex,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import OrderByIcon from "../icons/OrderByIcon";
import ExportableTableContainer from "./ExportableTableContainer";
import Pagination from "./Pagination";

interface Props<T> {
  title: string;
  columns: ColumnDef<T>[];
  data: T[];
}

// IMPORTANTE: La columna de acciones debe tener como id: "actions"
// para que no tenga header

export default function GenericTable<T>({ data, title, columns }: Props<T>) {
  const { getRowModel, getHeaderGroups } = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  return (
    <ExportableTableContainer title={title}>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            {getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    cursor={"pointer"}
                  >
                    {header.id !== "actions" && (
                      <Flex width={"full"} justifyContent={"space-between"}>
                        <Text lineHeight={2}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Text>
                        <Flex alignItems={"center"} gap={"2px"}>
                          <Box onClick={() => header.column.toggleSorting()}>
                            <OrderByIcon />
                          </Box>
                          <Box>
                            <SearchIcon />
                          </Box>
                        </Flex>
                      </Flex>
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                borderColor={"red.400 !important"}
                borderY={row.getIsSelected() ? "2px solid" : "none"}
              >
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
      <Pagination pages={3} selectedPage={1} />
    </ExportableTableContainer>
  );
}
