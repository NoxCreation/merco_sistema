import LoadSuspense from "@/modules/core/components/LoadSuspense";
import MainLayout from "@/modules/core/layouts/MainLayout";
import React from "react";

export default function Inventory() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import('@/modules/inventory/')} />
    </MainLayout>
  )
}

