import { Box } from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Loading } from "../components/Loading";
import SyncWithServerToast from "../components/SyncWithServerToast";

type Props = {
  children: ReactNode | ReactNode[];
  screenTitle?: string;
};

export default function MainLayout({ children, screenTitle }: Props) {
  const session = useSession();
  const { status, data } = session;
  const router = useRouter();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/auth");
    }
  }, [session, status, data]);

  return (
    <Box
      minHeight={"100vh"}
      padding={"30px"}
      paddingTop={"30px"}
      backgroundColor={"#F5F9FC"}
    >
      <Head>
        <title>{screenTitle ? screenTitle : "Merco Sistema"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {status == "loading" && <Loading isLoading />}
      {status == "authenticated" && children}
      <SyncWithServerToast />
    </Box>
  );
}
