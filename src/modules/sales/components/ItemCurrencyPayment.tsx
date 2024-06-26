import {
    Checkbox,
    Flex,
    IconButton,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Tooltip,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { InvoiceType } from "../type"
import { Coin } from "@/backend/types"
import NumericKeypadDialog from "../dialogs/NumericKeypadDialog"
import { useEffect, useRef, useState } from "react"

interface Props {
    coins: Array<Coin>
    mode_pos: boolean
    invoice_products: InvoiceType
    payment_currency: Array<{
        symbol: string,
        active: boolean,
        value: number
    }>
    save_payment_currency: (payment_currency: Array<{
        symbol: string,
        active: boolean,
        value: number
    }>) => void
    set_payment_currency: (payment_currency: Array<{
        symbol: string,
        active: boolean,
        value: number
    }>) => void
}

export const ItemCurrencyPayment = ({
    coins,
    mode_pos,
    invoice_products,
    payment_currency,
    set_payment_currency,
    save_payment_currency
}: Props) => {
    const [index, setIndex] = useState(0)

    const ref_payment_currency = useRef(payment_currency)
    const ref_index = useRef(index)
    const ref_save_payment_currency = useRef(save_payment_currency)
    useEffect(() => {
        ref_payment_currency.current = payment_currency
        ref_index.current = index
        ref_save_payment_currency.current = save_payment_currency
    }, [payment_currency, index])

    const {
        isOpen: isOpenKeypay,
        onClose: onCloseKeypay,
        onOpen: onOpenKeypay,
    } = useDisclosure();

    function dividir(a: number, b: number) {
        let resultado = a / b;
        let resultadoRedondeado = Math.floor(resultado * 100) / 100;
        return resultadoRedondeado;
    }

    const sum = () => {
        let t = payment_currency.map((pc, i) => {
            if (pc.active) {
                return dividir(pc.value, coins[i].value_change)
            }
            return 0
        })

        return t.reduce((p, c) => p + c)
    }

    const get_total_usd = () => {
        const total_usd = invoice_products.products.length == 0 ? 0 : invoice_products.products.map(t => t.disconts[0] != 0 ? t.disconts[0] : t.prices[0]).reduce((prev, cur) => prev + cur)
        return total_usd
    }

    const complete_payment = (pc: {
        symbol: string,
        active: boolean,
        value: number
    }) => {
        let payments = JSON.parse(JSON.stringify(payment_currency))
        payments = payments.map((t: any, i: number) => {
            return {
                symbol: t.symbol,
                active: t.active,
                value: dividir(t.value, coins[i].value_change)
            }
        })

        payments = payments.filter((t: any) => t.active == true).filter((t: any) => t.symbol != pc.symbol).map((t: any) => t.value)
        const total_usd = invoice_products.products.length == 0 ? 0 : invoice_products.products.map(t => t.disconts[0] != 0 ? t.disconts[0] : t.prices[0]).reduce((prev, cur) => prev + cur)
        let diff = payments.length > 0 ? Math.round(((total_usd - (payments.reduce((p: number, c: number) => p + c))) * 100)) / 100 : total_usd

        let temp_payment_currency = JSON.parse(JSON.stringify(payment_currency)) as Array<{
            symbol: string,
            active: boolean,
            value: number
        }>
        (temp_payment_currency.find(t => t.symbol == pc.symbol) as any).value = diff * (coins.find(t => t.symbol == pc.symbol) as any).value_change
        //set_payment_currency(temp_payment_currency)
        save_payment_currency(temp_payment_currency)
    }

    const onUpdate = (value: string) => {
        let temp_payment_currency = JSON.parse(JSON.stringify(ref_payment_currency.current)) as Array<{
            symbol: string,
            active: boolean,
            value: number
        }>
        temp_payment_currency[ref_index.current].value = parseFloat(value)
        ref_save_payment_currency.current(temp_payment_currency)
    }

    return (
        <Stack paddingY={"10px"}>
            <NumericKeypadDialog
                isOpen={isOpenKeypay}
                onClose={onCloseKeypay}
                onEnter={onUpdate}
                initValue={payment_currency.length != 0 ? payment_currency[index].value : 0}
            />

            <Text fontSize={"14px"} fontWeight={"bold"}>
                Moneda de pago
            </Text>
            <Flex gap={"10px"} >
                {payment_currency.map((c, i) => (
                    <Stack width={"full"} key={i}>
                        <Flex>
                            <Checkbox colorScheme="cyan" isChecked={c.active} onChange={e => {
                                let temp = JSON.parse(JSON.stringify(payment_currency))
                                temp[i].active = e.target.checked
                                set_payment_currency(temp)
                            }}>{c.symbol}</Checkbox>
                            <Flex flex={1} justifyContent={'end'}>
                                <Tooltip label="Completar pago">
                                    <IconButton
                                        onClick={() => complete_payment(c)}
                                        borderRadius={'full'} variant={'ghost'} aria-label="" size={'xs'} icon={<>?</>} />
                                </Tooltip>
                            </Flex>
                        </Flex>
                        <NumberInput onClick={() => {
                            if (mode_pos) {
                                setIndex(i)
                                onOpenKeypay()
                            }
                        }} cursor={'pointer'} value={c.value} isDisabled={!c.active} step={0.1} onChange={t => {
                            if (!mode_pos) {
                                let temp_payment_currency = JSON.parse(JSON.stringify(payment_currency)) as Array<{
                                    symbol: string,
                                    active: boolean,
                                    value: number
                                }>
                                temp_payment_currency[i].value = parseFloat(t)
                                save_payment_currency(temp_payment_currency)
                            }
                        }} errorBorderColor={'red.400'} isInvalid={get_total_usd() != sum() ? true : false}>
                            <NumberInputField fontSize={"16px"}></NumberInputField>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {/* <Text>{parseFloat((payment_currency[i].value / coins[i].value_change).toFixed(2))}</Text> */}
                    </Stack>
                ))}
            </Flex>
        </Stack>

    )
}