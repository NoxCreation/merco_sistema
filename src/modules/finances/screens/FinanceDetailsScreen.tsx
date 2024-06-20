import { Badge, Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import WorkedTable from "../components/WorkedTable";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { useRouter } from "next/router";
import { MiniCard } from "@/modules/dashboard/components/MiniCard";
import DollarIcon from "@/frontend/core/icons/DollarIcon";
import GraphicGrowingIcon from "@/frontend/core/icons/GraphicGrowingIcon";
import CurvedArrowIcon from "@/frontend/core/icons/CurvedArrowIcon";

export default function FinanceDetailsScreen() {
  const router = useRouter();
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
            label: "Balance",
            icon: undefined,
            link: "/finances",
          },
          {
            label: "Detalles",
            icon: undefined,
            link: "/finances/details",
          },
        ]}
      ></BarFilter>
      <Stack gap={"10px"}>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="cyan.500"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="cyan.500"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="cyan.500"
            title="Inversión"
            subtitle="Inversión"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<GraphicGrowingIcon color="white" />}
            iconColor="green.500"
            title="Ganancia"
            subtitle="Ganancia obtenida"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<GraphicGrowingIcon color="white" />}
            iconColor="green.500"
            title="Ganancia"
            subtitle="Ganancia obtenida"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<GraphicGrowingIcon color="white" />}
            iconColor="green.500"
            title="Ganancia"
            subtitle="Ganancia obtenida"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<CurvedArrowIcon color="white" />}
            iconColor="red.500"
            title="Total gastos"
            subtitle="Total gastos"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<CurvedArrowIcon color="white" />}
            iconColor="red.500"
            title="Total gastos"
            subtitle="Total gastos"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<CurvedArrowIcon color="white" />}
            iconColor="red.500"
            title="Total gastos"
            subtitle="Total gastos"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <Flex>
          <MiniCard
            icon={<CurvedArrowIcon color="white" />}
            iconColor="red.500"
            title="Pago salarios"
            subtitle="Pago salarios"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <Flex gap={"10px"}>
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="blue.500"
            title="70% Ganancia"
            subtitle="Porcentaje definido"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
          <MiniCard
            icon={<DollarIcon color="white" />}
            iconColor="blue.500"
            title="30% Ganancia"
            subtitle="Porcentaje definido"
            value="$1.000.000"
            badge={<Badge>USD</Badge>}
          />
        </Flex>
        <WorkedTable
          onViewDetails={() => {
            router.push("/finances/details/operations");
          }}
        />
      </Stack>
    </Box>
  );
}
