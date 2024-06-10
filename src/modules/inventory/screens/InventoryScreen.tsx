import MainLayout from "@/modules/core/layouts/MainLayout";
import React from "react";
import MerchandiseTransferDialog from "../dialogs/MerchandiseTransferDialog";
import EditInventoryDialog from "../dialogs/EditInventoryDialog";
import ExportableTableContainer from "@/modules/core/components/ExportableTableContainer";

export default function InventoryScreen() {
  return (
    <MainLayout>
      <ExportableTableContainer title="Inventario">
        <h1>Inventory</h1>
      </ExportableTableContainer>
      {/* <MerchandiseTransferDialog /> */}
      {/* <EditInventoryDialog /> */}
    </MainLayout>
  );
}
