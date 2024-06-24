import { BarFilter } from "@/frontend/core/components/BarFilter"
import ExportableTableContainer from "@/frontend/core/components/ExportableTableContainer"
import { Loading } from "@/frontend/core/components/Loading"
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useState } from "react"

const RoleCreate = () => {
    const [view_dashboard, setViewDashboard] = useState(true)
    const [perms_dashboard, setPermsDashboard] = useState({
        view_profits: true,
        view_fixed_costs: true,
        view_import_amount: true,
        view_investment: true,
        view_sponser_earnings: true,
        view_seller_earnings: true,
        view_product_quantity: true,
        view_total_sponsers: true,
        view_total_sellers: true,
        view_earnings_by_sponsers: true,
        view_earnings_by_sellers: true,
        view_investments_by_day: true,
        view_earnings_by_day: true
    })

    const [view_inventory, setViewInventory] = useState(true)
    const [perms_inventory, setPermsInventory] = useState({
        list_inventory: true,
        show_store_inventory: true,
        view_history: true,
        transfer_goods_to_stores: true,
        edit_product_in_stock: true,
    })

    const [view_transit, setViewTransit] = useState(true)
    const [perms_transit, setPermsTransit] = useState({
        add_new_goods_in_transit: true,
        add_goods_in_transit: true,
        remove_goods_in_transit: true,
        edit_goods_in_transit: true,
        list_debts: true,
        add_new_debt: true,
        remove_debt: true,
        edit_debt: true
    })

    const [view_orders, setViewOrders] = useState(true)
    const [perms_orders, setPermsOrders] = useState({
        list_orders: true,
        add_order: true,
        remove_order: true,
        edit_order: true,
        list_address: true,
        add_address: true,
        remove_address: true,
        edit_address: true
    })

    const MapPerms = (perm: string) => {
        switch (perm) {
            //dashboard
            case "view_profits": return "Ver Ganancias"
            case "view_fixed_costs": return "Ver Gastos Fijos"
            case "view_import_amount": return "Ver Importe"
            case "view_investment": return "Ver Inversión"
            case "view_sponser_earnings": return "ver ganancias de promotores"
            case "view_seller_earnings": return "ver ganancias de vendedores"
            case "view_product_quantity": return "ver cantidad de productos"
            case "view_total_sponsers": return "ver total de promotores"
            case "view_total_sellers": return "ver total de vendedores"
            case "view_earnings_by_sponsers": return "ver ganancias por promotores"
            case "view_earnings_by_sellers": return "ver ganancias por vendedores"
            case "view_investments_by_day": return "ver inversiones por días"
            case "view_earnings_by_day": return "ver ganancias por días"
            //inventory
            case "list_inventory": return "listar inventario"
            case "show_store_inventory": return "mostrar inventario de tiendas"
            case "view_history": return "Visualizar historial"
            case "transfer_goods_to_stores": return "Hacer traslado de mercancía a tiendas"
            case "edit_product_in_stock": return "Editar producto en stock"
            //transit
            case "add_new_goods_in_transit": return "agregar nueva mercancía en tránsito"
            case "add_goods_in_transit": return "agregar mercancía en tránsito"
            case "remove_goods_in_transit": return "eliminar mercancía en tránsito"
            case "edit_goods_in_transit": return "editar mercancía en tránsito"
            case "list_debts": return "listar deudas"
            case "list_debts": return "listar deudas"
            case "add_new_debt": return "agregar nueva deuda"
            case "remove_debt": return "eliminar deuda"
            case "edit_debt": return "editar deuda"
            //orders
            case "list_orders": return "listar órdenes"
            case "add_order": return "agregar órden"
            case "remove_order": return "eliminar órden"
            case "edit_order": return "editar órden"
            case "list_address": return "listar domicilio"
            case "add_address": return "agregar domicilio"
            case "remove_address": return "eliminar domicilio"
            case "edit_address": return "editar domicilio"

            default: return "-"
        }
    }

    return (
        <Box>
            <Loading isLoading={false} />

            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/roles'
                    },
                    {
                        label: 'Roles',
                        icon: undefined,
                        link: '/nomenclators/roles'
                    },
                    {
                        label: 'Agregar',
                        icon: undefined,
                        link: '/nomenclators/roles/create'
                    },
                ]}
            ></BarFilter>
            {/* Fin */}

            <ExportableTableContainer title={"Agregar"}>
                <Flex>
                    <FormControl>
                        <FormLabel><Box as="span" color={"red"}>*</Box> Nombre del Rol</FormLabel>
                        <Input type="text" placeholder="Finanzas" />
                    </FormControl>
                    <FormControl justifyContent={'end'} alignItems={'center'} display={'flex'}>
                        <Button color={'white'} size={'md'}>Guardar Rol</Button>
                    </FormControl>
                </Flex>
                <Flex mt={'25px'}>
                    <Flex flex={1} flexDir={'column'} gap={2}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_dashboard}>Dashboard</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_dashboard).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_dashboard} isChecked={perms_dashboard[k as "view_profits"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Flex>
                    <Box flex={1}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_inventory}>Inventario</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_inventory).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_inventory} isChecked={perms_inventory[k as "list_inventory"] as boolean} colorScheme="cyan" key={`inventory${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Box>
                    <Box flex={1}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_transit}>Tránsito</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_transit).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_transit} isChecked={perms_transit[k as "list_debts"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Box>
                    <Box flex={1}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_orders}>Órdenes</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_orders).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_orders} isChecked={perms_orders[k as "list_debts"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Box>
                </Flex>
                <Flex mt={'25px'}>
                    <Flex flex={1} flexDir={'column'} gap={2}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_dashboard}>Finanzas</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_dashboard).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_dashboard} isChecked={perms_dashboard[k as "view_profits"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex flex={1} flexDir={'column'} gap={2}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_dashboard}>Venta</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_dashboard).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_dashboard} isChecked={perms_dashboard[k as "view_profits"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Flex>
                    <Flex flex={1} flexDir={'column'} gap={2}>
                        <Checkbox defaultChecked colorScheme="cyan" isChecked={view_dashboard}>Caja</Checkbox>
                        <Flex flexDir={'column'} gap={2} ml={'25px'}>
                            {Object.keys(perms_dashboard).map((k, i) => (
                                <Checkbox textTransform={'capitalize'} isDisabled={!view_dashboard} isChecked={perms_dashboard[k as "view_profits"] as boolean} colorScheme="cyan" key={`dashboard${i}`}>{MapPerms(k)}</Checkbox>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </ExportableTableContainer>
        </Box>
    )
}

export default RoleCreate
