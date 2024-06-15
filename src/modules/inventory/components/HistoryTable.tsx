import React from "react";
import { Image, Checkbox, IconButton } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import GenericTable from "@/modules/core/components/GenericTable";
import { formatDate } from "@/modules/core/utils/formatDate";
import DocumentIcon from "@/modules/core/icons/DocumentIcon";

type HistoryItem = {
    id: string;
    image: string;
    deliveryDate: Date;
    product: string;
    quantity: number;
    shop: string;
    description: string;
  };

const mockData: HistoryItem[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    image: "https://via.placeholder.com/150",
    deliveryDate: new Date("2024-05-18T00:00:00.000Z"),
    product: "Cafetera Automática",
    quantity: 2,
    shop: "TiendaElectronica",
    description:
      "Cafetera automática de alta calidad con capacidad para 1.2 litros.",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    image: "https://via.placeholder.com/150",
    deliveryDate: new Date("2024-05-18T00:00:00.000Z"),
    product: "Mouse Gamer",
    quantity: 1,
    shop: "GamerStore",
    description: "Mouse gamer ergonómico con sensor óptico de alta precisión.",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    image: "https://via.placeholder.com/150",
    deliveryDate: new Date("2024-05-18T00:00:00.000Z"),
    product: "Auriculares Bluetooth",
    quantity: 3,
    shop: "AudioWorld",
    description:
      "Auriculares bluetooth con cancelación de ruido y batería de larga duración.",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    image: "https://via.placeholder.com/150",
    deliveryDate: new Date("2024-05-18T00:00:00.000Z"),
    product: "Teclado Mecánico",
    quantity: 1,
    shop: "TechMarket",
    description:
      "Teclado mecánico retroiluminado con switches azules para una mejor respuesta táctil.",
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174004",
    image: "https://via.placeholder.com/150",
    deliveryDate: new Date("2024-05-18T00:00:00.000Z"),
    product: "Monitor Gaming",
    quantity: 1,
    shop: "DisplayHub",
    description:
      "Monitor gaming de 27 pulgadas con tecnología IPS y refresco de 144Hz.",
  },
];

const columns: ColumnDef<HistoryItem>[] = [
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
        Id
      </Checkbox>
    ),
    accessorKey: "code",
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
    accessorKey: "image",
    cell: (imageUrl) => (
      <Image
        src={imageUrl.getValue<string>()}
        alt="Product Image"
        width={"60px"}
      ></Image>
    ),
  },
  {
    header: "F/Entrega",
    accessorKey: "deliveryDate",
    cell: (dateCell) => formatDate(dateCell.getValue<Date>()),
  },
  {
    header: "Producto",
    accessorKey: "product",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  },
  {
    header: "Tienda",
    accessorKey: "shop",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    id: "actions",
    cell: (props) => <IconButton aria-label="Icon Button" icon={<DocumentIcon color="#fff"/>} colorScheme="cyan" />,
  },
];

export default function HistoryTable() {
  const page = 1;
  const pageSize = 10;

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Inventario"
      pagination={{
        count: 10,
        page,
        pageSize,
      }}
    />
  );
}
