import { Inter } from "next/font/google";
import SplashScreen from "@/components/SplashScreen";
import InitialLayout from "@/modules/initial/layouts/InitialLayout";

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
    <InitialLayout>
      <SplashScreen />
    </InitialLayout>
  );
}
