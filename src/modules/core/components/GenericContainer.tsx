import { Stack, Flex, Heading, Box, StackProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface Props extends StackProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export default function GenericContainer({ children, title, ...props }: Props) {
  return (
    <Stack
    spacing={5}
    backgroundColor={"white"}
    paddingY={"20px"}
    paddingX={"30px"}
    borderRadius={"md"}
    boxShadow={"0 4px 120px 0 rgba(115, 115, 155, 8%)"}
    {...props}
    >
      <Heading
        as={"h4"}
        fontSize={"12px"}
        textTransform={"uppercase"}
        color={"gray.400"}
        letterSpacing={"2px"}
      >
        {title}
      </Heading>
      <Box>{children}</Box>
    </Stack>
  );
}
