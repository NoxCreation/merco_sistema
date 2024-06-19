import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import WorkedTable from "../components/WorkedTable";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { useRouter } from "next/router";

export default function FinanceDetailsScreen() {
  const router = useRouter();
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: `Finanzas`,
            icon: undefined,
            link: "/finances",
          },
          {
            label: "Balance",
            icon: undefined,
            link: "/finances",
          },
          {
            label: "Detalles",
            icon: undefined,
            link: "/finances/details",
          },
        ]}
      ></BarFilter>
      <Stack gap={"10px"}>
        <Flex gap={"10px"}></Flex>
        <Flex gap={"10px"}></Flex>
        <Flex gap={"10px"}></Flex>
        <Flex></Flex>
        <Flex gap={"10px"}></Flex>
        <WorkedTable
          onViewDetails={() => {
            router.push("/finances/details/operations");
          }}
        />
      </Stack>
    </Box>
  );
}
