import { Box, Flex } from "@chakra-ui/react"
import ProductGrid from "./ProductGrid"
import InvoicePanel from "./InvoicePanel"
import { CardAccount, Coin, InventaryType, OfferRule, PaymentRule } from "@/backend/types"
import { InvoiceType } from "../type"

interface Props {
    onAddProductOnCar: (inventary: InventaryType) => void
    onDelete: (inventary: InventaryType) => void
    onUpdateProductOnCar: (invoice: InvoiceType) => void
    mode_pos: boolean
    shop_select: number
    invoice_products: InvoiceType
    coins: Array<Coin>
    apply_rules_ofers: boolean
    offers_rules: Array<OfferRule>
    apply_payment_results: boolean
    payment_rule: PaymentRule
    cards_account: Array<CardAccount>
    currency_payment_to_workers_id: number
}

export const Stock = ({
    onAddProductOnCar,
    onDelete,
    onUpdateProductOnCar,
    mode_pos,
    shop_select,
    invoice_products,
    coins,
    apply_rules_ofers,
    offers_rules,
    apply_payment_results,
    cards_account,
    payment_rule,
    currency_payment_to_workers_id
}: Props) => {
    return (
        <Flex gap={"15px"} position={mode_pos ? 'absolute' : 'relative'} w={'100%'} top={0} left={0} p={'20px'} bg={'gray.50'}>
            <ProductGrid
                onAddProductOnCar={onAddProductOnCar}
                shop_select={shop_select}
                invoice_products={invoice_products}
            />
            <Box w={'400px'}
                position={mode_pos ? "fixed" : 'relative'}
                right={0} top={0} h={mode_pos ? '100vh' : 'auto'}
                overflowY={mode_pos ? 'scroll' : 'initial'}
                borderLeft={mode_pos ? '1px solid silver' : 'none'}
                bg={mode_pos ? 'white' : 'transparent'}
            >
                <InvoicePanel
                    mode_pos={mode_pos}
                    onDelete={onDelete}
                    invoice_products={invoice_products}
                    coins={coins}
                    apply_rules_ofers={apply_rules_ofers}
                    offers_rules={offers_rules}
                    apply_payment_results={apply_payment_results}
                    payment_rule={payment_rule}
                    cards_account={cards_account}
                    onUpdateProductOnCar={onUpdateProductOnCar}
                    currency_payment_to_workers_id={currency_payment_to_workers_id}
                />
            </Box>
            {mode_pos && (
                <Box w={'400px'} />
            )}

        </Flex>
    )
}