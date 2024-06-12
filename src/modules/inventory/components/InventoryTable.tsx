import ExportableTableContainer from "@/modules/core/components/ExportableTableContainer";
import Pagination from "@/modules/core/components/Pagination";
import OrderByIcon from "@/modules/core/icons/OrderByIcon";
import { SearchIcon } from "@chakra-ui/icons";
import {
  TableContainer,
  Image,
  Flex,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import React from "react";
import InventoryActionsButtonGroup from "./InventoryActionsButtonGroup";
import GenericTable from "@/modules/core/components/GenericTable";

const mockData: InventoryItem[] = [
  {
    code: "INV001",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Electronics",
    product: "Smartphone Galaxy S21",
    inStock: 75,
    cost: 750,
    price: 999,
  },
  {
    code: "INV002",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Clothing",
    product: "Men's Casual Shirt",
    inStock: 50,
    cost: 45,
    price: 59,
  },
  {
    code: "INV003",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Home Appliances",
    product: "Air Purifier",
    inStock: 30,
    cost: 120,
    price: 150,
  },
  {
    code: "INV004",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Sports Equipment",
    product: "Mountain Bike",
    inStock: 85,
    cost: 800,
    price: 1050,
  },
  {
    code: "INV005",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Books",
    product: "The Great Gatsby",
    inStock: 60,
    cost: 15,
    price: 19,
  },
  {
    code: "INV006",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Toys",
    product: "Remote Control Car",
    inStock: 40,
    cost: 35,
    price: 45,
  },
  {
    code: "INV007",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Furniture",
    product: "Dining Table",
    inStock: 55,
    cost: 250,
    price: 325,
  },
  {
    code: "INV008",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Beauty & Personal Care",
    product: "Facial Cleansing Brush",
    inStock: 70,
    cost: 80,
    price: 100,
  },
  {
    code: "INV009",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Gardening",
    product: "Hydroponic System",
    inStock: 90,
    cost: 300,
    price: 375,
  },
  {
    code: "INV010",
    image:
      "https://th.bing.com/th/id/OIP.BV7KIZhu_qii7UuqFE4CyAHaHa?rs=1&pid=ImgDetMain",
    category: "Tools",
    product: "Power Drill",
    inStock: 65,
    cost: 200,
    price: 250,
  },
];

const columns: ColumnDef<InventoryItem>[] =   [
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
        Codigo
      </Checkbox>
    ),
    accessorKey: "code",
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
    header: "Categoria",
    accessorKey: "category",
  },
  {
    header: "Producto",
    accessorKey: "product",
  },
  {
    header: "En Stock",
    accessorKey: "inStock",
    cell: (inStock) => {
      const inStockQuantity = inStock.getValue<number>();
      const isEmptyStock = inStockQuantity === 0;
      return (
        <Text color={isEmptyStock ? "red" : ""}>
          {isEmptyStock ? "Agotado" : inStockQuantity}
        </Text>
      );
    },
  },
  {
    header: "Costo",
    accessorKey: "cost",
  },
  {
    header: "Precio",
    accessorKey: "price",
  },
  {
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
  },
  {
    id: "actions",
    cell: (props) => <InventoryActionsButtonGroup />,
  },
];

type InventoryItem = {
  code: string;
  image: string;
  category: string;
  product: string;
  inStock: number;
  cost: number;
  price: number;
};

export default function InventoryTable() {
  return <GenericTable columns={columns} data={mockData} title="Inventario"></GenericTable>
}