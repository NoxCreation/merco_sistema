import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import TransitTable from "./components/TransitTable";
import { BarFilter } from "../../frontend/core/components/BarFilter";
import TransitActionsButtonGroup from "./components/TransitActionsButtonGroup";
import TabGroup from "@/frontend/core/components/TabGroup";
import AddProductDialog from "./dialogs/AddProductDialog";
import TransitDetailsDialog from "./dialogs/TransitDetailsDialog";
import AddProductQuantityDialog from "./dialogs/AddProductQuantityDialog";
import MainTransitDialog from "./dialogs/MainTransitDialog";

export default function TransitScreen() {
  const tabs = ["Domicilio", "Deudas"];

  const {
    isOpen: isOpenTransitDetailsDialog,
    onOpen: onOpenTransitDetailsDialog,
    onClose: onCloseTransitDetailsDialog,
  } = useDisclosure();

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
        <TransitActionsButtonGroup onAddProduct={onOpenTransitDetailsDialog} />
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      <TransitTable />
      {/* Fin */}

      <MainTransitDialog
        isOpen={isOpenTransitDetailsDialog}
        onClose={onCloseTransitDetailsDialog}
      />
    </Box>
  );
}
