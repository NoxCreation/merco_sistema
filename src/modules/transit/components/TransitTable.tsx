import {
  Image,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import {
  ColumnDef,
} from "@tanstack/react-table";
import React from "react";
import GenericTable from "@/frontend/core/components/GenericTable";

const mockData: InventoryItem[] = [
  {
    code: "INV001",
    image:
      "https://th.bing.com/th/id/R.790c5d80aa7ebcd2f4648aba12afe84f?rik=x%2byWiTnZqv5UbA&riu=http%3a%2f%2fwww.solquimia.com%2ffr%2fwp-content%2fuploads%2fsites%2f5%2f2016%2f01%2faceite-refrigerante-repsol-32.jpg&ehk=Qa%2bV%2feD3pjB887Pbkn7ugz%2bTZJcL5HmPfD5u7eoMIYc%3d&risl=&pid=ImgRaw&r=0",
    category: "Electronics",
    product: "Aceite Refrigerante Universal",
    inStock: 75,
    cost: 750,
    price: 999,
  },
  {
    code: "INV002",
    image:
      "https://th.bing.com/th/id/R.ab6dc5c65021cffdb521043fd9cddc54?rik=KUdqSwdrWzl7Xg&pid=ImgRaw&r=0",
    category: "Refrigeración",
    product: "Aflojalo Todo  WD40 591 ml",
    inStock: 50,
    cost: 45,
    price: 59,
  },
  {
    code: "INV003",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_831842-MLC42192808966_062020-F.jpg",
    category: "Aceite /Bomba de Vacio 4Lt",
    product: "Refrigeración",
    inStock: 30,
    cost: 120,
    price: 150,
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

interface Props {
  
}

export default function TransitTable({  }: Props) {
  const page = 1
  const pageSize = 10

  const columns: ColumnDef<InventoryItem>[] = [
    {
      header: ({ table }) => (
        <Checkbox
          size={'sm'}
          colorScheme="cyan"
          isChecked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={(event) => {
            table.toggleAllRowsSelected(event.target.checked);
          }}
        >
          Código
        </Checkbox>
      ),
      accessorKey: "code",
      cell: ({ row, getValue }) => (
        <Checkbox
          size={'sm'}
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
      id: "actions",
      cell: (props) => (<>options</>),
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={mockData}
      title="Tránsito"
      pagination={{
        count: 10,
        page,
        pageSize
      }}
    />
  )
}