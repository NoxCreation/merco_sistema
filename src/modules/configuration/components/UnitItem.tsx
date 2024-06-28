import { Flex, Input, Select, Text, Box, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";

interface Props {
  value: number
  onSave: (value: number) => void
}

export default function UnitItem({ value, onSave }: Props) {
  const [v, setV] = useState(0 as number)

  useEffect(() => {
    setV(value)
  }, [value])

  return (
    <Flex alignItems={"center"} gap={"15px"} width={"full"}>
      <Input type="number" width={"full"} value={v} onChange={t => setV(parseFloat(t.target.value))} />
      <Text fontWeight={"bold"} color={"cyan.500"}>
        %
      </Text>
      <Flex>
        <IconButton aria-label="salvar"
          onClick={() => {
            onSave(v)
          }}
          variant={'ghost'} icon={<FaSave color="#00A3C4" width={"30px"} />} />
      </Flex>
    </Flex>
  );
}
