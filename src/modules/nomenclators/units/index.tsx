import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    Text,
    Image,
    useDisclosure,
    useToast,
    Flex,
    Badge
} from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CRUDActionsButtonGroup from "../../../frontend/core/components/CRUD/CRUDActionsButtonGroup";
import { Unit } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import swal from 'sweetalert';
import { ColumnDef } from "@tanstack/react-table";
import CRUDTable from "../../../frontend/core/components/CRUD/CRUDTable";
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import CreateEditUnitDialog from "./dialog/CreateEditUnitDialog";
import { get_unit, remove_unit } from "@/helper/requests/Unit";
import { Loading } from "@/frontend/core/components/Loading";

export default function NomenclatorsUnitsScreen() {
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
    const [items, setItems] = useState([] as Array<Unit>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<Unit>)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const businesses = useGetBussiness()
    const toast = useToast()

    useEffect(() => {
        onLoad(pagination.page, pagination.pageSize)
    }, [isOpen]);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            businessId: businesses?.id,
            ...new_filter
        }
        await get_unit({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
            if (status == 200) {
                setItems(data.data)
                let temp = JSON.parse(JSON.stringify(pagination))
                temp.count = data.count
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

    const onRemove = async (unit: Unit) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_unit(unit.id, (status: number, data: any) => {
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
                            const product = itemsSelects[i]
                            if (product.canRemove)
                                remove_unit(product.id, (status: number, data: any) => {
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

    const onEdit = (product: Unit) => {
        setItemsSelects([product])
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

    const columns: ColumnDef<Unit>[] = [
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
            header: "Símbolo",
            id: "symbol",
            accessorKey: "symbol"
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
                else
                    return (<></>)
            },
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
                        link: '/nomenclators/units'
                    },
                    {
                        label: 'Unidades',
                        icon: undefined,
                        link: '/nomenclators/units'
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
                />
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onSelectItems={(products: Array<Unit>) => {
                    if (!isOpen)
                        setItemsSelects(products)
                }}
                onFilter={onLoad}
                title={"Unidades de Medida"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditUnitDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                unit={itemsSelects[0]}
            />
            {/* Fin */}
        </Box>
    )
}
