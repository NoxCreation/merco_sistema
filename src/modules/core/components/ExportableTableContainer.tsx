import { Box, Flex, Heading, Stack, Tooltip } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import ExcelIcon from "../icons/ExcelIcon";

type Props = {
  title: string;
  children: ReactNode | ReactNode[];
  onExportToExcel?: () => {};
};

export default function ExportableTableContainer({ title, children }: Props) {
  return (
    <Stack spacing={5} backgroundColor={"white"} paddingY={"20px"} paddingX={"30px"} borderRadius={"md"}>
      <Flex width={"full"} justifyContent={"space-between"}>
        <Heading
          as={"h4"}
          fontSize={"12px"}
          textTransform={"uppercase"}
          color={"gray.400"}
          letterSpacing={"2px"}
        >
          {title}
        </Heading>
        <Tooltip hasArrow label="Exportar a Excel" fontSize={"sm"}>
          <Box cursor={"pointer"}>
            <ExcelIcon />
          </Box>
        </Tooltip>
      </Flex>
      <Box>{children}</Box>
    </Stack>
  );
}
