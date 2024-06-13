import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  path: string; // Example: Inventario/Almacen/Productos
};

export default function CurrentNavigationPath({ path }: Props) {
  const pathArray = path.split("/");

  return (
    <Flex justify={"start"} gap={"10px"} paddingX={"20px"}>
      {pathArray.map((pathItem, index) => (
        <React.Fragment key={index}>
          <Text color={index !== 0 ? "GrayText" : ""}>{pathItem}</Text>
          {index !== pathArray.length - 1 && <Text color={"GrayText"}>/</Text>}
        </React.Fragment>
      ))}
    </Flex>
  );
}
