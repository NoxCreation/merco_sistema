import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { BarFilterTransit } from "./components/BarFilterTransit";
import TransitTable from "./components/TransitTable";

export default function TransitScreen() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilterTransit />
      {/* Fin */}

      {/* Tabla */}
      <TransitTable/>
      {/* Fin */}

    </Box>
  );
}
