import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import MainLayout from "@/components/layouts/MainLayout";
import InfoCard from "@/components/InfoCard";
import GraphicGrowingIcon from "@/components/icons/GraphicGrowingIcon";
import ProductCard from "@/components/ProductCard";
import SplashScreen from "@/components/SplashScreen";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    // <MainLayout>
    //   <Box padding="40px">
    //     <InfoCard
    //       title="Ganancia"
    //       value="$1.000.000"
    //       color="green.500"
    //       badgeText="CUP"
    //       description="Ganancias obtenidas"
    //       icon={<GraphicGrowingIcon />}
    //     />
    //   </Box>
    //   <SimpleGrid columns={6}>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>

    //     <ProductCard
    //     isSelected
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>

    //     <ProductCard
    //       currency="CUP"
    //       price={16}
    //       productName="Combustible"
    //       photoUrl=""
    //     ></ProductCard>
    //   </SimpleGrid>
    // </MainLayout>
    <SplashScreen />
  );
}
