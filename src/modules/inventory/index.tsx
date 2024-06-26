import React, { useEffect, useRef, useState } from "react";
import MerchandiseTransferDialog from "./dialogs/MerchandiseTransferDialog";
import InventoryTable from "./components/InventoryTable";
import { Box, Select, useDisclosure, useToast } from "@chakra-ui/react";
import EditInventoryDialog from "./dialogs/EditInventoryDialog";
import HistoryTable from "./components/HistoryTable";
import { BarFilter } from "../../frontend/core/components/BarFilter";
import TabGroup from "../../frontend/core/components/TabGroup";
import InventoryTopActionsButtonGroup from "./components/InventoryTopActionsButtonGroup";
import swal from 'sweetalert';
import { Coin, InventaryType, Product, Shop } from "@/backend/types";
import { get_shops } from "@/helper/requests/Shop";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import AddProductToInventaryDialog from "./dialogs/AddProductToInventaryDialog";
import { create_edit_inventary, get_inventary, remove_inventary } from "@/helper/requests/Inventary";
import { Loading } from "@/frontend/core/components/Loading";
import { get_coin } from "@/helper/requests/Coin";
import { useSession } from "next-auth/react";

export default function InventoryScreen() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const { data: session } = useSession()
  const tabs = ["Inventario", "Historial"];
  const {
    isOpen: isOpenTransferDialog,
    onOpen: onOpenTransferDialog,
    onClose: onCloseTransferDialog,
  } = useDisclosure();

  const {
    isOpen: isOpenEditDialog,
    onOpen: onOpenEditDialog,
    onClose: onCloseEditDialog,
  } = useDisclosure();

  const {
    isOpen: isOpenAddProductDialog,
    onOpen: onOpenAddProductDialog,
    onClose: onCloseAddProductDialog,
  } = useDisclosure();

  const onTransferProducts = () => {
    onOpenTransferDialog();
  };

  const businesses = useGetBussiness()
  const toast = useToast()
  const [shopSelect, setShopSelect] = useState(session?.user.shop.id as number)
  const shopSelectRef = useRef(shopSelect);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    count: 10
  } as {
    page: number,
    pageSize: number,
    count: number
  })
  const [loading, setLoading] = useState(true)
  const [inventariesSelects, setInventariesSelects] = useState([] as Array<InventaryType>)


  useEffect(() => {
    shopSelectRef.current = shopSelect;
  }, [shopSelect]);

  // Load Shops
  const [shops, setShops] = useState([] as Array<Shop>)
  useEffect(() => {
    if (shops.length == 0) {
      const filter = {
        "$Businesses.id$": businesses?.id,
      }
      get_shops({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
        if (status == 200) {
          setShops(data.data)
          setShopSelect(session?.user.shop.id as number)
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
  }, [])

  // Load Inventary
  const [inventary, setInventary] = useState([] as Array<InventaryType>)
  const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
    const filter = {
      businessId: businesses?.id,
      shopId: shopSelect
    }
    setLoading(true)
    get_inventary({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter: new_filter ? new_filter : filter }, (status: number, data: any) => {
      if (status == 200) {
        setInventary(data.data)
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
      setLoading(false)
    })
  }
  useEffect(() => {
    onLoad()
  }, [pagination, shopSelect])


  const onAddProduct = (product: Product) => {
    const filter = {
      businessId: businesses?.id,
    }
    setLoading(true)
    get_coin({ page: 1, pageSize: 1000, filter }, (status: number, data: any) => {
      if (status == 200) {
        const coins = data.data as Array<Coin>
        const coin_usd_id = coins.find(c => c.canRemove == false)?.id
        const _data = {
          productId: product.id,
          value: product.price_usd,
          coinId: coin_usd_id,
          stock: product.count_unit,
          shopId: shopSelect,
          businessId: businesses?.id
        }
        create_edit_inventary('create', 0, _data, (status: number, data: any) => {
          if (status == 200) {
            onLoad()
          }
          else {
            console.log("error", status, data)
            if (status == 400)
              toast({
                description: data['details'],
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: "error"
              })
            else
              toast({
                description: "Ah ocurrido un error al intentar agregar el producto al stock",
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: "error"
              })
            setLoading(false)
          }
        })
      }
      else {
        setLoading(false)
      }
    })
  }

  const onRemove = (inventary: InventaryType) => {
    swal({
      title: "¿Está seguro?",
      text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          setLoading(true)
          remove_inventary(inventary.id, (status: number, data: any) => {
            if (status == 200 && data == 1) {
              const filter = {
                businessId: businesses?.id,
                shopId: shopSelectRef.current
              }
              onLoad(pagination.page, pagination.pageSize, filter)
              swal("¡Se ha eliminado satisfactoriamente!", {
                icon: "success",
              });
            }
            else {
              console.log("error", status, data)
              toast({
                description: "No se ha podido eliminar el elemento.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: "error"
              })
            }
            setLoading(false)
          })
        }
      });
  }

  return (
    <Box>
      <Loading isLoading={loading} />

      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: "Inventario",
            icon: undefined,
            link: "/inventory",
          },
        ]}
      >
        <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
        <Select
          fontSize={"13px"}
          colorScheme="cyan"
          minWidth={"210px"}
          backgroundColor={"white"}
          value={shopSelect}
          onChange={t => {
            setShopSelect(parseInt(t.target.value))
          }}
        >
          {shops.map((s, i) => (
            <option key={i} value={s.id}>{s.name}</option>
          ))}
        </Select>
        <InventoryTopActionsButtonGroup
          onTransferProducts={onTransferProducts}
          onShowAddProduct={onOpenAddProductDialog}
          showAddButton={(shops.find(t => t.name == "Almacen") as Shop)?.id === shopSelect}
          showTransferButton={(shops.find(t => t.name == "Almacen") as Shop)?.id === shopSelect}
          disabledTransferButton={inventariesSelects.length == 0}
          disabledRemoveButton={inventariesSelects.length == 0}
        />
      </BarFilter>
      {/* Fin */}

      {/* Tabla */}
      {activeTabIndex === 0 ? (
        <InventoryTable
          inventary={inventary}
          pagination={pagination}
          setPagination={setPagination}
          onTransferProducts={onTransferProducts}
          onEdit={onOpenEditDialog}
          onDelete={onRemove}
          onFilter={() => { }}
          onSelectItems={(inventaries: Array<InventaryType>) => {
            setInventariesSelects(inventaries)
          }}
        />
      ) : (<>{/* <HistoryTable /> */}</>

      )}
      {/* Fin */}

      {/* Ventanas modales */}
      <MerchandiseTransferDialog
        isOpen={isOpenTransferDialog}
        onClose={onCloseTransferDialog}
        inventariesSelects={inventariesSelects}
      />
      <EditInventoryDialog
        isOpen={isOpenEditDialog}
        onClose={onCloseEditDialog}
      />
      <AddProductToInventaryDialog
        isOpen={isOpenAddProductDialog}
        onClose={onCloseAddProductDialog}
        onAddProduct={onAddProduct}
      />
      {/* Fin */}
    </Box>
  );
}
