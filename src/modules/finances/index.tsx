import React, { useState } from "react";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import WorkedTable from "./components/WorkedTable";

import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";
import BalanceTable from "./components/BalanceTable";
import { useRouter } from "next/router";
import DailyCloseDialog from "./dialogs/DailyCloseDialog";
import DebtDeclarationDialog from "./dialogs/DebtDeclarationDialog";

export default function FinancesScreen() {
  const tabs = ["Balance", "Cierres Diarios"];
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const router = useRouter();

  const {
    isOpen: isOpenDailyCloseDialog,
    onOpen: onOpenDailyCloseDialog,
    onClose: onCloseDailyCloseDialog,
  } = useDisclosure();

  const {
    isOpen: isOpenDebtDeclarationDialog,
    onOpen: onOpenDebtDeclarationDialog,
    onClose: onCloseDebtDeclarationDialog,
  } = useDisclosure();

  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: `Finanzas`,
            icon: undefined,
            link: "/finances",
          },
          {
            label: tabs[activeTabIndex],
            icon: undefined,
            link: "/finances",
          },
        ]}
      >
        <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
      </BarFilter>

      {activeTabIndex == 0 && (
        <React.Fragment>
          <Flex justifyContent={"end"} my={"20px"} gap={"10px"}>
            <DateRangeSelector />
            <Button
              colorScheme="cyan"
              color={"white"}
              onClick={() => {
                router.push("/finances/worked");
              }}
            >
              Realizar Balance
            </Button>
          </Flex>
          <BalanceTable
            onViewDetails={() => {
              router.push("/finances/details");
            }}
          />
        </React.Fragment>
      )}

      {activeTabIndex === 1 && (
        <React.Fragment>
          <Flex justifyContent={"end"} my={"20px"} gap={"10px"}>
            <DateRangeSelector />
            <Button colorScheme="cyan" color={"white"} onClick={onOpenDailyCloseDialog}>
              Realizar Cierre
            </Button>
          </Flex>
          <WorkedTable onViewDetails={() => {}} />
        </React.Fragment>
      )}

      <DailyCloseDialog
        isOpen={isOpenDailyCloseDialog}
        onClose={onCloseDailyCloseDialog}
        onGenerateDebt={onOpenDebtDeclarationDialog}
      />
      <DebtDeclarationDialog
        isOpen={isOpenDebtDeclarationDialog}
        onClose={onCloseDebtDeclarationDialog}
      />
    </Box>
  );
}
