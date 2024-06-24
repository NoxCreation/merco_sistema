import { Box, Flex, Heading, Stack, Tooltip, Select } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import ExcelIcon from "../icons/ExcelIcon";
import TableFilterCount from "./TableFilterCount";

type Props = {
  title: string;
  children: ReactNode | ReactNode[];
  onExportToExcel?: () => void;
  onChangeFilterCount?: (e: number) => void;
  onDownloadExcel?: () => void;
};

export default function ExportableTableContainer({
  title,
  children,
  onChangeFilterCount,
  onDownloadExcel,
}: Props) {
  return (
    <Stack
      spacing={5}
      backgroundColor={"white"}
      paddingY={"20px"}
      paddingX={"30px"}
      borderRadius={"md"}
      position={"relative"}
      boxShadow={"0 4px 120px 0 rgba(115, 115, 155, 8%)"}
    >
      <Flex
        width={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
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
        {onDownloadExcel && (
          <Tooltip hasArrow label="Exportar a Excel" fontSize={"sm"}>
            <Box
              paddingX={"8px"}
              paddingY={"6px"}
              cursor={"pointer"}
              borderRadius={"full"}
              _hover={{ backgroundColor: "gray.200" }}
              onClick={onDownloadExcel}
            >
              <ExcelIcon />
            </Box>
          </Tooltip>
        )}
      </Flex>
      {onChangeFilterCount && <TableFilterCount onChangeFilterCount={onChangeFilterCount} />}
      <Box>{children}</Box>
    </Stack>
  );
}
