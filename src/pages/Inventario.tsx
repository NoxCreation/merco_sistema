import LoadSuspense from "@/frontend/core/components/LoadSuspense";
import MainLayout from "@/frontend/core/layouts/MainLayout";
import React from "react";

export default function Inventory() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import('@/modules/inventory/')} />
    </MainLayout>
  )
}

