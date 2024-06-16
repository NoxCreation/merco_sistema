import LoadSuspense from "@/modules/core/components/LoadSuspense";
import MainLayout from "@/modules/core/layouts/MainLayout";
import React from "react";

export default function nomenclators_charges() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import('@/modules/nomenclators/charges')} />
    </MainLayout>
  )
}
