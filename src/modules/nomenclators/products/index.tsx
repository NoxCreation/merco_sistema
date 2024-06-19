import React, { useEffect, useState } from "react";

import {
    Box,
    Checkbox,
    useDisclosure,
    Text,
    Image,
    Flex,
    Badge
} from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CRUDActionsButtonGroup from "./components/CRUDActionsButtonGroup";
import CRUDTable from "./components/CRUDTable";
import CreateEditProductDialog from "./dialog/CreateEditProductDialog";
import { Product } from "@/backend/types";
import swal from 'sweetalert';
import { get_products, remove_product } from "@/helper/requests/Products";
import { ColumnDef } from "@tanstack/react-table";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { Loading } from "@/frontend/core/components/Loading";
import { download_excel } from "@/helper/requests/Endpoints";
import { MapData } from "@/helper/maps";

export default function NomenclatorsProductsScreen() {
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
    const [products, setProducts] = useState([] as Array<Product>)
    const [productsSelects, setProductsSelects] = useState([] as Array<Product>)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const businesses = useGetBussiness()

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
        await get_products({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
            if (status == 200) {
                setProducts(data.data)
                let temp = JSON.parse(JSON.stringify(pagination))
                temp.count = data.count
                setPagination(temp)
            }
            setLoading(false)
        })
    }

    const onRemove = async (product: Product) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_product(product.id, (status: number, data: any) => {
                        onLoad(pagination.page, pagination.pageSize)
                    })
                    swal("¡Se ha eliminado satisfactoriamente!", {
                        icon: "success",
                    });
                }
            });
    }

    const onMultipleRemove = async () => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina los registros seleccionados no podrá recuperarlos, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    for (let i = 0; i < productsSelects.length; i++) {
                        const product = productsSelects[i]
                        remove_product(product.id, (status: number, data: any) => {
                            onLoad(pagination.page, pagination.pageSize)
                        })
                    }
                    swal("¡Se ha eliminado satisfactoriamente!", {
                        icon: "success",
                    });
                }
            });
    }

    const onEdit = (product: Product) => {
        setProductsSelects([product])
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
                                LIKE: '%' + value + '%'
                            }
                        }
                    }
                })
            }
            else
                onLoad(1, pagination.pageSize, {
                    [column]: {
                        LIKE: '%' + value + '%'
                    }
                })
        }
        else
            onLoad(1, pagination.pageSize)
    }

    const onDownloadExcel = () => {
        let columns = {
            "image": "Imagen",
            "code": "Código",
            "name": "Nombre",
            "category.name": "Nombre Categoría",
            "price_usd": "Precio USD",
            "coste_usd": "Costo USD",
            "barcode": "Código de Barra",
        };
        let row = MapData(productsSelects.length > 0 ? productsSelects : products, columns)
        download_excel(columns, row)
    }

    const columns: ColumnDef<Product>[] = [
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
                    <Text fontSize={'12px'}>Código</Text>
                </Checkbox>
            ),
            accessorKey: "code",
            id: "code",
            cell: ({ row, getValue }) => (
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
            header: "Imagen",
            accessorKey: "image",
            /* id: "name", */
            cell: (image) => (
                <Image
                    src={`/api/statics${image.getValue<string>()}`}
                    alt="Product Image"
                    width={"60px"}
                ></Image>
            ),
        },
        {
            header: "Categoria",
            id: "categoryId",
            accessorKey: "category",
            cell: (item) => (
                <>{item.getValue<any>().name}</>
            ),
        },
        {
            header: "Producto",
            id: "name",
            accessorKey: "name",
            cell: (item) => (
                <Box maxW={'150px'} whiteSpace={"wrap"}>{item.getValue<string>()}</Box>
            ),
        },
        {
            header: "Costo",
            /* id: "coste_usd", */
            accessorKey: "coste_usd",
            cell: (item) => (
                <Flex gap={2}>
                    $ {item.getValue<number>()}
                    <Badge>USD</Badge>
                </Flex>
            ),
        },
        {
            header: "Precio",
            /* id: "price_usd", */
            accessorKey: "price_usd",
            cell: (item) => (
                <Flex gap={2}>
                    $ {item.getValue<number>()}
                    <Badge>USD</Badge>
                </Flex>
            ),
        },
        {
            header: "T/Pago",
            /* id: "gain_rate", */
            accessorKey: "gain_rate",
            cell: (item) => (
                <Flex gap={2}>
                    {item.getValue<boolean>() ? <Badge variant='solid' colorScheme='yellow'>Fijo</Badge> : <Badge variant='solid' colorScheme='green'>Variable</Badge>}
                </Flex>
            ),
        },
        {
            id: "actions",
            cell: (props) => <CRUDActionsButtonGroup inTable onCreateEdit={() => {
                onEdit(products[props.row.index])
            }} onRemove={() => {
                onRemove(products[props.row.index])
            }} />,
        },
    ];

    return (
        <Box>
            <Loading isLoading={loading} />

            {/* Barra de Filtros */}
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
                <CRUDActionsButtonGroup
                    onCreateEdit={() => {
                        setProductsSelects([])
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
                onSelectItems={(products: Array<Product>) => {
                    if (!isOpen)
                        setProductsSelects(products)
                }}
                onFilter={onLoad}
                title={"Productos"}
                columns={columns}
                rows={products}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditProductDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                product={productsSelects[0]}
            />
            {/* Fin */}
        </Box>
    )
}
