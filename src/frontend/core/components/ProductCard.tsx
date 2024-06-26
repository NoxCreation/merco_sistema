import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  isSelected?: boolean;
  productName: string;
  photoUrl: string;
  price: number;
  currency: string;
  onClick: () => void;
};

export default function ProductCard({
  productName,
  photoUrl,
  onClick,
  price,
  currency,
  isSelected = false,
}: Props) {
  return (
    <Stack
      cursor={"pointer"}
      maxWidth={"150px"}
      height={'fit-content'}
      backgroundColor={"white"}
      borderRadius={"lg"}
      border={isSelected ? "2px solid" : "nonde"}
      borderColor={"cyan.500"}
      boxShadow={"0 4px 120px 0 rgba(115, 115, 155, 8%)"}
      onClick={onClick}
    >
      <Center
        maxWidth={"150px"}
        height={"150px"}
        overflow={"hidden"}
        borderRadius={"lg"}
      >
        <Image
          alt={productName}
          height={"full"}
          objectFit={"contain"}
          width={"150px"}
          src={photoUrl ? photoUrl : "https://gegshop.nl/162891-tm_large_default/Repsol-4t-olie-moto-off-road-10w40-olie-vol-synthetisch-4l.jpg"}
        />
      </Center>
      <Stack padding={"10px"} spacing={0} width={"full"}>
        <Heading as="h5" fontSize={"14px"} fontWeight={"semibold"}>
          {productName}
        </Heading>
        <Flex alignItems={"center"} justifyContent={"space-between"} mt={2}>
          <Text color={"gray.500"}>$ {price}</Text>
          <Badge
            variant={"outline"}
            colorScheme="purple"
            borderRadius={"full"}
            paddingX={"12px"}
          >
            {currency}
          </Badge>
        </Flex>
      </Stack>
    </Stack>
  );
}
