import React, { useEffect, useState } from "react";
import { Box, Select } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CRUDActionsButtonGroup from "./components/CRUDActionsButtonGroup";
import CRUDTable from "./components/ProductTable";
import { useSession } from "next-auth/react";
import { get_bussiness } from "@/helper/requests/Bussiness";
import { Bussines, Shop } from "@/backend/types/UserType";

export default function NomenclatorsProductsScreen() {
    const { data } = useSession()
    const [listShop, setListShop] = useState([] as Array<Shop>)
    const [shopSelect, setShopSelect] = useState(0 as number)

    useEffect(() => {
        const Load = async () => {
            // obteniendo todas las shops del negocio al que pertence la tienda del usuario autenticado
            const businesses_id = data?.user.shop.businesses[0].id
            await get_bussiness({ page: 1, pageSize: 50, filter: { "id": businesses_id } }, (status: number, data: any) => {
                const shops = (data.data[0] as Bussines).shops
                setListShop(shops)
            })
        }
        Load()
    }, [])

    return (
        <Box>
            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/products'
                    },
                    {
                        label: 'Productos',
                        icon: undefined,
                        link: '/nomenclators/products'
                    },
                ]}
            >

                <Select
                    fontSize={'13px'}
                    colorScheme="cyan"
                    minWidth={"210px"}
                    backgroundColor={"white"}
                    value={shopSelect}
                    onChange={t => setShopSelect(parseInt(t.target.value))}
                >
                    {listShop.map((shop, index) => (
                        <option key={index} value={shop.id}>{shop.name}</option>
                    ))}
                </Select>

                <CRUDActionsButtonGroup
                   
                />
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable 
                 shopSelect={shopSelect}
            />
            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}
