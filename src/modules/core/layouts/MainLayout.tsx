import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";
import Head from "next/head";

type Props = {
  children: ReactNode | ReactNode[];
  screenTitle: string;
};

export default function MainLayout({ children, screenTitle }: Props) {
  const pathname = usePathname();

  return (
    <Box
      minHeight={"100vh"}
      padding={"30px"}
      paddingTop={"30px"}
      backgroundColor={"#F5F9FC"}
    >
      <Head>
        <title>{screenTitle}</title>
      </Head>
      <Navbar />
      {children}
    </Box>
  );
}
