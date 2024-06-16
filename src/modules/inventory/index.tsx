import React, { useState } from "react";
import MerchandiseTransferDialog from "./dialogs/MerchandiseTransferDialog";
import InventoryTable from "./components/InventoryTable";
import { Box, Select, useDisclosure } from "@chakra-ui/react";
import EditInventoryDialog from "./dialogs/EditInventoryDialog";
import HistoryTable from "./components/HistoryTable";
import { BarFilter } from "../core/components/BarFilter";
import TabGroup from "../core/components/TabGroup";
import InventoryActionsButtonGroup from "./components/InventoryActionsButtonGroup";

export default function InventoryScreen() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabs = ["Inventario", "Historial"];
  const {
    isOpen: isOpenTransferDialog,
    onOpen: onOpenTransferDialog,
    onClose: onCloseTransferDialog,
  } = useDisclosure();

  const onTransferProducts = () => {
    onOpenTransferDialog();
  };

  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: 'Inventario',
            icon: undefined,
            link: '/inventario'
          }
        ]}
      >
        <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
        <Select
          fontSize={'13px'}
          colorScheme="cyan"
          minWidth={"210px"}
          backgroundColor={"white"}
        >
          <option>Almacen</option>
        </Select>
        <InventoryActionsButtonGroup
          onTransferProducts={onTransferProducts}
        />
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      {activeTabIndex === 0 ? (
        <InventoryTable onTransferProducts={onTransferProducts} />
      ) : (
        <HistoryTable />
      )}
      {/* Fin */}

      {/* Ventanas modales */}
      <MerchandiseTransferDialog
        isOpen={isOpenTransferDialog}
        onClose={onCloseTransferDialog}
      />
      <EditInventoryDialog />
      {/* Fin */}
    </Box>
  );
}
