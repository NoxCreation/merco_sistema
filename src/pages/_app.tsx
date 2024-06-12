import MercoSistemaTheme from "@/modules/core/theme/Theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={MercoSistemaTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
