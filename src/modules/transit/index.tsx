import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TransitTable from "./components/TransitTable";
import { BarFilter } from "../../frontend/core/components/BarFilter";
import TransitActionsButtonGroup from "./components/TransitActionsButtonGroup";
import TabGroup from "@/frontend/core/components/TabGroup";

export default function TransitScreen() {
  const tabs = ["Domicilio", "Deudas"];

  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: "Tránsito",
            icon: undefined,
            link: "/transito",
          },
        ]}
      >
        <TabGroup tabs={tabs} />
        <TransitActionsButtonGroup />
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      <TransitTable />
      {/* Fin */}
    </Box>
  );
}
