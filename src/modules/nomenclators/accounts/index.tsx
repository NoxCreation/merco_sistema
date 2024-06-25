import React, { useEffect, useState } from "react";
import { Box, Flex, useDisclosure, useToast, Text, Badge, IconButton, ButtonGroup, Tooltip, Checkbox } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { CardAccount } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_cardaccount, get_cardaccount, remove_cardaccount } from "@/helper/requests/CardAccount";
import swal from 'sweetalert';
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import CRUDActionsButtonGroup from "@/frontend/core/components/CRUD/CRUDActionsButtonGroup";
import ExportableTableContainer from "@/frontend/core/components/ExportableTableContainer";
import { FiEdit, FiExternalLink, FiTrash2 } from "react-icons/fi";
import CreateEditCardAccountDialog from "./dialog/CreateEditCardAccountDialog";
import { formatNumber } from "@/helper/formatNumber";
import { Loading } from "@/frontend/core/components/Loading";
import { useRouter } from "next/router";

export default function NomenclatorsAccountsScreen() {
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
    const [items, setItems] = useState([] as Array<CardAccount>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<CardAccount>)
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
        await get_cardaccount({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
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

    const onRemove = async (card: CardAccount) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_cardaccount(card.id, (status: number, data: any) => {
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
                            remove_cardaccount(product.id, (status: number, data: any) => {
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

    const onEdit = (card: CardAccount) => {
        setItemsSelects([card])
        setAction("edit")
        onOpen()
    }


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
                    showFind={false}
                    showRemove={false}
                    column_find="name"
                    onFind={()=>{}}
                />
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <ExportableTableContainer title={"Cuentas"}>
                <Flex gap={5} wrap={'wrap'}>
                    {items.map((c, i) => (
                        <Card
                            key={i}
                            card={c}
                            onRemove={onRemove}
                            onEdit={onEdit}
                            onLoad={() => {
                                onLoad(pagination.page, pagination.pageSize)
                            }}
                        />
                    ))}
                </Flex>
            </ExportableTableContainer>
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditCardAccountDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                card={itemsSelects[0]}
            />
            {/* Fin */}
        </Box>
    )
}

interface Props {
    card: CardAccount
    onRemove: (card: CardAccount) => void
    onEdit: (card: CardAccount) => void
    onLoad: () => void
}

const Card = ({ card, onRemove, onEdit, onLoad }: Props) => {
    const toast = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onActive = async () => {
        const data = {
            active: !card?.active,
        }
        setLoading(true)
        await create_edit_cardaccount('edit', card?.id as number, data, (status: number, data: any) => {
            if (status == 200 && (data[0] == undefined || data[0] == 1)) {
                onLoad()
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

    return (
        <Flex
            bg={'gray.400'}
            w={'325px'}
            h={'180px'}
            borderRadius={'6px'}
            p={'15px'}
            color={'white'}
            flexDir={'column'}
            gap={'15px'}
        >
            <Loading isLoading={loading} />

            <Checkbox colorScheme="cyan" isChecked={card.active} onChange={onActive}>
                <Tooltip label='Activar/Desactivar'>
                    <Text fontSize={'18px'} fontWeight={600}>{card.name}</Text>
                </Tooltip>
            </Checkbox>

            <Text fontSize={'23px'} fontWeight={400}>{card.code}</Text>
            <Flex>
                <Flex flex={1} flexDir={'column'} gap={'5px'}>
                    <Badge variant='solid' colorScheme='gray' w={'fit-content'}>$ {formatNumber(card.value)} {card.coin.symbol}</Badge>
                    <Badge variant='solid' colorScheme='gray' w={'fit-content'}>$ {formatNumber(card.limit)} {card.coin.symbol}</Badge>
                </Flex>
                <Flex flex={1} gap={2} alignItems={'center'} justifyContent={'end'}>
                    <ButtonGroup size='sm' isAttached>
                        <Tooltip label='Eliminar'>
                            <IconButton
                                onClick={() => onRemove(card)}
                                aria-label="eliminar" icon={<FiTrash2 />} borderRadius={'full'} bg={'gray.50'} _hover={{ bg: 'gray.300' }} color={'gray'} />
                        </Tooltip>
                        <Tooltip label='Editar'>
                            <IconButton
                                onClick={() => onEdit(card)}
                                aria-label="editar" icon={<FiEdit />} borderRadius={'full'} bg={'gray.50'} _hover={{ bg: 'gray.300' }} color={'gray'} />
                        </Tooltip>
                        <Tooltip label='Historial'>
                            <IconButton 
                                onClick={()=> router.push(`/nomenclators/accounts/history?id=${card.id}`)}
                                aria-label="historial" icon={<FiExternalLink />} borderRadius={'full'} bg={'gray.50'} _hover={{ bg: 'gray.300' }} color={'gray'} />
                        </Tooltip>
                    </ButtonGroup>
                </Flex>
            </Flex>
        </Flex>
    )
}
