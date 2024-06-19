import { BarFilter } from "@/frontend/core/components/BarFilter";
import { Box, Stack, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import WorkedTable from "../components/WorkedTable";
import OperationsTable from "../components/OperationsTable";

export default function OperationsScreen() {
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
          {
            label: "Operations",
            icon: undefined,
            link: "/finances/details/operations",
          },
        ]}
      ></BarFilter>
      <Stack gap={"10px"}>
        <OperationsTable />
      </Stack>
    </Box>
  );
}
