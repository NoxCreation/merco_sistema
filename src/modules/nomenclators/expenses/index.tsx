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
import { Expense } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import swal from 'sweetalert';
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import { ColumnDef } from "@tanstack/react-table";
import CRUDActionsButtonGroup from "@/frontend/core/components/CRUD/CRUDActionsButtonGroup";
import CRUDTable from "@/frontend/core/components/CRUD/CRUDTable";
import { Loading } from "@/frontend/core/components/Loading";
import { get_expense, remove_expense } from "@/helper/requests/Expenses";
import CreateEditExpenseDialog from "./dialog/CreateEditExpenseDialog";
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector";

export default function NomenclatorsExpensesScreen() {
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
    const [items, setItems] = useState([] as Array<Expense>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<Expense>)
    const [rangeDate, setRangeDate] = useState([new Date(), new Date()] as [Date, Date])
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const businesses = useGetBussiness()
    const toast = useToast()

    const changeRangeToday=()=>{
        const startDate = new Date()
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        startDate.setMilliseconds(0);
        const endDate = new Date()
        endDate.setHours(23);
        endDate.setMinutes(59);
        endDate.setSeconds(59);
        endDate.setMilliseconds(999);
        setRangeDate([startDate, endDate])
        return [startDate, endDate]
    }

    useEffect(() => {
        const [startDate, endDate] = changeRangeToday()
        onLoad(pagination.page, pagination.pageSize, {
            createdAt: {
                BETWEEN_DATE: [startDate, endDate]
            }
        })
    }, [])

    useEffect(() => {
        if (!isOpen){
            const [startDate, endDate] = changeRangeToday()
            onLoad(pagination.page, pagination.pageSize, {
                createdAt: {
                    BETWEEN_DATE: [startDate, endDate]
                }
            })
        }
    }, [isOpen]);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: any) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            businessId: businesses?.id,
            createdAt: (new_filter && new_filter.createdAt) ? new_filter.createdAt : {
                BETWEEN_DATE: [rangeDate[0], rangeDate[1]]
            },
            ...new_filter
        }
        await get_expense({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
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

    const onRemove = async (expense: Expense) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_expense(expense.id, (status: number, data: any) => {
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
                            if (!product.inUse)
                                remove_expense(product.id, (status: number, data: any) => {
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

    const onEdit = (product: Expense) => {
        setItemsSelects([product])
        setAction("edit")
        onOpen()
    }

    const onFind = (column: string, value: string) => {
        let temp = JSON.parse(JSON.stringify(pagination))
        temp.page = 1
        setPagination(temp)
        if (value != "") {
            if (column == "amountId") {
                onLoad(1, pagination.pageSize, {
                    relations: {
                        valuecoin: {
                            value: {
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
            "createdAt": "Creado",
            "updatedAt": "Actualizado",
            "valuecoin.value": "Monto",
            "valuecoin.coin.symbol": "Moneda",
            "description": "Descripción",
        };
        let row = MapData(itemsSelects.length > 0 ? itemsSelects : items, columns)
        download_excel(columns, row)
    }

    const columns: ColumnDef<Expense>[] = [
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
                const inUse = cell.row.original.inUse
                if (!inUse)
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
                else {
                    return (
                        <Badge variant='solid' colorScheme='yellow'>En Uso</Badge>
                    )
                }
            },
        },
        {
            header: "Creado",
            /* id: "createdAt", */
            accessorKey: "createdAt",
            cell: (item) => (
                <>{(new Date(item.getValue<any>()).toLocaleString())}</>
            )
        },
        {
            header: "Actualizado",
            /* id: "updatedAt", */
            accessorKey: "updatedAt",
            cell: (item) => (
                <>{(new Date(item.getValue<any>()).toLocaleString())}</>
            )
        },
        {
            header: "Monto",
            accessorKey: "valuecoin",
            id: "amountId",
            cell: (item) => (
                <>{item.getValue<any>().value} {item.getValue<any>().coin.symbol}</>
            ),
        },
        {
            header: "description",
            id: "description",
            accessorKey: "description"
        },
        {
            id: "actions",
            cell: (props) => {
                const inUse = props.cell.row.original.inUse
                if (!inUse)
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

    return (
        <Box>
            <Loading isLoading={loading} />

            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/expenses'
                    },
                    {
                        label: 'Gastos',
                        icon: undefined,
                        link: '/nomenclators/expenses'
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
                    <Flex mr={5}>
                        <DateRangeSelector onChange={(startDate: Date, endDate: Date) => {
                            setRangeDate([startDate, endDate])
                            onLoad(pagination.page, pagination.pageSize, {
                                createdAt: {
                                    BETWEEN_DATE: [startDate, endDate]
                                }
                            })
                        }} />
                    </Flex>
                </CRUDActionsButtonGroup>
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onSelectItems={(products: Array<Expense>) => {
                    if (!isOpen)
                        setItemsSelects(products)
                }}
                onFilter={onLoad}
                title={"Gastos"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditExpenseDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                expense={itemsSelects[0]}
            />
            {/* Fin */}
        </Box>
    )
}
