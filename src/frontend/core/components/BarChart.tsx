import { Box } from "@chakra-ui/react";
import GenericContainer from "./GenericContainer";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jun1", value: 3000 },
  { name: "Jun2", value: 9000 },
  { name: "Jun3", value: 6000 },
  { name: "Jun4", value: 7700 },
  { name: "Jun5", value: 1100 },
  { name: "Jun6", value: 13000 },
  { name: "Jun5", value: 12000 },
];

export const CustomBarChart = () => {
  return (
    <GenericContainer title="Inversion por días" width={"full"}>
      <Box height={"25px"}></Box>
      <ResponsiveContainer width={"100%"} height={400}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontal={true}
          />
          <XAxis dataKey="name"></XAxis>
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#76E4F7" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </GenericContainer>
  );
};
