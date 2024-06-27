import { Image, Text, Checkbox, Badge } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useRef } from "react";
import GenericTable from "@/frontend/core/components/GenericTable";
import { InventaryType } from "@/backend/types";
import InventoryTableActions from "./InventoryTableActions";


type Props = {
  inventary: Array<InventaryType>
  pagination: {
    page: number,
    pageSize: number,
    count: number
  }
  showTransferButton: boolean
  setPagination: (pagination: {
    page: number,
    pageSize: number,
    count: number
  }) => void
  onTransferProducts: (inventary: InventaryType) => void;
  onEdit: (inventaries: InventaryType) => void;
  onDelete: (inventary: InventaryType) => void;
  onFilter: (page: number) => void
  onSelectItems?: (inventaries: Array<InventaryType>) => void
};

export default function InventoryTable({
  onTransferProducts,
  onEdit,
  onDelete,
  setPagination,
  onFilter,
  onSelectItems,
  showTransferButton,
  pagination,
  inventary
}: Props) {

  const ref = useRef(showTransferButton);
  useEffect(()=>{
    ref.current = showTransferButton;
  }, [showTransferButton])

  const columns: ColumnDef<InventaryType>[] = React.useMemo(
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
            <Text fontSize={'12px'}>Código</Text>
          </Checkbox>
        ),
        accessorKey: "product.code",
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
        header: "Imagen",
        accessorKey: "product.image",
        /* id: "name", */
        cell: (image) => (
          <Image
            src={`/api/statics${image.getValue<string>()}`}
            alt="Product Image"
            width={"60px"}
          ></Image>
        ),
      },
      {
        header: "Categoria",
        accessorKey: "product.category.name",
      },
      {
        header: "Producto",
        accessorKey: "product.name",
      },
      {
        header: "En Stock",
        accessorKey: "stock",
        cell: ({ row }) => {
          const inventary = row.original
          const name_unit = inventary.product.unit.symbol // U, L ...
          const count_unit = inventary.product.count_unit
          const stock = inventary.stock

          const view_capacity = (
            <>
              {stock} {name_unit}
            </>
          )

          const view_unit = (
            <>
              {(stock % count_unit) == 0 ? `${(stock / count_unit)} U` : (
                <>
                  {Math.floor(stock / count_unit)} U / {(stock / count_unit) - Math.floor(stock / count_unit)} {name_unit}
                </>
              )}
            </>
          )

          return (
            <Text>
              {view_capacity} <br />
              {name_unit != "U" && view_unit}
            </Text>
          );
        },
      },
      {
        header: "Costo",
        accessorKey: "product.coste_usd",
        cell: ({ getValue }) => {
          return (
            <>
              {getValue<string>()} <Badge>USD</Badge>
            </>
          )
        }
      },
      {
        header: "Precio",
        accessorKey: "valuecoin.value",
        cell: ({ getValue }) => {
          return (
            <>
              {getValue<string>()} <Badge>USD</Badge>
            </>
          )
        }
      },
      /* {
        header: "200/USD",
        accessorKey: "price",
      },
      {
        header: "500/USD",
        accessorKey: "price",
      },
      {
        header: "1000/USD",
        accessorKey: "price",
      }, */
      {
        id: "actions",
        cell: ({ cell }) => (
          <InventoryTableActions
            onDelete={() => onDelete(cell.row.original as InventaryType)}
            onEdit={()=>{
              onEdit(cell.row.original as InventaryType)
            }}
            showTransferButton={ref.current}
            onTransferProducts={()=>{
              onTransferProducts(cell.row.original as InventaryType)
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <GenericTable
      columns={columns}
      data={inventary as Array<any>}
      title="Inventario"
      onChangeFilterCount={(page: number) => {
        let temp = JSON.parse(JSON.stringify(pagination))
        temp.count = page
        setPagination(temp)
      }}
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
      onSelectItems={onSelectItems}
    />
  );
}
