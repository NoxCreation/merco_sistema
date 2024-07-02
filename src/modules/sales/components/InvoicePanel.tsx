import GenericContainer from "@/frontend/core/components/GenericContainer";
import {
  Stack,
  Text,
  Divider,
  Button,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useId, useRef, useState } from "react";
import InvoiceProductItem from "./InvoiceProductItem";
import { InvoiceType } from "../type";
import { CardAccount, Coin, InventaryType, OfferRule, PaymentRule } from "@/backend/types";
import { ItemCurrencyPayment } from "./ItemCurrencyPayment";
import { ItemProfitSeller } from "./ItemProfitSeller";
import { ItemTotalPayable } from "./ItemTotalPayable";
import { ItemMethodPayment } from "./ItemMethodPayment";
import NumericKeypadDialog from "../dialogs/NumericKeypadDialog";

interface Props {
  onDelete: (inventary: InventaryType) => void
  onUpdateProductOnCar: (invoice: InvoiceType) => void
  mode_pos: boolean
  invoice_products: InvoiceType
  coins: Array<Coin>
  apply_rules_ofers: boolean
  offers_rules: Array<OfferRule>
  cards_account: Array<CardAccount>
  payment_rule: PaymentRule
  apply_payment_results: boolean
  currency_payment_to_workers_id: number
}

