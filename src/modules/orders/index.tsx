import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import OrdersTable from "./components/OrdersTable";
import OrderActionsButtonGroup from "./components/OrdersActionsButtonGroup";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import OrderDetailsDialog from "./dialogs/OrderDetailsDialog";
import MainOrderDialog from "./dialogs/MainOrderDialog";

export default function TransitScreen() {
  const tabs = ["Tienda", "Domicilio"];

  const {
    isOpen: isOpenOrderDetailsDialog,
    onOpen: onOpenOrderDetailsDialog,
    onClose: onCloseOrderDetailsDialog,
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
        <OrderActionsButtonGroup onAddProduct={onOpenOrderDetailsDialog} />
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      <OrdersTable />
      {/* Fin */}

      <MainOrderDialog
        isOpen={isOpenOrderDetailsDialog}
        onClose={onCloseOrderDetailsDialog}
      />
    </Box>
  );
}
