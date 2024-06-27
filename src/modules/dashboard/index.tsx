import React from "react";
import { Badge, Flex } from "@chakra-ui/react";
import { MiniCard } from "./components/MiniCard";
import GraphicGrowingIcon from "@/frontend/core/icons/GraphicGrowingIcon";
import DashboardTable from "./components/DashboardTable";
import { BarChart } from "@/frontend/core/components/BarChart";

export default function OrdersScreen() {
  return (
    <Flex
      paddingY={"20px"}
      marginY={"25px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"25px"}
      flexDir={"column"}
    >
      <Flex w={"100%"} gap={"25px"}>
        <MiniCard
          title={"Ganancia"}
          subtitle={"Ganancias Obtenidas"}
          value={"$ 1.000.000"}
          iconColor="green.500"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
        <MiniCard
          title={"Gasto Total"}
          subtitle={"Gastos Total"}
          value={"$ 1.000.000"}
          iconColor="red.500"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
      </Flex>
      <Flex w={"100%"} gap={"25px"}>
        <MiniCard
          title={"IMPORTE"}
          subtitle={"Dinero Recibido"}
          value={"$ 1.000.000"}
          iconColor="#FF569A"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
        <MiniCard
          title={"Inversión"}
          subtitle={"Suma de Costos"}
          value={"$ 1.000.000"}
          iconColor="#5C60F4"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
        <MiniCard
          title={"Promotor"}
          subtitle={"Ganancia de Promotores"}
          value={"$ 1.000.000"}
          iconColor="#0ED5FE"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
        <MiniCard
          title={"Vendedor"}
          subtitle={"Ganancia de Vendedores"}
          value={"$ 1.000.000"}
          iconColor="#FF8C01"
          icon={<GraphicGrowingIcon color={"white"} />}
          badge={<Badge fontSize={"10px"}>CUP</Badge>}
        />
      </Flex>
      <Flex w={"100%"} gap={"25px"}>
        <MiniCard
          title={"Cantidad de productos"}
          subtitle={"Productos registrados"}
          value={"8421"}
          iconColor="#B556FF"
          icon={<GraphicGrowingIcon color={"white"} />}
        />
        <MiniCard
          title={"Total registrados"}
          subtitle={"Total de articulos en stock"}
          value={"45121"}
          iconColor="#B556FF"
          icon={<GraphicGrowingIcon color={"white"} />}
        />
        <MiniCard
          title={"Total de promotores"}
          subtitle={"Total de promotores"}
          value={"25"}
          iconColor="#55A0E5"
          icon={<GraphicGrowingIcon color={"white"} />}
        />
        <MiniCard
          title={"Total de vendedores"}
          subtitle={"Total de vendedores"}
          value={"63"}
          iconColor="#55A0E5"
          icon={<GraphicGrowingIcon color={"white"} />}
        />
      </Flex>
      <Flex w={"100%"} gap={"25px"}>
        <Flex width={"full"}>
          <DashboardTable title="Ganancia Promotores" />
        </Flex>

        <Flex width={"full"}>
          <DashboardTable title="Ganancia Vendedores" />
        </Flex>
      </Flex>
      <Flex w={"100%"} gap={"25px"}>
        <Flex width={"full"}>
          <BarChart />
        </Flex>

        <Flex width={"full"}>
          <BarChart />
        </Flex>
      </Flex>
    </Flex>
  );
}
