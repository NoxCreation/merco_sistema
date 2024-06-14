import React, { useState } from "react";
import MerchandiseTransferDialog from "./dialogs/MerchandiseTransferDialog";
import InventoryTable from "./components/InventoryTable";
import {
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import EditInventoryDialog from "./dialogs/EditInventoryDialog";
import { BarFilterInventory } from "./components/BarFilterInventory";

export default function InventoryScreen() {

  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { isOpen: isOpenTransferDialog, onOpen: onOpenTransferDialog, onClose: onCloseTransferDialog } = useDisclosure()

  const onTransferProducts =()=>{
    onOpenTransferDialog()
  }

  return (
    <Box>

      {/* Barra de Filteros */}
      <BarFilterInventory
        setActiveTabIndex={setActiveTabIndex}
        onTransferProducts={onTransferProducts}
      />
      {/* Fin */}

      {/* Tabla */}
      {activeTabIndex === 0 ? (
        <InventoryTable 
          onTransferProducts={onTransferProducts}
        />
      ) : (
        <>historial</>
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
