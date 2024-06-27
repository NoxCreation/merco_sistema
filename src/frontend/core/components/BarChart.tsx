import { Bar } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import GenericContainer from "./GenericContainer";
import { Box } from "@chakra-ui/react";

const data: ChartData<"bar"> = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "#11f9FF99",
      borderColor: "transparent",
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Ventas mensuales",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const BarChart = () => {
  return (
    <GenericContainer
      title="Graficos"
      width={"full"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box width={"full"}>
        <Bar data={data} options={options} width={"100%"}/>
      </Box>
    </GenericContainer>
  );
};
