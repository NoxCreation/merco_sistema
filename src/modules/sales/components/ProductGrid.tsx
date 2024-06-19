import ProductCard from "@/frontend/core/components/ProductCard";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

export default function ProductGrid() {
  return (
    <SimpleGrid columns={6} gap={"8px"} flex={4}>
      {Array.from({ length: 36 }).map((product, index) => (
        <ProductCard
          price={12.5}
          currency="USD"
          photoUrl="https://th.bing.com/th/id/OIP.9NpwQKAQdicXnRCFjr7KfQHaDe?w=1170&h=550&rs=1&pid=ImgDetMain"
          productName="Aceite Refrigerante"
          key={index}
        />
      ))}
    </SimpleGrid>
  );
}
