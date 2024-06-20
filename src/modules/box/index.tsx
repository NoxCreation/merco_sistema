import React from "react";
import { Badge, Box, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import BoxActionButtons from "./components/BoxActionButtons";
import BoxHistoryTable from "./components/BoxHistoryTable";
import DollarIcon from "@/frontend/core/icons/DollarIcon";
import GraphicGrowingIcon from "@/frontend/core/icons/GraphicGrowingIcon";
import { MiniCard } from "../dashboard/components/MiniCard";
import { PiArrowFatUp } from "react-icons/pi";
import BoxMovementDialog from "./dialogs/BoxMovementDialog";

export default function BoxScreen() {
  const {
    isOpen: isOpenMovementDialog,
    onClose: onCloseMovementDialog,
    onOpen: onOpenMovementDialog,
  } = useDisclosure();

  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: `Caja`,
            icon: undefined,
            link: "/box",
          },
        ]}
      >
        <BoxActionButtons onAction={onOpenMovementDialog}/>
      </BarFilter>
      <Stack spacing={"10px"} mb={"10px"}>
        <Flex gap={"10px"}>
          <MiniCard
            title={"En caja"}
            subtitle={"Dinero en físico"}
            value={"$ 1.000.000"}
            iconColor="green.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>USD</Badge>}
          />
          <MiniCard
            title={"En caja"}
            subtitle={"Dinero en físico"}
            value={"$ 1.000.000"}
            iconColor="green.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>CUP</Badge>}
          />
          <MiniCard
            title={"En caja"}
            subtitle={"Dinero en físico"}
            value={"$ 1.000.000"}
            iconColor="green.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>MLC</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            title={"70%"}
            subtitle={"70% de la ganancia"}
            value={"$ 1.000.000"}
            iconColor="cyan.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>USD</Badge>}
          />
          <MiniCard
            title={"70%"}
            subtitle={"70% de la ganancia"}
            value={"$ 1.000.000"}
            iconColor="cyan.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>USD</Badge>}
          />
          <MiniCard
            title={"70%"}
            subtitle={"70% de la ganancia"}
            value={"$ 1.000.000"}
            iconColor="cyan.500"
            icon={<GraphicGrowingIcon color={"white"} />}
            badge={<Badge fontSize={"10px"}>USD</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="teal.300"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="teal.300"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="teal.300"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<PiArrowFatUp color="white" />}
            iconColor="blue.300"
            title="Fondo"
            subtitle="Fondo de dinero"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<PiArrowFatUp color="white" />}
            iconColor="blue.300"
            title="Fondo"
            subtitle="Fondo de dinero"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<PiArrowFatUp color="white" />}
            iconColor="blue.300"
            title="Fondo"
            subtitle="Fondo de dinero"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
      </Stack>
      <BoxHistoryTable />
      <BoxMovementDialog isOpen={isOpenMovementDialog} onClose={onCloseMovementDialog} />
    </Box>
  );
}
