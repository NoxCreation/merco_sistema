import { OfferRule } from "@/backend/types";
import { Flex, Input, Select, Text, Box, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaTrash, FaSave } from "react-icons/fa";

interface Props {
  isDisabled?: boolean
  rule?: OfferRule
  onSaveOfferRule: (rule: OfferRule, data: { comparative_symbol: string, value: number, percentage: number }) => void
  onRemoveOfferRule: (rule: OfferRule) => void
}

export default function RuleItem({ isDisabled, rule, onSaveOfferRule, onRemoveOfferRule }: Props) {

  const [comparative_symbol, set_comparative_symbol] = useState(rule?.comparative_symbol as string)
  const [value, set_value] = useState(rule?.value as number)
  const [percentage, set_percentage] = useState(rule?.percentage as number)

  return (
    <Flex alignItems={"center"} gap={"15px"}>
      <Select fontSize={'14px'} isDisabled={isDisabled} value={comparative_symbol} onChange={t => set_comparative_symbol(t.target.value)}>
        <option value=">">Mayor A</option>
        <option value="<">Menor A</option>
        <option value=">=">Mayor Igual A</option>
        <option value="<=">Menor Igual A</option>
      </Select>
      <Input type="number" isDisabled={isDisabled} value={value} onChange={t => set_value(parseFloat(t.target.value))} />
      <Text fontWeight={"bold"} color={"cyan.500"} fontSize={'14px'}>
        USD
      </Text>
      <Input type="number" isDisabled={isDisabled} value={percentage} onChange={t => set_percentage(parseFloat(t.target.value))} />
      <Text fontWeight={"bold"} color={"cyan.500"} fontSize={'14px'}>
        %
      </Text>
      <Flex>
        <IconButton 
          onClick={()=>{
            onRemoveOfferRule(rule as OfferRule)
          }}
          aria-label="eliminar" isDisabled={isDisabled} variant={'ghost'} icon={<FaTrash color="#00A3C4" width={"30px"} />} />
        <IconButton aria-label="salvar"
          onClick={() => {
            onSaveOfferRule(rule as OfferRule, {
              comparative_symbol,
              value,
              percentage
            })
          }}
          isDisabled={isDisabled} variant={'ghost'} icon={<FaSave color="#00A3C4" width={"30px"} />} />
      </Flex>
    </Flex>
  );
}
