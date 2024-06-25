export default function Inventory() {
  return (
    <MainLayout>
      <LoadSuspense load={() => import("@/modules/inventory/")} />
    </MainLayout>
  );
}
