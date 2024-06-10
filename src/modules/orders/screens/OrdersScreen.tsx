import MainLayout from "@/components/layouts/MainLayout";
import React from "react";
import MakeOrderDialog from "../dialogs/MakeOrderDialog";

export default function OrdersScreen() {
  return <MainLayout>
    <MakeOrderDialog />
  </MainLayout>;
}
