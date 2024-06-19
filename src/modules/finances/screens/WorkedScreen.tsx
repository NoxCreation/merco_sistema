import { BarFilter } from "@/frontend/core/components/BarFilter";
import { Box, Stack, Flex, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import WorkedTable from "../components/WorkedTable";
import OperationsTable from "../components/OperationsTable";
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";
import swal from "sweetalert";

export default function WorkedScreen() {
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
            label: "Trabajados",
            icon: undefined,
            link: "/finances/worked",
          },
        ]}
      ></BarFilter>
      <Stack gap={"10px"}>
        <Flex justifyContent={"end"} my={"20px"} gap={"10px"}>
          <DateRangeSelector />
          <Button
            colorScheme="cyan"
            color={"white"}
            onClick={() => {
              swal({
                title: "¿Está seguro?",
                text: "Se realizará el cierre contable hasta la fecha elegida",
                icon: "warning",
                buttons: ["Cancelar", "Realizar cierre"],
              });
            }}
          >
            Realizar Balance
          </Button>
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
