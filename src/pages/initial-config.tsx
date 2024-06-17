import LoadSuspense from "@/frontend/core/components/LoadSuspense";
import React from "react";

export default function InitialConfig() {
  return <LoadSuspense load={() => import('@/modules/initial/')} />
}
