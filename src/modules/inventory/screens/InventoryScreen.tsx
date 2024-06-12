import MainLayout from "@/modules/core/layouts/MainLayout";
import React, { useState } from "react";
import MerchandiseTransferDialog from "../dialogs/MerchandiseTransferDialog";
import EditInventoryDialog from "../dialogs/EditInventoryDialog";
import ExportableTableContainer from "@/modules/core/components/ExportableTableContainer";
import InventoryTable from "../components/InventoryTable";
import {
  Flex,
  Text,
  Select,
  Tab,
  TabList,
  Tabs,
  TabIndicator,
  Badge,
  Button,
} from "@chakra-ui/react";
import InventoryActionsButtonGroup from "../components/InventoryActionsButtonGroup";
import CurrentNavigationPath from "@/modules/core/components/CurrentNavigationPath";
import TabGroup from "@/modules/core/components/TabGroup";
import InventoryContextProvider from "../contexts/InventoryContext";

export default function InventoryScreen() {
  const tabs = ["Inventario", "Historial"];
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <MainLayout screenTitle="Inventario">
      <InventoryContextProvider>
        <Flex
          paddingY={"20px"}
          marginY={"25px"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <CurrentNavigationPath path="Inventario" />
          <Flex gap={"10px"} alignItems={"center"}>
            <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
            <Select
              colorScheme="cyan"
              minWidth={"210px"}
              backgroundColor={"white"}
            >
              <option>Almacen</option>
            </Select>
            <InventoryActionsButtonGroup />
          </Flex>
        </Flex>
        {activeTabIndex === 0 ? <InventoryTable /> : null}
        <MerchandiseTransferDialog />
        {/* <EditInventoryDialog /> */}
      </InventoryContextProvider>
    </MainLayout>
  );
}
