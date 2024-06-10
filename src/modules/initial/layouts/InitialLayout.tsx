import { Center } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | ReactNode[];
};

export default function InitialLayout({ children }: Props) {
  return (
    <Center
      minHeight={"100vh"}
      width={"full"}
      backgroundColor={"#F3F7F9"}
      borderRadius={"lg"}
    >
      {children}
    </Center>
  );
}
