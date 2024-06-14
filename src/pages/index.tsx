import LoadSuspense from "@/modules/core/components/LoadSuspense";
import InitialLayout from "@/modules/initial/layouts/InitialLayout";
import SplashScreen from "@/modules/splash_screen";
import { Center } from "@chakra-ui/react";
import Head from "next/head";

export default function Home() {
  return (
    <Center
      minHeight={"100vh"}
      width={"full"}
      backgroundColor={"#F3F7F9"}
      borderRadius={"lg"}
    >
      <Head>
        <title>Cargando ...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadSuspense load={() => import('@/modules/splash_screen')} />
    </Center>
  );
}
