import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import BoxActionButtons from "./components/BoxActionButtons";
import BoxHistoryTable from "./components/BoxHistoryTable";
import InfoCard from "@/frontend/core/components/InfoCard";
import DollarIcon from "@/frontend/core/icons/DollarIcon";

export default function BoxScreen() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: `Caja`,
            icon: undefined,
            link: "/box",
          },
        ]}
      >
        <BoxActionButtons />
      </BarFilter>
      <Flex gap={"10px"} marginBottom={"20px"}>
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
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex gap={"10px"} marginBottom={"20px"}>
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
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex gap={"10px"} marginBottom={"20px"}>
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
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
      </Flex>
      <Flex gap={"10px"} marginBottom={"20px"}>
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
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
        <InfoCard
          title="Inversión"
          color="cyan.500"
          badgeText="USD"
          description="Inversión"
          icon={<DollarIcon color="#fff" />}
          value={"$100.000.000"}
        />
      </Flex>
      <BoxHistoryTable />
    </Box>
  );
}
