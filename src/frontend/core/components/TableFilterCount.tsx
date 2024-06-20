import { Flex, Select } from "@chakra-ui/react";
import React from "react";

type Props = {
  onChangeFilterCount?: (e: number) => void;
};

export default function TableFilterCount({ onChangeFilterCount }: Props) {
  return (
    <Flex
      width={"full"}
      justifyContent={"end"}
      position={"relative"}
      height={"45px"}
    >
      <Select
        defaultValue={10}
        width={"fit-content"}
        colorScheme="cyan"
        position={"sticky"}
        onChange={(e) =>
          onChangeFilterCount && onChangeFilterCount(parseInt(e.target.value))
        }
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <option key={index}>{(index + 1) * 5}</option>
        ))}
      </Select>
    </Flex>
  );
}
