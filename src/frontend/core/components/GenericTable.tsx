import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { ArrowDownIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import OrderByIcon from "../icons/OrderByIcon";
import ExportableTableContainer from "./ExportableTableContainer";
import SearchIconButton from "./SearchIconButton";
import { Pagination } from "./Pagination";
import { table } from "console";

interface Props<T> {
  title: string;
  columns: ColumnDef<T>[];
  data: T[];
  pagination: {
    count: number;
    page: number;
    pageSize: number;
    onChange?: (e: number) => void
  };
  onChangeFilterCount?: (e: number) => void
}

// IMPORTANTE: La columna de acciones debe tener como id: "actions"
// para que no tenga header

interface RowWithSubItems {
  subRows?: [];
}

export default function GenericTable<T>({
  data,
  title,
  columns,
  pagination,
  onChangeFilterCount
}: Props<T>) {
  const { getRowModel, getHeaderGroups } = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => (row as RowWithSubItems).subRows,
    enableExpanding: true,
    enableRowSelection: true,
  });

  return (
    <ExportableTableContainer title={title} onChangeFilterCount={onChangeFilterCount}>
      <TableContainer>
        <Table fontSize={"13px"}>
          <Thead position="sticky" top={0} bg={"white"}>
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
                            <SearchIconButton ButtonIcon={<SearchIcon />} />
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
              <React.Fragment key={row.id}>
                <Tr
                  key={row.id}
                  borderColor={"red.400 !important"}
                  borderY={"none"} /* row.getIsSelected() ? "2px solid" :  */
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                </Tr>
                {row.subRows.map(
                  (subRow) =>
                    row.getIsExpanded() && (
                      <Tr
                        key={subRow.id}
                        borderColor={"red.400!important"}
                        borderY={"none"}
                      >
                        {subRow.getVisibleCells().map((cell) => (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        ))}
                      </Tr>
                    )
                )}
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        count={pagination.count}
        pageSize={pagination.pageSize}
        /* siblingCount={2} */
        page={pagination.page}
        onChange={(e) => {
          if (pagination.onChange) {
            pagination.onChange(e.page)
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }
        }}
      />
    </ExportableTableContainer>
  );
}
