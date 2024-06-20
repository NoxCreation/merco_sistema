import {
  Badge,
  Flex,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  title: string;
  benefits: string[];
  price: number;
  isSelected?: boolean;
};

export default function SMSPricingCard({
  title,
  benefits,
  price,
  isSelected = false,
}: Props) {
  return (
    <Stack
      boxShadow={isSelected ? "0 0 0 2px #76E4F7" : "none"}
      borderRadius={"md"}
      cursor={"pointer"}
      padding={"15px"}
    >
      <Heading as="h4" fontSize={"25px"} fontWeight={"bold"}>
        {title}
      </Heading>
      <UnorderedList fontSize={"15px"}>
        {benefits.map((benefit, index) => (
          <ListItem key={index}>{benefit}</ListItem>
        ))}
      </UnorderedList>
      <Flex width={"full"}>
        <Badge border={"none"} colorScheme="green" variant={"solid"}>
          {price} CUP
        </Badge>
      </Flex>
    </Stack>
  );
}
