import { HistoryCardAccount } from "@/backend/types"
import { BarFilter } from "@/frontend/core/components/BarFilter"
import CRUDTable from "@/frontend/core/components/CRUD/CRUDTable"
import DateRangeSelector from "@/frontend/core/components/DateRangeSelector"
import { Loading } from "@/frontend/core/components/Loading"
import { useGetBussiness } from "@/helper/hooks/useGetBussiness"
import { MapData } from "@/helper/maps"
import { download_excel } from "@/helper/requests/Endpoints"
import { get_historycardaccount } from "@/helper/requests/HistoryCardAccount "
import { Box, Checkbox, useToast, Text, Flex } from "@chakra-ui/react"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const CardHistory = () => {
    const [action, setAction] = useState("" as string)
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 10,
        count: 10
    } as {
        page: number,
        pageSize: number,
        count: number
    })
    const [items, setItems] = useState([] as Array<HistoryCardAccount>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<HistoryCardAccount>)
    const [rangeDate, setRangeDate] = useState([new Date(), new Date()] as [Date, Date])

    const toast = useToast()
    const router = useRouter()
    const { id } = router.query

    const changeRangeToday = () => {
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
        if (id) {
            const [startDate, endDate] = changeRangeToday()
            onLoad(pagination.page, pagination.pageSize, {
                createdAt: {
                    BETWEEN_DATE: [startDate, endDate]
                }
            })
        }
    }, [id]);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            "$cardaccounts.id$": id,
            ...new_filter
        }
        await get_historycardaccount({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
            if (status == 200) {
                console.log(data)
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

    const onDownloadExcel = () => {
        let columns = {
            "id": "Id",
            "createdAt": "Creado",
            "valuecoin.value": "Cantidad",
            "valuecoin.coin.symbol": "Moneda",
            "description": "Descripción",
        };
        let row = MapData(itemsSelects.length > 0 ? itemsSelects : items, columns)
        download_excel(columns, row)
    }

    const columns: ColumnDef<HistoryCardAccount>[] = [
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
            cell: ({ row, getValue, cell }) => (
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
            ),
        },
        {
            header: "Creado",
            accessorKey: "createdAt",
            cell: (item) => (
                <>{(new Date(item.getValue<any>()).toLocaleString())}</>
            )
        },
        {
            header: "Cantidad",
            accessorKey: "valuecoin.value",
        },
        {
            header: "Moneda",
            accessorKey: "valuecoin.coin.symbol",
        },
        {
            header: "Descripción",
            accessorKey: "description"
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
                        link: '/nomenclators/accounts'
                    },
                    {
                        label: 'Cuentas',
                        icon: undefined,
                        link: '/nomenclators/accounts'
                    },
                    {
                        label: 'Historial',
                        icon: undefined,
                        link: ''
                    },
                ]}
            >
                <Flex>
                    <DateRangeSelector onChange={(startDate: Date, endDate: Date) => {
                        setRangeDate([startDate, endDate])
                        onLoad(pagination.page, pagination.pageSize, {
                            createdAt: {
                                BETWEEN_DATE: [startDate, endDate]
                            }
                        })
                    }} />
                </Flex>
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onSelectItems={(history: Array<HistoryCardAccount>) => {
                    setItemsSelects(history)
                }}
                onFilter={onLoad}
                title={"Historial"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={()=>{}}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}

export default CardHistory
