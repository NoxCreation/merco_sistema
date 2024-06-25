import { Rol } from "@/backend/types"
import { BarFilter } from "@/frontend/core/components/BarFilter"
import ExportableTableContainer from "@/frontend/core/components/ExportableTableContainer"
import { Loading } from "@/frontend/core/components/Loading"
import { useGetBussiness } from "@/helper/hooks/useGetBussiness"
import { create_edit_rol, get_rol } from "@/helper/requests/Rol"
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface Props {
    role?: Rol
}

const RoleEdit = ({ role }: Props) => {
    const toast = useToast()
    const router = useRouter()
    const { id } = router.query
    const [loading, setLoading] = useState(true)

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

    const [view_finance, setViewFinance] = useState(true)
    const [perms_finance, setPermsFinance] = useState({
        list_balances: true,
        view_balance_details: true,
        view_worker_details: true,
        list_daily_closures: true,
        perform_daily_closure: true
    })

    const [view_sales, setViewSales] = useState(true)
    const [perms_sales, setPermsSales] = useState({
        create_invoices: true,
        view_history: true
    })

    const [view_box, setViewBox] = useState(true)
    const [perms_box, setPermsBox] = useState({
        view_box: true
    })

    const [name, setName] = useState("")

    const businesses = useGetBussiness()

    const isValid = () => {
        let valid = true
        if (
            name == ""
        ) {
            valid = false
        }

        return valid
    }

    const onCreateEdit = async () => {
        const action = 'edit'
        if (isValid()) {
            const data = {
                name,
                view_dashboard,
                perms_dashboard: JSON.stringify(perms_dashboard),
                view_inventory,
                perms_inventory: JSON.stringify(perms_inventory),
                view_transit,
                perms_transit: JSON.stringify(perms_transit),
                view_orders,
                perms_orders: JSON.stringify(perms_orders),
                view_finance,
                perms_finance: JSON.stringify(perms_finance),
                view_sales,
                perms_sales: JSON.stringify(perms_sales),
                view_box,
                perms_box: JSON.stringify(perms_box),
                businessId: businesses?.id
            }
            setLoading(true)
            await create_edit_rol(action, parseInt(id as string), data, (status: number, data: any) => {
                if (status == 200 && (data[0] == undefined || data[0] == 1)) {
                    router.push("/nomenclators/roles")
                }
                else {
                    console.log("error", status, data)
                    toast({
                        description: "Ocurrió un error al editar/crear. Revise tenga creado y elegido al menos una unidad y una categoría.",
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                        variant: "error"
                    })
                }
                setLoading(false)
            })
        }
        else {
            toast({
                description: "Hay campos sin llenar o con valores no válidos.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                variant: "error"
            })
        }

    }

    useEffect(() => {
        if (id) {
            const filter = {
                businessId: businesses?.id,
                id
            }
            setLoading(true)
            get_rol({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
                const _data = data.data[0] as Rol
                setName(_data.name)
                setViewDashboard(_data.view_dashboard)
                setPermsDashboard(JSON.parse(_data.perms_dashboard))
                setViewInventory(_data.view_inventory)
                setPermsInventory(JSON.parse(_data.perms_inventory))
                setViewTransit(_data.view_transit)
                setPermsTransit(JSON.parse(_data.perms_transit))
                setViewOrders(_data.view_orders)
                setPermsOrders(JSON.parse(_data.perms_orders))
                setViewFinance(_data.view_finance)
                setPermsFinance(JSON.parse(_data.perms_finance))
                setViewSales(_data.view_sales)
                setPermsSales(JSON.parse(_data.perms_sales))
                setViewBox(_data.view_box)
                setPermsBox(JSON.parse(_data.perms_box))
                setLoading(false)
            })
        }
    }, [id])

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
                        label: 'Editar',
                        icon: undefined,
                        link: '/nomenclators/roles/edit'
                    },
                ]}
            ></BarFilter>
            {/* Fin */}

            <ExportableTableContainer title={"Editar"}>
                <Flex>
                    <FormControl>
                        <FormLabel><Box as="span" color={"red"}>*</Box> Nombre del Rol</FormLabel>
                        <Input type="text" placeholder="Finanzas" value={name} onChange={t => setName(t.target.value)} />
                    </FormControl>
                    <FormControl justifyContent={'end'} alignItems={'center'} display={'flex'}>
                        <Button color={'white'} size={'md'} onClick={onCreateEdit}>Guardar Rol</Button>
                    </FormControl>
                </Flex>
                <Flex mt={'25px'}>
                    <PermissionColumn
                        column_name={"Dashboard"}
                        view={view_dashboard}
                        perms={perms_dashboard}
                        setView={setViewDashboard}
                        setPerms={setPermsDashboard}
                    />
                    <PermissionColumn
                        column_name={"Inventario"}
                        view={view_inventory}
                        perms={perms_inventory}
                        setView={setViewInventory}
                        setPerms={setPermsInventory}
                    />
                    <PermissionColumn
                        column_name={"Tránsito"}
                        view={view_transit}
                        perms={perms_transit}
                        setView={setViewTransit}
                        setPerms={setPermsTransit}
                    />
                    <PermissionColumn
                        column_name={"Órdenes"}
                        view={view_orders}
                        perms={perms_orders}
                        setView={setViewOrders}
                        setPerms={setPermsOrders}
                    />
                </Flex>
                <Flex mt={'25px'}>
                    <PermissionColumn
                        column_name={"Finanzas"}
                        view={view_finance}
                        perms={perms_finance}
                        setView={setViewFinance}
                        setPerms={setPermsFinance}
                    />
                    <PermissionColumn
                        column_name={"Venta"}
                        view={view_sales}
                        perms={perms_sales}
                        setView={setViewSales}
                        setPerms={setPermsSales}
                    />
                    <PermissionColumn
                        column_name={"Caja"}
                        view={view_box}
                        perms={perms_box}
                        setView={setViewBox}
                        setPerms={setPermsBox}
                    />
                    <Flex flex={1} flexDir={'column'} gap={2}></Flex>
                </Flex>
            </ExportableTableContainer>
        </Box>
    )
}

