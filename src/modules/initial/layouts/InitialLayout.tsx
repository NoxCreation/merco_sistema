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
      backgroundColor={"#F5F9FC"}
      borderRadius={"lg"}
    >
      {children}
    </Center>
  );
}
