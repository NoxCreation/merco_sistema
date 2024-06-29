import { Coin } from "@/backend/types"
import { NumberAnimation } from "@/frontend/core/components/NumberAnimation"
import {
    Flex,
    Stack,
    Text
} from "@chakra-ui/react"

interface Props {
    coins: Array<Coin>
    total_payable: Array<number>
    disconts: Array<number>
}

export const ItemTotalPayable = ({
    coins,
    total_payable,
    disconts
}: Props) => {
    return (
        <Flex justifyContent={"space-between"}>
            <Text fontSize={"14px"} fontWeight={"bold"}>
                Total a pagar
            </Text>
            <Stack alignItems={'end'}>
                {total_payable.toReversed().map((total, index) => (
                    <Flex gap={2} key={index}>
                        {disconts.toReversed()[index] != 0 && (
                            <Text fontSize={"13px"} fontWeight={"bold"} color={"cyan.500"} >
                                <NumberAnimation value={disconts.toReversed()[index]} /> {coins[index].symbol}
                            </Text>
                        )}
                        <Text fontSize={"13px"} fontWeight={"bold"} color={"cyan.500"} textDecoration={disconts.toReversed()[index] != 0 ? 'line-through' : 'initial'}>
                            <NumberAnimation value={total} /> {coins[index].symbol}
                        </Text>
                    </Flex>
                ))}
            </Stack>
        </Flex>
    )
}