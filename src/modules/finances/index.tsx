import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
} from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import WorkedTable from "./components/WorkedTable";
import FinanceDetails from "./FinanceDetails";
import { es } from "date-fns/locale";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";

export default function FinancesScreen() {
  const tabs = ["Balance", "Cierres Diarios", "Trabajados"];
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
      </BarFilter>

      {activeTabIndex == 2 && (
        <React.Fragment>
          <Flex justifyContent={"end"} my={"20px"} gap={"10px"}>
            <DateRangeSelector />
            <Button colorScheme="cyan" color={"white"}>
              Realizar Balance
            </Button>
          </Flex>
          <WorkedTable />
        </React.Fragment>
      )}

      {activeTabIndex === 1 && (
        <React.Fragment>
          <Flex justifyContent={"end"} my={"20px"} gap={"10px"}>
            <Input type="date" maxWidth={"200px"} background={"white"}/>
            <Button colorScheme="cyan" color={"white"}>
              Realizar Balance
            </Button>
          </Flex>
          <WorkedTable />
        </React.Fragment>
      )}

      {/* <DailyCloseDialog /> */}
      {/* <DebtDeclarationDialog /> */}

      <FinanceDetails />
    </Box>
  );
}
