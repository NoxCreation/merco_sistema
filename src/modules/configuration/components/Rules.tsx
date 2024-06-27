import { Flex, Text, Button, Center } from "@chakra-ui/react";
import React from "react";
import RuleItem from "./RuleItem";
import { AddIcon } from "@chakra-ui/icons";
import { OfferRule } from "@/backend/types";

interface Props {
    isDisabled?: boolean
    rules?: Array<OfferRule>
    onSaveOfferRule?: (rule: OfferRule, data: { comparative_symbol: string, value: number, percentage: number }) => void
    onRemoveOfferRule?: (rule: OfferRule) => void
    onAdd?: () => void
}

export default function Rules({ isDisabled, rules, onSaveOfferRule, onRemoveOfferRule, onAdd }: Props) {
    return (
        <Flex alignItems={"center"} gap={"15px"} flexDir={'column'}>
            {rules?.map((c, i) => (
                <RuleItem key={i} isDisabled={!isDisabled} rule={c} onSaveOfferRule={onSaveOfferRule ? onSaveOfferRule : ()=>{}} onRemoveOfferRule={onRemoveOfferRule ? onRemoveOfferRule : ()=>{}}/>
            ))}
            <Button colorScheme="cyan" color={"white"} w={'100%'} isDisabled={!isDisabled} onClick={onAdd}>
                <Center gap={"20px"}>
                    <AddIcon />
                    <Text fontSize={'14px'}>Agregar</Text>
                </Center>
            </Button>
        </Flex>
    );
}
