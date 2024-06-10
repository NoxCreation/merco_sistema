import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Navbar from "../Navbar";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function MainLayout({ children }: Props) {
  return (
    <Box
      minHeight={"100vh"}
      padding={"30px"}
      paddingTop={"30px"}
      backgroundColor={"#F5F9FC"}
    >
      <Navbar />
      {children}
    </Box>
  );
}
