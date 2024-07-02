import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Flex,
    Radio,
    RadioGroup,
    Checkbox,
    Select,
    Stack,
    Text
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { InvoiceType } from "../type"
import { CardAccount, Coin } from "@/backend/types"

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
    const [update, set_update] = useState("")
    const [method_payment, set_method_payment] = useState("effective")
    const [cards_account_by_payment_currency, set_cards_account_by_payment_currency] = useState([] as Array<Array<CardAccount>>)
    const [cards_selected, set_cards_selected] = useState([] as Array<{
        card_account_id: number,
        enabled: boolean
    }>)

    useEffect(() => {
        set_method_payment(invoice_products.payment_method)
    }, [])

    useEffect(() => {
        let result = [] as Array<Array<CardAccount>>
        let select = [] as Array<{
            card_account_id: number,
            enabled: boolean
        }>

        if (update != JSON.stringify(invoice_products.payment_currency)) {
            set_update(JSON.stringify(invoice_products.payment_currency))

            invoice_products.payment_currency.forEach(pc => {
                let cards = cards_account.filter(t => t.coin.symbol == pc.coin.symbol).filter(t => t.value < t.limit)
                if (cards.length != 0) {
                    result.push(cards)
                    select.push({
                        card_account_id: cards[0].id,
                        enabled: true
                    })
                }
            })
            onUpdate(select)

            set_cards_account_by_payment_currency(result)
            set_cards_selected(select)
        }
    }, [invoice_products])

    const onChangeType = (t: string) => {
        set_method_payment(t)
        let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
        temp.payment_method = t
        onUpdateProductOnCar(temp)
    }

    const onUpdate = (cards_selected: Array<{
        card_account_id: number,
        enabled: boolean
    }>) => {
        let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
        temp.card_payment = cards_selected.filter(t => t.enabled)
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
                    <Flex flexDir={'column'} gap={2}>
                        <Text fontSize={"14px"} fontWeight={"bold"}>
                            Tarjeta
                        </Text>

                        {cards_account_by_payment_currency.length == 0 && (
                            <Alert status='error' variant={'error'}>
                                <AlertIcon />
                                <AlertDescription>
                                    No hay tarjetas registradas en alguna moneda seleccionada.
                                </AlertDescription>
                            </Alert>
                        )}

                        {cards_account_by_payment_currency.map((cards, index) => (
                            <>
                                <Flex gap={2}>
                                    <Select colorScheme="cyan" value={cards_selected[index].card_account_id} onChange={t => {
                                        const temp = JSON.parse(JSON.stringify(cards_selected))
                                        temp[index].card_account_id = t.target.value
                                        set_cards_selected(temp)
                                        onUpdate(temp)
                                    }}>
                                        {cards.map((c, index2) => (
                                            <option value={c.id} key={index2}>{c.code} | {c.coin.symbol}</option>
                                        ))}
                                    </Select>
                                    <Checkbox isChecked={cards_selected[index].enabled} onChange={t => {
                                        const temp = JSON.parse(JSON.stringify(cards_selected))
                                        temp[index].enabled = t.target.checked
                                        set_cards_selected(temp)
                                        onUpdate(temp)
                                    }} />
                                </Flex>
                            </>
                        ))}

                    </Flex>

                </>
            )}
        </Box >
    )
}