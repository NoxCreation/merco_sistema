import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Flex,
    Radio,
    RadioGroup,
    Select,
    Stack,
    Text
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { InvoiceType } from "../type"
import { CardAccount } from "@/backend/types"

interface Props {
    invoice_products: InvoiceType
    cards_account: Array<CardAccount>
    onUpdateProductOnCar: (invoice: InvoiceType) => void
}

export const ItemMethodPayment = ({
    invoice_products,
    cards_account,
    onUpdateProductOnCar
}: Props) => {
    const [method_payment, set_method_payment] = useState("effective")

    useEffect(() => {
        set_method_payment(invoice_products.payment_method.type)
    }, [])

    const onChangeType = (t: string) => {
        set_method_payment(t)
        let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
        temp.payment_method = {
            type: t,
            card_number: ""
        }
        onUpdateProductOnCar(temp)
    }

    return (
        <Box>
            <Stack paddingY={"10px"}>
                <Text fontSize={"14px"} fontWeight={"bold"} >
                    Método de pago
                </Text>
                <Flex>
                    <RadioGroup w={'100%'} value={method_payment} onChange={onChangeType}>
                        <Flex>
                            <Radio value='effective' flex={1} colorScheme="cyan">Efectivo</Radio>
                            <Radio value='transfer' flex={1} colorScheme="cyan">Transferencia</Radio>
                        </Flex>
                    </RadioGroup>
                </Flex>
            </Stack>
            {method_payment == 'transfer' && (
                <>
                    {cards_account.length == 0 ? (
                        <Alert status='error' variant={'error'}>
                            <AlertIcon />
                            <AlertDescription>
                                No hay tarjetas registradas
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Stack paddingY={"10px"}>
                            <Text fontSize={"14px"} fontWeight={"bold"}>
                                Tarjeta
                            </Text>
                            <Select colorScheme="cyan" >
                                {cards_account.map((c, i) => (
                                    <option value={c.id} key={i}>{c.code} | {c.coin.symbol}</option>
                                ))}
                            </Select>
                        </Stack>
                    )}
                </>
            )}
        </Box>
    )
}