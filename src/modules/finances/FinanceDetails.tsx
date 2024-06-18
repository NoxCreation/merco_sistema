import InfoCard from "@/frontend/core/components/InfoCard";
import DollarIcon from "@/frontend/core/icons/DollarIcon";
import GraphicGrowingIcon from "@/frontend/core/icons/GraphicGrowingIcon";
import { Flex, Stack } from "@chakra-ui/react";
import React from "react";

export default function FinanceDetails() {
  return (
    <Stack gap={"10px"}>
      <Flex gap={"10px"}>
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="MLC"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="CUP"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex gap={"10px"}>
        <InfoCard
          title="Ganancia"
          color="green.500"
          badgeText="USD"
          description="Ganancia"
          icon={<GraphicGrowingIcon color="white"/>}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Ganancia"
          color="green.500"
          badgeText="USD"
          description="Ganancia"
          icon={<GraphicGrowingIcon color="white"/>}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Ganancia"
          color="green.500"
          badgeText="USD"
          description="Ganancia"
          icon={<GraphicGrowingIcon color="white"/>}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex>
      <InfoCard
          title="Total Gastos"
          color="red.500"
          badgeText="USD"
          description="Total de Gastos"
          icon={<GraphicGrowingIcon color="white"/>}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex></Flex>
    </Stack>
  );
}
