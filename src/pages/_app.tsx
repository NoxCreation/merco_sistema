import MercoSistemaTheme from "@/frontend/core/theme/Theme";
import "@/styles/globals.css";
import '../../public/fonts/fonts.css';
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={MercoSistemaTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
