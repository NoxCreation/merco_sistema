import {
  Box,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";

type Props = {
  children: ReactNode | ReactNode[];
  screenTitle?: string;
};

export default function MainLayout({ children, screenTitle }: Props) {
  return (
    <Box
      minHeight={"100vh"}
      padding={"30px"}
      paddingTop={"30px"}
      backgroundColor={"#F5F9FC"}
    >
      <Head>
        <title>{screenTitle ? screenTitle : 'Merco Sistema'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </Box>
  );
}
