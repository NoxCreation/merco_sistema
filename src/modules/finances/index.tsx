import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import BalanceTable from "./components/BalanceTable";
import DailyCloseTable from "./components/DailyCloseTable";
import WorkedTable from "./components/WorkedTable";
import DailyCloseDialog from "./dialogs/DailyCloseDialog";
import DebtDeclarationDialog from "./dialogs/DebtDeclarationDialog";
import FinanceDetails from "./FinanceDetails";

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

      {/* {activeTabIndex === 0 && <BalanceTable />}
      {activeTabIndex === 1 && <DailyCloseTable />}
      {activeTabIndex === 2 && <WorkedTable />} */}

      {/* <DailyCloseDialog /> */}
      {/* <DebtDeclarationDialog /> */}

      <FinanceDetails />
    </Box>
  );
}
