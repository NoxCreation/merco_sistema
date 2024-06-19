import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";

interface Props {
  onSelectItems?: (items: Array<any>) => void
  onFilter: (page?: number, pageSize?: number) => void
  onFind: (column: string, value: string) => void
  title: string
  columns: ColumnDef<any>[]
  rows: Array<any>
  pagination: {
    page: number,
    pageSize: number,
    count: number
  }
  setPagination: (pagination: {
    page: number,
    pageSize: number,
    count: number
  }) => void
  onDownloadExcel?: () => void
}

export default function CRUDTable({
  onSelectItems,
  onFilter,
  onFind,
  title,
  columns,
  rows,
  pagination,
  setPagination,
  onDownloadExcel
}: Props) {

  return (
    <GenericTable
      columns={columns}
      data={rows}
      title={title}
      pagination={{
        count: pagination.count,
        page: pagination.page,
        pageSize: pagination.pageSize,
        onChange: (page: number) => {
          let temp = JSON.parse(JSON.stringify(pagination))
          temp.page = page
          setPagination(temp);
          onFilter(page);
        },
      }}
      onChangeFilterCount={(pageSize: number) => {
        let temp = JSON.parse(JSON.stringify(pagination))
        temp.pageSize = pageSize
        setPagination(temp);
        onFilter(pagination.page, pageSize);
      }}
      onSelectItems={onSelectItems}
      onFind={onFind}
      onDownloadExcel={onDownloadExcel}
    />
  );
}
