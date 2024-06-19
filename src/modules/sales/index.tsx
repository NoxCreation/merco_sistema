import React, { useState } from "react";
import { Flex, Box, Select, Button, Text } from "@chakra-ui/react";
import InvoicePanel from "./components/InvoicePanel";
import ProductGrid from "./components/ProductGrid";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import { SearchIcon } from "@chakra-ui/icons";
import { DateRangePicker } from "react-date-range";
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";
import SellingHistoryTable from "./components/SellingHistoryTable";

export default function SalesScreen() {
  const tabs = ["Stock", "Historial"];
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: `Finanzas`,
            icon: undefined,
            link: "/finanzas",
          },
          {
            label: tabs[activeTabIndex],
            icon: undefined,
            link: "/finanzas",
          },
        ]}
      >
        <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
        <Select background={"white"} maxWidth={"170px"}>
          <option>Frio Plus</option>
          <option>Frio Plus</option>
          <option>Frio Plus</option>
        </Select>
        {activeTabIndex === 1 && <DateRangeSelector />}
        <Button color={"white"} colorScheme="cyan">
          <Flex paddingX={"40px"} gap={"10px"}>
            <SearchIcon />
            <Text>Buscar</Text>
          </Flex>
        </Button>
      </BarFilter>
      {activeTabIndex === 0 && (
        <Flex gap={"15px"}>
          <ProductGrid />
          <Box flex={2} position={"relative"}>
            <InvoicePanel />
          </Box>
        </Flex>
      )}
      {activeTabIndex === 1 && <SellingHistoryTable />}
    </Box>
  );
}
