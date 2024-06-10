import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import MerchandiseTransferDialog from "../dialogs/MerchandiseTransferDialog";
import EditInventoryDialog from "../dialogs/EditInventoryDialog";

export default function InventoryScreen() {
  return (
    <MainLayout>
      {/* <MerchandiseTransferDialog /> */}
      <EditInventoryDialog />
    </MainLayout>
  );
}
