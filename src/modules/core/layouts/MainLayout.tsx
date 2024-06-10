import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <Box
      minHeight={"100vh"}
      padding={"30px"}
      paddingTop={"30px"}
      backgroundColor={"#F5F9FC"}
    >
      <Navbar />
      <Breadcrumb marginTop={"20px"} padding={"10px"}>
        {pathname.split("/").map((pathFragment, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink>{pathFragment}</BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      {children}
    </Box>
  );
}
