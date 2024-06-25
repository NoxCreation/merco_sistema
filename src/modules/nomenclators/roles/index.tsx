import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    useDisclosure,
    useToast,
    Text,
    Badge,
    Flex
} from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { Rol } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_rol, remove_rol } from "@/helper/requests/Rol";
import swal from 'sweetalert';
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import { ColumnDef } from "@tanstack/react-table";
import CRUDActionsButtonGroup from "@/frontend/core/components/CRUD/CRUDActionsButtonGroup";
import CRUDTable from "@/frontend/core/components/CRUD/CRUDTable";
import { Loading } from "@/frontend/core/components/Loading";
import { useRouter } from "next/router";

export default function NomenclatorsRolesScreen() {
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        count: 10
    } as {
        page: number,
        pageSize: number,
        count: number
    })
    const [items, setItems] = useState([] as Array<Rol>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<Rol>)
    const businesses = useGetBussiness()
    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        onLoad(pagination.page, pagination.pageSize)
    }, []);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            businessId: businesses?.id,
            ...new_filter
        }
        await get_rol({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
            if (status == 200) {
                setItems(data.data)
                let temp = JSON.parse(JSON.stringify(pagination))
                temp.count = data.count
                temp.page = data.page
                setPagination(temp)
            }
            else {
                console.log("error", status, data)
                toast({
                    description: "Ah ocurrido un error al intentar cargar los productos",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    variant: "error"
                })
            }
            setLoading(false)
        })
    }

    const onRemove = async (rol: Rol) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_rol(rol.id, (status: number, data: any) => {
                        if (status == 200 && data == 1) {
                            onLoad(pagination.page, pagination.pageSize)
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
                    })
                }
            });
    }

    const onMultipleRemove = async () => {
        if (itemsSelects.length > 0)
            swal({
                title: "¿Está seguro?",
                text: "Si elimina los registros seleccionados no podrá recuperarlos, ¿está seguro de querer continuar?",
                icon: "warning",
                buttons: ["Cancelar", "Eliminar"],
                dangerMode: true,
            })
                .then(async (willDelete) => {
                    if (willDelete) {
                        let flag = false
                        for (let i = 0; i < itemsSelects.length; i++) {
                            const rol = itemsSelects[i]
                            if (rol.canRemove)
                                remove_rol(rol.id, (status: number, data: any) => {
                                    onLoad(pagination.page, pagination.pageSize)
                                    if (data != 1 || status != 200) {
                                        console.log("error", status, data)
                                        flag = true
                                    }
                                })
                        }
                        if (flag)
                            toast({
                                description: "Al menos un elemento no pudo ser eliminado.",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                                variant: "error"
                            })
                        else
                            swal("¡Se ha eliminado satisfactoriamente!", {
                                icon: "success",
                            });
                    }
                });
    }

    const onEdit = (rol: Rol) => {
        router.push(`/nomenclators/roles/edit?id=${rol.id}`)
    }

    const onFind = (column: string, value: string) => {
        let temp = JSON.parse(JSON.stringify(pagination))
        temp.page = 1
        setPagination(temp)
        if (value != "") {
            if (column == "categoryId") {
                onLoad(1, pagination.pageSize, {
                    relations: {
                        category: {
                            name: {
                                LIKE: value
                            }
                        }
                    }
                })
            }
            else
                onLoad(1, pagination.pageSize, {
                    [column]: {
                        LIKE: value
                    }
                })
        }
        else
            onLoad(1, pagination.pageSize)
    }

    const BadgeColor = ({ view, perms, all_perms, name }: { view: boolean, perms: number, all_perms: number, name: string }) => {
        return (
            <>
                {(view == false || perms == 0) ? <Badge variant='solid' colorScheme='red'>{name}</Badge> :
                    (all_perms == perms ?
                        <Badge variant='solid' colorScheme='green'>{name}</Badge> :
                        <Badge variant='solid' colorScheme='yellow'>{name}</Badge>
                    )
                }
            </>
        )
    }

    const onDownloadExcel = () => {
        let columns = {
            "id": "Id",
            "name": "name",
        };
        let row = MapData(itemsSelects.length > 0 ? itemsSelects : items, columns)
        download_excel(columns, row)
    }

    const columns: ColumnDef<Rol>[] = [
        {
            header: ({ table }) => (
                <Checkbox
                    size={'sm'}
                    colorScheme="cyan"
                    isChecked={table.getIsAllRowsSelected()}
                    isIndeterminate={table.getIsSomeRowsSelected()}
                    onChange={(event) => {
                        table.toggleAllRowsSelected(event.target.checked);
                    }}
                >
                    <Text fontSize={'12px'}>Id</Text>
                </Checkbox>
            ),
            accessorKey: "id",
            /* id: "id", */
            cell: ({ row, getValue, cell }) => {
                const canRemove = cell.row.original.canRemove
                if (canRemove)
                    return (
                        <Checkbox
                            size={'sm'}
                            colorScheme="cyan"
                            type="checkbox"
                            isChecked={row.getIsSelected()}
                            onChange={(event) => row.toggleSelected(event.target.checked)}
                            fontSize={'0.75rem'}
                        >
                            {getValue<string>()}
                        </Checkbox>
                    )
                else
                    return (
                        <>
                            {getValue<string>()}
                        </>
                    )
            },
        },
        {
            header: "Nombre",
            accessorKey: "name",
            id: "name"
        },
        {
            header: "Permisos",
            accessorKey: "perms",
            /* id: "value_change" */
            cell: ({ row }) => {
                const perms_dashboard = Object.values(JSON.parse(row.original.perms_dashboard)).filter(t => t === true).length
                const total_dashboard = row.original.view_dashboard ? perms_dashboard : 0
                const perms_inventory = Object.values(JSON.parse(row.original.perms_inventory)).filter(t => t === true).length
                const total_inventory = row.original.view_inventory ? perms_inventory : 0
                const perms_transit = Object.values(JSON.parse(row.original.perms_transit)).filter(t => t === true).length
                const total_transit = row.original.view_transit ? perms_transit : 0
                const perms_orders = Object.values(JSON.parse(row.original.perms_orders)).filter(t => t === true).length
                const total_orders = row.original.view_orders ? perms_orders : 0
                const perms_finance = Object.values(JSON.parse(row.original.perms_finance)).filter(t => t === true).length
                const total_finance = row.original.view_finance ? perms_finance : 0
                const perms_sales = Object.values(JSON.parse(row.original.perms_sales)).filter(t => t === true).length
                const total_sales = row.original.view_sales ? perms_sales : 0
                const perms_box = Object.values(JSON.parse(row.original.perms_box)).filter(t => t === true).length
                const total_box = row.original.view_box ? perms_box : 0
                return <>{total_dashboard + total_inventory + total_transit + total_orders + total_finance + total_sales + total_box} permisos</>
            }
        },
        {
            header: "Modulos",
            accessorKey: "modules",
            /* id: "value_change" */
            cell: ({ row }) => {
                const view_dashboard = row.original.view_dashboard
                const all_perms_dashboard = Object.values(JSON.parse(row.original.perms_dashboard)).length
                const perms_dashboard = Object.values(JSON.parse(row.original.perms_dashboard)).filter(t => t === true).length

                const view_inventory = row.original.view_inventory
                const all_perms_inventory = Object.values(JSON.parse(row.original.perms_inventory)).length
                const perms_inventory = Object.values(JSON.parse(row.original.perms_inventory)).filter(t => t === true).length

                const view_transit = row.original.view_transit
                const all_perms_transit = Object.values(JSON.parse(row.original.perms_transit)).length
                const perms_transit = Object.values(JSON.parse(row.original.perms_transit)).filter(t => t === true).length

                const view_orders = row.original.view_orders
                const all_perms_orders = Object.values(JSON.parse(row.original.perms_orders)).length
                const perms_orders = Object.values(JSON.parse(row.original.perms_orders)).filter(t => t === true).length

                const view_finance = row.original.view_finance
                const all_perms_finance = Object.values(JSON.parse(row.original.perms_finance)).length
                const perms_finance = Object.values(JSON.parse(row.original.perms_finance)).filter(t => t === true).length

                const view_sales = row.original.view_sales
                const all_perms_sales = Object.values(JSON.parse(row.original.perms_sales)).length
                const perms_sales = Object.values(JSON.parse(row.original.perms_sales)).filter(t => t === true).length

                const view_box = row.original.view_box
                const all_perms_box = Object.values(JSON.parse(row.original.perms_box)).length
                const perms_box = Object.values(JSON.parse(row.original.perms_box)).filter(t => t === true).length
                return (
                    <Flex gap={2} wrap={"wrap"}>
                        <BadgeColor view={view_dashboard} perms={perms_dashboard} all_perms={all_perms_dashboard} name="dashboard" />
                        <BadgeColor view={view_inventory} perms={perms_inventory} all_perms={all_perms_inventory} name="inventario" />
                        <BadgeColor view={view_transit} perms={perms_transit} all_perms={all_perms_transit} name="tránsito" />
                        <BadgeColor view={view_orders} perms={perms_orders} all_perms={all_perms_orders} name="órdenes" />
                        <BadgeColor view={view_finance} perms={perms_finance} all_perms={all_perms_finance} name="finanzas" />
                        <BadgeColor view={view_sales} perms={perms_sales} all_perms={all_perms_sales} name="ventas" />
                        <BadgeColor view={view_box} perms={perms_box} all_perms={all_perms_box} name="caja" />
                    </Flex>
                )
            }
        },
        {
            id: "actions",
            cell: (props) => {
                const canRemove = props.cell.row.original.canRemove
                if (canRemove)
                    return (
                        <CRUDActionsButtonGroup inTable onCreateEdit={() => {
                            onEdit(items[props.row.index])
                        }} onRemove={() => {
                            onRemove(items[props.row.index])
                        }} />
                    )
            }
        },
    ];

    return (
        <Box>
            <Loading isLoading={loading} />

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
                ]}
            >
                <CRUDActionsButtonGroup
                    onCreateEdit={() => {
                        router.push("/nomenclators/roles/create")
                    }}
                    onRemove={() => {
                        onMultipleRemove()
                    }}
                    column_find="name"
                    onFind={onFind}
                />
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onSelectItems={(products: Array<Rol>) => {
                    setItemsSelects(products)
                }}
                onFilter={onLoad}
                title={"Monedas"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}
