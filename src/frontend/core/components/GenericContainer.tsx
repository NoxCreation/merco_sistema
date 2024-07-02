import { Stack, Heading, Box, StackProps, Flex } from "@chakra-ui/react";
import React, { MutableRefObject, ReactNode, forwardRef } from "react";

interface Props extends StackProps {
  title: string;
  children: ReactNode | ReactNode[];
}

export const GenericContainer = ({ children, title, ...props }: Props) => {
  return (
    <Flex
      spacing={5}
      flexDir={'column'}
      backgroundColor={"white"}
      paddingY={"20px"}
      paddingX={"30px"}
      borderRadius={"md"}
      boxShadow={"0 4px 120px 0 rgba(115, 115, 155, 8%)"}
      {...props}
      h={'fit-content'}
    >
      <Heading
        alignSelf={"start"}
        as={"h4"}
        fontSize={"12px"}
        textTransform={"uppercase"}
        color={"gray.400"}
        letterSpacing={"2px"}
      >
        {title}
      </Heading>
      <Box paddingY={'15px'}>{children}</Box>
    </Flex>
  );
};

export default GenericContainer;