export default function InvoicePanel({
  mode_pos,
  invoice_products,
  coins,
  apply_rules_ofers,
  offers_rules,
  apply_payment_results,
  payment_rule,
  cards_account,
  currency_payment_to_workers_id,
  onDelete,
  onUpdateProductOnCar
}: Props) {
  const [total_payable, set_total_payable] = useState([] as Array<number>)
  const [disconts, set_disconts] = useState([] as Array<number>)
  const [payment_cup, set_payment_cup] = useState(0 as number)
  const [payment_currency, set_payment_currency] = useState(coins.map(t => {
    return {
      symbol: t.symbol,
      active: t.symbol == "USD" ? true : false,
      value: 0
    }
  }) as Array<{
    symbol: string,
    active: boolean,
    value: number
  }>)

  useEffect(() => {
    set_payment_currency(coins.map(t => {
      return {
        symbol: t.symbol,
        active: false,
        value: 0
      }
    }))
  }, [coins])

  const save_payment_currency = (__payment_currency?: Array<{
    symbol: string,
    active: boolean,
    value: number
  }>, __invoice_products?: InvoiceType) => {
    const pc = __payment_currency ? __payment_currency : payment_currency
    const ip = __invoice_products ? __invoice_products : invoice_products
    const _payment_currency = pc.filter(t => t.active == true).map(t => {
      return {
        coin: coins.find(e => e.symbol == t.symbol) as Coin,
        amount: t.value
      }
    })
    let temp_invoice_products = JSON.parse(JSON.stringify(ip)) as InvoiceType
    if (JSON.stringify(_payment_currency) != JSON.stringify(ip.payment_currency)) {
      temp_invoice_products.payment_currency = _payment_currency
      onUpdateProductOnCar(temp_invoice_products)
      set_payment_currency(pc)
    }
  }

  // Usado en la comparacion
  const compare = (value1: number, value2: number, comparative: string) => {
    switch (comparative) {
      case ">":
        return value1 > value2
      case "<":
        return value1 > value2
      case ">=":
        return value1 > value2
      case "<=":
        return value1 > value2
    }
    return false
  }

  // Calcula lo que se debe pagar al vendedor
  const employee_payment = (applyOffer: Boolean, valueOffer: number) => {
    const {
      sponser_unit, // Venta Unidad (Promotor)
      seller_unit, // Venta Unidad (Vendedor)
      data_by_quantity_sponser, // Venta Cantidad (Promotor)
      data_by_quantity_seller, // Venta Cantidad (Vendedor)
      data_by_quantity_sponser_fixed_payment, // Venta Pago Fijo Cantidad (Promotor)
      data_by_quantity_seller_fixed_payment // Venta Pago Fijo Cantidad (Vendedor)
    } = payment_rule

    let payments = [] as Array<number>
    invoice_products.products.forEach((prod) => {
      const product = prod.inventary.product
      // 1. Si no aplica a descuento, pues es venta por unidad
      if (!applyOffer) {
        // 1.1 Comprobar que no sea de pago fijo
        // 1.1.1 Si el producto no es de pago fijo (seller_unit)
        if (!product.gain_rate) {
          payments.push((prod.inventary.valuecoin.value * prod.unit) * (seller_unit / 100))
        }
        // 1.1.2 Si el producto es de pago fijo (rate_seller del producto)
        else {
          payments.push(product.rate_seller * prod.unit)
        }
      }
      // 2. Si aplica a descuento, pues es venta por cantidad
      else {
        // 2.1 Comprobar que no sea de pago fijo
        // 2.1.1 Si el producto no es de pago fijo (data_by_quantity_seller)
        if (!product.gain_rate) {
          const total_payment = invoice_products.products.map(t => t.prices[0] /* * t.unit */).reduce((total, currentValue) => total + currentValue, 0)
          data_by_quantity_seller.forEach((offer) => {
            if (compare(total_payment, offer.value, offer.comparative_symbol)) {
              payments.push(parseFloat(((prod.inventary.valuecoin.value * prod.unit) * (offer.percentage / 100)).toFixed(2)))
              return
            }
          })
        }
        // 2.1.2 Si el producto es de pago fijo (data_by_quantity_seller_fixed_payment) Aplica porciento al pago fijo del producto
        else {
          const total_payment = invoice_products.products.map(t => t.prices[0] /* * t.unit */).reduce((total, currentValue) => total + currentValue, 0)
          data_by_quantity_seller_fixed_payment.forEach((offer) => {
            if (compare(total_payment, offer.value, offer.comparative_symbol)) {
              payments.push(parseFloat(((product.rate_seller * prod.unit) * (offer.percentage / 100)).toFixed(2)))
              return
            }
          })
        }
      }
      //console.log("tt", payments)
    })

    return { payments, payment_value: payments.reduce((total, currentValue) => total + currentValue, 0) }

  }

  // Recalcula todo cuando cambian los datos
  useEffect(() => {
    let total = coins.map(t => 0)
    invoice_products.products.forEach((prod) => {
      prod.prices.forEach((price, index) => {
        total[index] += price /* * prod.unit */
      })
    })
    set_total_payable(total)

    let total_disconts = coins.map(t => 0)
    let total_price_usd = total[0]

    let apply_offer = undefined as undefined | OfferRule
    let valueOffer = 0
    if (apply_rules_ofers)
      offers_rules.forEach((offer) => {
        if (compare(total_price_usd, offer.value, offer.comparative_symbol)) {
          apply_offer = offer
          valueOffer = offer.value
          return
        }
      })
    //console.log("aplica descuento de ", valueOffer)

    // Aplica a algun descuento
    if (valueOffer != 0) {
      invoice_products.products.forEach((inventary, index) => {
        let current_discount = [] as Array<number>
        coins.toReversed().forEach((coin, index2) => {
          const coste_usd = inventary.inventary.product.coste_usd
          const price_usd = inventary.inventary.valuecoin.value
          const percent = apply_offer ? apply_offer.percentage / 100 : 0
          let discount = ((price_usd - coste_usd) * percent + coste_usd) * inventary.unit
          if (index2 != 0) {// siempre que no sea el USD
            discount *= coin.value_change
          }
          current_discount[index2] = discount
          total_disconts[index2] += discount
        })
        // Actualizando invoice_products
        let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
        temp.products[index].disconts = current_discount
        if (JSON.stringify(temp) != JSON.stringify(invoice_products))
          onUpdateProductOnCar(temp)
      })
    }
    else {
      invoice_products.products.forEach((inventary, index) => {
        let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
        temp.products[index].disconts = coins.map(t => 0)
        if (JSON.stringify(temp) != JSON.stringify(invoice_products))
          onUpdateProductOnCar(temp)
      })
    }
    set_disconts(total_disconts)

    // Calculando pago del trabajador segun la venta
    let { payment_value: payment_usd, payments } = employee_payment(valueOffer != 0, valueOffer)
    let payment_cup = parseFloat((payment_usd * (coins.find(t => t.id == currency_payment_to_workers_id) as any)?.value_change).toFixed(2))
    set_payment_cup(payment_cup)

    // Actualizando invoice_products
    let temp_invoice_products = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
    temp_invoice_products.products.forEach((prod, index) => {
      temp_invoice_products.products[index].prices = temp_invoice_products.products[index].prices.map((t, i) => (prod.inventary.valuecoin.value * prod.unit) * coins.toReversed()[i].value_change)
      temp_invoice_products.products[index].payment = payments[index]
    })
    if (JSON.stringify(temp_invoice_products) != JSON.stringify(invoice_products))
      onUpdateProductOnCar(temp_invoice_products)

    // Actualizando payment_currency 
    const total_usd = temp_invoice_products.products.length == 0 ? 0 : temp_invoice_products.products.map(t => t.disconts[0] != 0 ? t.disconts[0] : t.prices[0]).reduce((prev, cur) => prev + cur)

    let temp_payment_currency = JSON.parse(JSON.stringify(payment_currency)) as Array<{
      symbol: string,
      active: boolean,
      value: number
    }>
    temp_payment_currency.forEach((pc, index) => {
      if (pc.symbol != "USD") {
        temp_payment_currency[index].active = false
        temp_payment_currency[index].value = total_usd * coins[index].value_change
      }
      else if (pc.symbol == "USD") {
        temp_payment_currency[index].active = true
        temp_payment_currency[index].value = total_usd
      }
    })
    /* if (JSON.stringify(temp_payment_currency) != JSON.stringify(payment_currency))
      save_payment_currency(temp_payment_currency, temp_invoice_products) */
    //set_payment_currency(temp_payment_currency)


  }, [invoice_products])

  // Boton de pagar
  const onPay = () => {
    //console.log(invoice_products)
    const {
      products,
      payment_method,
      payment_currency,
      card_payment
    } = invoice_products
    products.forEach((p, index) => {
      console.log("Producto: " + p.inventary.product.name)
      console.log("Precio Unitario: " + p.inventary.valuecoin.value + " USD")
      console.log("Cantidad en Venta: " + p.unit)
      console.log("Precio Total: " + p.prices[0] + " USD")
      console.log("Descuento: " + (p.disconts[0] != 0 ? (p.prices[0] - p.disconts[0]) : 0) + " USD")
      console.log("Total: " + (p.disconts[0] != 0 ? p.disconts[0] : p.prices[0]) + " USD")
      console.log("Trabajador: " + p.payment + " USD")

      console.log("")
    })

    console.log("----------------------")


    console.log("Va a pagar en estas monedas:")
    payment_currency.forEach(p => {
      console.log("Moneda: " + p.coin.symbol)
      console.log("Monto: " + p.amount)
      if (payment_method == "transfer") {
        const card_found = cards_account.filter(t => card_payment.find(e => e.card_account_id == t.id) && t.coin.symbol == p.coin.symbol)
        console.log(card_found.length != 0 ? `Transferencia a ${card_found[0].code}` : "En efectivo")
      }
      else {
        console.log("En efectivo")
      }
      console.log("")
    })

  }


  const id = useId()
  const {
    isOpen: isOpenKeypay,
    onClose: onCloseKeypay,
    onOpen: onOpenKeypay,
  } = useDisclosure({ id });

  const [_index, setIndex] = useState(0)
  const [max, setMax] = useState(0)
  const [min_stock, setMinStock] = useState(0)
  const [representation, setRepresentation] = useState("unidad")
  const ref = useRef({
    invoice_products,
    _index,
    max,
    min_stock,
    representation
  })
  useEffect(() => {
    ref.current = {
      invoice_products,
      _index,
      max,
      min_stock,
      representation
    }
  }, [invoice_products, _index, max, min_stock, representation])
  let counts = [0, 0]
  const onEnter = (value: string) => {
    if (ref.current.representation == 'unidad') {
      counts = [parseFloat(value) * ref.current.min_stock, parseFloat(value)]
    }
    else if (ref.current.representation == 'medida') {
      counts = [parseFloat(value), parseFloat(value) / ref.current.min_stock]
    }
    let temp = JSON.parse(JSON.stringify(ref.current.invoice_products))
    temp.products[ref.current._index].stock = counts[0]
    temp.products[ref.current._index].unit = counts[1]
    onUpdateProductOnCar(temp)
  }

  return (
    <GenericContainer title="Factura" color={'#2D3748'}>
      <NumericKeypadDialog
        isOpen={isOpenKeypay}
        onClose={onCloseKeypay}
        onEnter={onEnter}
        initValue={invoice_products.products.length ? (representation == 'unidad' ? invoice_products.products[_index].unit : invoice_products.products[_index].stock) : 0}
        max={max}
        isDecimal={representation == 'unidad' ? false : true}
      />

      <Stack >
        {invoice_products.products.length == 0 && (<Text fontSize={'12px'} textAlign={'center'} color={'gray'}>Sin producto seleccionado</Text>)}
        {invoice_products.products.map((product, index) => (
          <InvoiceProductItem
            mode_pos={mode_pos}
            key={index}
            image={`/api/statics${product.inventary.product.image}`}
            currency="USD"
            price={product.inventary.valuecoin.value}
            productName={product.inventary.product.name}
            min_stock={product.inventary.product.count_unit}
            count_max_stock={product.inventary.stock} //80 L
            count_max_unit={product.inventary.stock / product.inventary.product.count_unit} //20 U
            stock={product.stock}
            unit={product.unit}
            symbol_unit={product.inventary.product.unit.symbol}
            onDelete={() => onDelete(product.inventary)}
            onUpdate={(counts: Array<number>) => {
              let temp = JSON.parse(JSON.stringify(invoice_products))
              temp.products[index].stock = counts[0]
              temp.products[index].unit = counts[1]
              onUpdateProductOnCar(temp)
            }}
            onOpenNumericKeypad={(representation: string, max: number, min_stock: number) => {
              setIndex(index)
              setMax(max)
              setMinStock(min_stock)
              setRepresentation(representation)
              onOpenKeypay()
            }}
          />
        ))}
      </Stack>
      <Box height={'100px'} />
      <Divider marginY={"20px"} />
      <ItemTotalPayable
        coins={coins}
        total_payable={total_payable}
        disconts={disconts}
      />
      <Divider marginY={"20px"} />
      <ItemProfitSeller
        payment_cup={payment_cup}
      />
      <Divider marginY={"20px"} />
      <ItemCurrencyPayment
        coins={coins}
        mode_pos={mode_pos}
        invoice_products={invoice_products}
        payment_currency={payment_currency}
        set_payment_currency={set_payment_currency}
        save_payment_currency={save_payment_currency}
      />
      <Divider marginY={"20px"} />
      <ItemMethodPayment
        invoice_products={invoice_products}
        cards_account={cards_account}
        onUpdateProductOnCar={onUpdateProductOnCar}
      />
      <Button
        colorScheme="cyan"
        color={"white"}
        width={"full"}
        marginTop={"20px"}
        onClick={onPay}
      >
        Pagado
      </Button>
    </GenericContainer>
  );
}
