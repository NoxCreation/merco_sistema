import MainLayout from "@/modules/core/layouts/MainLayout";
import React from "react";
import AddProductDialog from "../dialogs/AddProductDialog";
import InTransitMerchancyTable from "../components/InTransitMerchancyTable";

export default function TransitScreen() {
  return (
    <MainLayout>
      <InTransitMerchancyTable />
      {/* <AddProductDialog /> */}
    </MainLayout>
  );
}