const PermissionColumn = ({
    column_name,
    view,
    perms,
    setView,
    setPerms
}: {
    column_name: string,
    view: boolean,
    perms: any,
    setView: (v: boolean) => void,
    setPerms: (v: any) => void
}) => {

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
            //Finanzas
            case "list_balances": return "listar balances"
            case "view_balance_details": return "ver detalles de balances"
            case "view_worker_details": return "ver detalles de un trabajador"
            case "list_daily_closures": return "listar cierres diarios"
            case "perform_daily_closure": return "realizar cierre diario"
            //sales
            case "create_invoices": return "crear facturas"
            case "view_history": return "ver el historial"
            //Box
            case "view_box": return "ver la caja"

            // por defecto
            default: return "-"
        }
    }

    return (
        <Flex flex={1} flexDir={'column'} gap={2}>
            <Checkbox defaultChecked colorScheme="cyan" isChecked={view} onChange={t => setView(t.target.checked)}>{column_name}</Checkbox>
            <Flex flexDir={'column'} gap={2} ml={'25px'}>
                {Object.keys(perms).map((k, i) => (
                    <Checkbox
                        textTransform={'capitalize'}
                        isDisabled={!view}
                        isChecked={perms[k as "view_profits"] as boolean}
                        colorScheme="cyan"
                        key={`dashboard${i}`}
                        onChange={t => {
                            let temp = JSON.parse(JSON.stringify(perms))
                            temp[k] = t.target.checked
                            setPerms(temp)
                        }}
                    >{MapPerms(k)}</Checkbox>
                ))}
            </Flex>
        </Flex>
    )
}

export default RoleEdit
