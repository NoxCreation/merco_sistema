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
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import OrderByIcon from "../icons/OrderByIcon";
import ExportableTableContainer from "./ExportableTableContainer";
import SearchIconButton from "./SearchIconButton";
import { Pagination } from "./Pagination";

interface Props<T> {
  title: string;
  noExportable?: boolean;
  columns: ColumnDef<T>[];
  data: T[];
  pagination: {
    count: number;
    page: number;
    pageSize: number;
    onChange?: (e: number) => void;
  };
  onChangeFilterCount?: (e: number) => void;
  onSelectItems?: (items: Array<any>) => void;
  onFind?: (column: string, value: string) => void;
  onDownloadExcel?: () => void;
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
  onChangeFilterCount,
  onSelectItems,
  onFind,
  onDownloadExcel,
  noExportable = false,
}: Props<T>) {
  const { getRowModel, getHeaderGroups, getSelectedRowModel } = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => (row as RowWithSubItems).subRows,
    enableExpanding: true,
    enableRowSelection: true,
  });

  useEffect(() => {
    if (onSelectItems)
      onSelectItems(getSelectedRowModel().rows.map((t) => t.original));
  }, [getSelectedRowModel()]);

  const tableContent = (
    <TableContainer>
      <Table fontSize={"13px"} minH={"100px"}>
        <Thead position="sticky" top={0} bg={"white"}>
          {getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => (
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
                      {columns[i].id && (
                        <Flex alignItems={"center"} gap={"2px"}>
                          <Box onClick={() => header.column.toggleSorting()}>
                            <OrderByIcon />
                          </Box>
                          <Box>
                            <SearchIconButton
                              ButtonIcon={<SearchIcon />}
                              onFind={onFind}
                              column_name={columns[i].id as string}
                            />
                          </Box>
                        </Flex>
                      )}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );

  const paginationElement = (
    <React.Fragment>
      {data.length > 0 && (
        <Pagination
          count={pagination.count}
          pageSize={pagination.pageSize}
          /* siblingCount={2} */
          page={pagination.page}
          onChange={(e) => {
            if (pagination.onChange) {
              pagination.onChange(e.page);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }
          }}
        />
      )}
    </React.Fragment>
  );

  if (!noExportable)
    return (
      <ExportableTableContainer
        title={title}
        onChangeFilterCount={onChangeFilterCount}
        onDownloadExcel={onDownloadExcel}
      >
        {tableContent}
        {paginationElement}
      </ExportableTableContainer>
    );

  if (noExportable)
    return (
      <Stack spacing={5}>
        {tableContent}
        {paginationElement}
      </Stack>
    );
}
