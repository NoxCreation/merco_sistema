import { NumberAnimation } from "@/frontend/core/components/NumberAnimation"
import {
    Flex,
    Text
} from "@chakra-ui/react"

interface Props {
    payment_cup: number
}

export const ItemProfitSeller = ({
    payment_cup
}: Props) => {
    return (
        <Flex justifyContent={"space-between"}>
            <Text fontSize={"14px"} fontWeight={"bold"}>
                Ganancia vendedor
            </Text>
            <Text fontSize={"14px"} fontWeight={"bold"} color={"cyan.500"}>
                ~ <NumberAnimation value={payment_cup} /> CUP
            </Text>
        </Flex>
    )
}