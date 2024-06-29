import { Box, Flex } from "@chakra-ui/react"
import ProductGrid from "./ProductGrid"
import InvoicePanel from "./InvoicePanel"
import { CardAccount, Coin, InventaryType, OfferRule, PaymentRule } from "@/backend/types"
import { InvoiceType } from "../type"

interface Props {
    onAddProductOnCar: (inventary: InventaryType) => void
    onDelete: (inventary: InventaryType) => void
    onUpdateProductOnCar: (invoice: InvoiceType) => void
    shop_select: number
    invoice_products: InvoiceType
    coins: Array<Coin>
    offers_rules: Array<OfferRule>
    payment_rule: PaymentRule
    cards_account: Array<CardAccount>
    currency_payment_to_workers_id: number
}

export const Stock = ({
    onAddProductOnCar,
    onDelete,
    onUpdateProductOnCar,
    shop_select,
    invoice_products,
    coins,
    offers_rules,
    cards_account,
    payment_rule,
    currency_payment_to_workers_id
}: Props) => {
    return (
        <Flex gap={"15px"}>
            <ProductGrid
                onAddProductOnCar={onAddProductOnCar}
                shop_select={shop_select}
                invoice_products={invoice_products}
            />
            <Box w={'400px'} position={"relative"}>
                <InvoicePanel
                    onDelete={onDelete}
                    invoice_products={invoice_products}
                    coins={coins}
                    offers_rules={offers_rules}
                    payment_rule={payment_rule}
                    cards_account={cards_account}
                    onUpdateProductOnCar={onUpdateProductOnCar}
                    currency_payment_to_workers_id={currency_payment_to_workers_id}
                />
            </Box>
        </Flex>
    )
}