import LoadSuspense from "@/frontend/core/components/LoadSuspense";
import MainLayout from "@/frontend/core/layouts/MainLayout";

export default function Inventory() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import("@/modules/profile/")} />
    </MainLayout>
  );
}
