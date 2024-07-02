import React, { useEffect, useRef, useState } from "react";
import { Flex, Box, Select, Button, Text, useToast, useDisclosure } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import TabGroup from "@/frontend/core/components/TabGroup";
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";
import SellingHistoryTable from "./components/SellingHistoryTable";
import BarCode from "@/frontend/core/icons/BarCode";
import { Stock } from "./components/Stock";
import { CardAccount, Coin, ConfigurationType, InventaryType, OfferRule, PaymentRule, Shop } from "@/backend/types";
import { get_shops } from "@/helper/requests/Shop";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { useSession } from "next-auth/react";
import { get_coin } from "@/helper/requests/Coin";
import { Loading } from "@/frontend/core/components/Loading";
import { get_configuration } from "@/helper/requests/Configuration";
import { InvoiceType } from "./type";
import { get_cardaccount } from "@/helper/requests/CardAccount";
import NumericKeypadDialog from "./dialogs/NumericKeypadDialog";

export default function SalesScreen() {
  const tabs = ["Stock", "Historial"];
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { data: session } = useSession()
  const [shop_select, setShopSelect] = useState(session?.user.shop.id as number)
  const businesses = useGetBussiness()
  const toast = useToast()

  const [loading, setLoading] = useState(true)
  const [shops, setShops] = useState([] as Array<Shop>)
  const [coins, setCoins] = useState([] as Array<Coin>)
  const [offers_rules, setOffersRules] = useState([] as Array<OfferRule>)
  const [apply_rules_ofers, setApplyRulesOfers] = useState(true as boolean)
  const [payment_rule, setPaymentRules] = useState({} as PaymentRule)
  const [apply_payment_results, setApplyPaymentResults] = useState(true as boolean)
  const [cards_account, setCardsAccount] = useState([] as Array<CardAccount>)
  const [currency_payment_to_workers_id, set_currency_payment_to_workers_id] = useState(0)

  // Carga las tiendas
  const onLoadShop = (callback: () => void) => {
    const filter = {
      "$Businesses.id$": businesses?.id,
    }
    get_shops({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        let shops = data.data as Array<Shop>
        shops = shops.filter(t => t.name != "Almacen")
        setShops(shops)
        const shopid_user = session?.user.shop.id as number
        setShopSelect(shops.find(t => t.id == shopid_user) ? shopid_user : shops[0].id)
        callback()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las tiendas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
    })
  }

  // Carga las monedas
  const onLoadCoins = (callback: () => void) => {
    const filter = {
      "businessId": businesses?.id,
    }
    get_coin({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        let coins = data.data as Array<Coin>
        setCoins(coins)
        callback()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las monedas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
    })
  }

  // Carga la configuracion, las reglas etc...
  const onLoadConfiguration = (callback: () => void) => {
    const filter = {
      "businessId": businesses?.id,
    }
    get_configuration({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        let config = data.data[0] as ConfigurationType
        //console.log(config)
        setOffersRules(config.offers_rules)
        setApplyRulesOfers(config.apply_rules_ofers)
        setPaymentRules(config.paymentrule)
        setApplyPaymentResults(config.apply_payment_results)
        set_currency_payment_to_workers_id(config.currency_payment_to_workers_id)
        //console.log(config)
        callback()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las monedas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
    })
  }

  // Carga la tarjetas
  const onLoadCards = (callback: () => void) => {
    const filter = {
      "businessId": businesses?.id,
    }
    get_cardaccount({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
      if (status == 200) {
        let cards = data.data as Array<CardAccount>
        setCardsAccount(cards)
        callback()
      }
      else {
        console.log("error", status, data)
        toast({
          description: "Ah ocurrido un error al intentar cargar las tarjetas",
          status: 'error',
          duration: 9000,
          isClosable: true,
          variant: "error"
        })
      }
    })
  }

  // Carga todos los valores que hacen falta
  const onLoadAll = () => {
    setLoading(true)
    onLoadShop(() => {
      onLoadCoins(() => {
        onLoadConfiguration(() => {
          onLoadCards(() => {
            setLoading(false)
          })
        })
      })
    })
  }

  useEffect(() => {
    onLoadAll()
  }, [])

  const [invoice_products, setInvoiceProducts] = useState({
    products: [],
    payment_currency: coins.map(t => {
      return {
        coin: coins[0],
        amount: 0
      }
    }),
    payment_method: "effective",
    card_payment: []
  } as InvoiceType)

  const onAddProductOnCar = (inventary: InventaryType) => {
    let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
    temp.products.push({
      inventary,
      unit: 1,
      stock: inventary.product.count_unit,
      prices: coins.toReversed().map(t => {
        return inventary.valuecoin.value * t.value_change
      }),
      disconts: coins.map(t => {
        return inventary.valuecoin.value * t.value_change
      }),
      payment: 0,
    })
    setInvoiceProducts(temp)
  }

  const onDeleteProductOnCar = (inventary: InventaryType) => {
    let temp = JSON.parse(JSON.stringify(invoice_products)) as InvoiceType
    const index = temp.products.findIndex(t => t.inventary.id == inventary.id)
    temp.products.splice(index, 1)
    setInvoiceProducts(temp)
  }

  const onUpdateProductOnCar = (invoice: InvoiceType) => {
    setInvoiceProducts(invoice)
  }

  const [mode_pos, set_mode_pos] = useState(false)
  const ref_mode_pos = useRef(false)
  useEffect(()=>{
    ref_mode_pos.current = mode_pos
  }, [mode_pos])
  const onModePOS = () => {
    try {
      (window as any).electron.toggleFrame();
      set_mode_pos(!ref_mode_pos.current)
    }
    catch {
      toast({
        description: "Solo puede ejecutarse el modo POS cuando esta compilado en electron la aplicacion",
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: "error"
      })
    }
  }

  // Para detectar cuando se presiona esc
  useEffect(() => {
    const handleInputKeyboard = (evento: any) => {
      if (evento.key == "Escape") {
        onModePOS()
      }
    }
    window.addEventListener('keydown', handleInputKeyboard);
    return () => {
      window.removeEventListener('keydown', handleInputKeyboard);
    }
  }, []);

  return (
    <Box>

      <Loading isLoading={loading} />

      {/* Barra de Filteros */}
      {!mode_pos && (
        <BarFilter
          breadcrumb={[
            {
              label: `Finanzas`,
              icon: undefined,
              link: "/finanzas",
            },
            {
              label: tabs[activeTabIndex],
              icon: undefined,
              link: "/finanzas",
            },
          ]}
        >
          <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
          <Select
            fontSize={"13px"}
            colorScheme="cyan"
            maxWidth={"210px"}
            backgroundColor={"white"}
            value={shop_select}
            onChange={t => {
              setShopSelect(parseInt(t.target.value))
            }}
          >
            {shops.map((s, i) => (
              <option key={i} value={s.id}>{s.name}</option>
            ))}
          </Select>
          {activeTabIndex === 1 && <DateRangeSelector />}
          <Button color={"white"} colorScheme="cyan" onClick={onModePOS}>
            <Flex paddingX={"40px"} gap={"10px"} alignItems={'center'}>
              <BarCode />
              <Text>MODO POS</Text>
            </Flex>
          </Button>
        </BarFilter>
      )}
      {/* FIN */}

      {activeTabIndex === 0 && (
        <Stock
          mode_pos={mode_pos}
          shop_select={shop_select}
          invoice_products={invoice_products}
          coins={coins}
          apply_rules_ofers={apply_rules_ofers}
          offers_rules={offers_rules}
          payment_rule={payment_rule}
          apply_payment_results={apply_payment_results}
          cards_account={cards_account}
          currency_payment_to_workers_id={currency_payment_to_workers_id}
          onAddProductOnCar={onAddProductOnCar}
          onDelete={onDeleteProductOnCar}
          onUpdateProductOnCar={onUpdateProductOnCar}
        />
      )}
      {activeTabIndex === 1 && (
        <SellingHistoryTable />
      )}
    </Box>
  );
}
