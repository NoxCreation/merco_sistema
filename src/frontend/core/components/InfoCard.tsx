import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  color: string;
  badgeText?: string;
};

export default function InfoCard({
  color,
  description,
  icon,
  title,
  value,
  badgeText,
}: Props) {
  return (
    <Flex
      padding={"30px"}
      justifyContent={"space-between"}
      width={"full"}
      backgroundColor={"white"}
      borderRadius={"lg"}
    >
      <Stack spacing={"10px"}>
        <Heading
          as={"h4"}
          color={"#828D99"}
          textTransform={"uppercase"}
          fontSize={"12px"}
        >
          {title}
        </Heading>
        <Text fontSize={"25px"} fontWeight={"bold"}>
          {value}
        </Text>
        <Flex alignItems={"center"} gap={"20px"}>
          {badgeText && <Badge>{badgeText}</Badge>}
          <Text color={"gray.400"}>{description}</Text>
        </Flex>
      </Stack>
      <Center
        width={"60px"}
        height={"60px"}
        backgroundColor={color}
        borderRadius={"full"}
      >
        <Center width={"25px"} height={"25px"}>
          {icon}
        </Center>
      </Center>
    </Flex>
  );
}
