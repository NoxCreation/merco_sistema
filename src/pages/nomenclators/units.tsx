import LoadSuspense from "@/modules/core/components/LoadSuspense";
import MainLayout from "@/modules/core/layouts/MainLayout";
import React from "react";

export default function nomenclators_units() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import('@/modules/nomenclators/units')} />
    </MainLayout>
  )
}
