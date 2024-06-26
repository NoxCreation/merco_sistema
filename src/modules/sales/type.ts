import { Coin, InventaryType } from "@/backend/types"

export interface InvoiceType {
    products: Array<{
        inventary: InventaryType
        unit: number
        stock: number
        prices: Array<number>
        disconts: Array<number>,
        payment: number
    }>
    payment_currency: Array<{
        coin: Coin
        amount: number
    }>
    payment_method: string
    card_payment: Array<{
        card_account_id: number,
        enabled: boolean
    }>
}