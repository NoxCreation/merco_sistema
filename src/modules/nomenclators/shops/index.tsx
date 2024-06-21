import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    useDisclosure,
    useToast,
    Text,
    Select
} from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { Bussines, Shop } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import swal from 'sweetalert';
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import { ColumnDef } from "@tanstack/react-table";
import CRUDActionsButtonGroup from "@/frontend/core/components/CRUD/CRUDActionsButtonGroup";
import { Loading } from "@/frontend/core/components/Loading";
import CRUDTable from "@/frontend/core/components/CRUD/CRUDTable";
import { get_shops, remove_shop } from "@/helper/requests/Shop";
import CreateEditShopDialog from "./dialog/CreateEditShopDialog";
import { useRouter } from "next/router";
import { get_bussiness } from "@/helper/requests/Bussiness";

export default function NomenclatorsWorkersScreen() {
    const [action, setAction] = useState("" as string)
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
    const [items, setItems] = useState([] as Array<Shop>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<Shop>)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const businesses = useGetBussiness()
    const toast = useToast()

    const router = useRouter()
    const { business_id, inShow } = router.query
    useEffect(() => {
        console.log("business_id", business_id)
        if (inShow) {
            setAction("create")
            onOpen()
        }
    }, [router.query])

    useEffect(() => {
        onLoad(pagination.page, pagination.pageSize)
    }, [isOpen, router.query]);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            "$Businesses.id$": business_id ? business_id : businesses?.id,
            ...new_filter
        }
        await get_shops({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
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

    const onRemove = async (shop: Shop) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_shop(shop.id, (status: number, data: any) => {
                        console.log(data)
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
                            const item = itemsSelects[i]
                            if (item.canRemove)
                                remove_shop(item.id, (status: number, data: any) => {
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

    const onEdit = (item: Shop) => {
        setItemsSelects([item])
        setAction("edit")
        onOpen()
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

    const onDownloadExcel = () => {
        let columns = {
            "id": "Id",
            "name": "Nombre",
            "symbol": "Símbolo",
        };
        let row = MapData(itemsSelects.length > 0 ? itemsSelects : items, columns)
        download_excel(columns, row)
    }

    const columns: ColumnDef<Shop>[] = [
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
            header: "Descripción",
            id: "description",
            accessorKey: "description"
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
            },
        },
    ];

    const [business, setBusiness] = useState([] as Array<Bussines>)
    useEffect(() => {
        get_bussiness({ page: 1, pageSize: 10000 }, (status: number, data: any) => {
            if (status == 200) {
                setBusiness(data.data)
            }
        })
    }, [])

    return (
        <Box>
            <Loading isLoading={loading} />

            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/shops'
                    },
                    {
                        label: 'Tiendas',
                        icon: undefined,
                        link: '/nomenclators/shops'
                    },
                ]}
            >
                <CRUDActionsButtonGroup
                    onCreateEdit={() => {
                        setItemsSelects([])
                        setAction("create")
                        onOpen()
                    }}
                    onRemove={() => {
                        onMultipleRemove()
                    }}
                    column_find="name"
                    onFind={onFind}
                >
                    <Select bg={'white'} mr={'15px'} value={business_id ? business_id : businesses?.id} onChange={t => {
                        setLoading(true)
                        router.push(`/nomenclators/shops?business_id=${t.target.value}`)
                    }}>
                        {business.map((b, i) => (
                            <option value={b.id} key={i}>{b.name}</option>
                        ))}
                    </Select>
                </CRUDActionsButtonGroup>
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onSelectItems={(items: Array<Shop>) => {
                    if (!isOpen)
                        setItemsSelects(items)
                }}
                onFilter={onLoad}
                title={"Tiendas"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditShopDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                shop={itemsSelects[0]}
                business_id={business_id as string | undefined}
            />
            {/* Fin */}
        </Box>
    )
}
