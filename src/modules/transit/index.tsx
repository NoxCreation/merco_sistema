import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TransitTable from "./components/TransitTable";
import { BarFilter } from "../../frontend/core/components/BarFilter";

export default function TransitScreen() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: 'Tránsito',
            icon: undefined,
            link: '/transito'
          }
        ]}
      >
        Options
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      <TransitTable />
      {/* Fin */}

    </Box>
  );
}
