import React, { useEffect, useState } from "react";
import { Box, Checkbox, useDisclosure, useToast, Text, Tooltip, IconButton } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import { UserType } from "@/backend/types";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { create_edit_user, get_user, remove_user } from "@/helper/requests/User";
import swal from 'sweetalert';
import { MapData } from "@/helper/maps";
import { download_excel } from "@/helper/requests/Endpoints";
import { ColumnDef } from "@tanstack/react-table";
import CRUDActionsButtonGroup from "@/frontend/core/components/CRUD/CRUDActionsButtonGroup";
import CRUDTable from "@/frontend/core/components/CRUD/CRUDTable";
import { FiLock } from "react-icons/fi";
import { Loading } from "@/frontend/core/components/Loading";
import CreateEditUserDialog from "./dialog/CreateEditUserDialog";
import { useSession } from "next-auth/react";
import { send_sms } from "@/helper/requests/SMS";
import { generatePassword } from "@/helper/generatePassword";

export default function NomenclatorsUsersScreen() {
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
    const [items, setItems] = useState([] as Array<UserType>)
    const [itemsSelects, setItemsSelects] = useState([] as Array<UserType>)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();
    const businesses = useGetBussiness()
    const toast = useToast()
    const { data: mdata } = useSession()

    useEffect(() => {
        onLoad(pagination.page, pagination.pageSize)
    }, [isOpen]);

    const onLoad = async (npage?: number, npageSize?: number, new_filter?: {}) => {
        setLoading(true);
        // Filtrar por el id del negocio
        const filter = {
            "$shop.businesses.id$": businesses?.id,
            ...new_filter
        }
        await get_user({ page: npage ? npage : pagination.page, pageSize: npageSize ? npageSize : pagination.pageSize, filter }, (status: number, data: any) => {
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

    const onRemove = async (user: UserType) => {
        swal({
            title: "¿Está seguro?",
            text: "Si elimina el registro no podrá recuperarlo, ¿está seguro de querer continuar?",
            icon: "warning",
            buttons: ["Cancelar", "Eliminar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove_user(user.id, (status: number, data: any) => {
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
                            const user = itemsSelects[i]
                            remove_user(user.id, (status: number, data: any) => {
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

    const onEdit = (user: UserType) => {
        setItemsSelects([user])
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
            "first_name": "Nombres",
            "last_name": "Apellidos",
            "ci": "Carnet de Identidad",
            "email": "Correo",
            "phone": "Teléfono"
        };
        let row = MapData(itemsSelects.length > 0 ? itemsSelects : items, columns)
        download_excel(columns, row)
    }

    const onChangePassword = (user: UserType) => {
        swal({
            title: "¿Está seguro?",
            text: "Si continua, sustiturá la contraseña del usuario seleccionado por otra temporal. Se enviará un SMS al usuario con la contraseña temporal.",
            icon: "warning",
            buttons: ["Cancelar", "Cambiar"],
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setLoading(true)
                    const password = generatePassword()
                    const data = {
                        password_hash: password,
                        "shop.businesses.id": businesses?.id
                    }
                    create_edit_user("edit", user?.id as number, data, (status: number, data: any) => {
                        if (status == 200 && (data[0] == undefined || data[0] == 1)) {
                            send_sms(`Su contraseña temporal es: ${password}`, user.phone, mdata?.user.id, (status: number, data: any) => {
                                if (status == 200) {
                                    swal("¡Se ha cambiado la contraseña satisfactoriamente!", {
                                        icon: "success",
                                    });
                                }
                                else {
                                    console.log("error", status, data)
                                    toast({
                                        description: "No se ha podido enviar el sms de la nueva contraseña.",
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
                            console.log("error", status, data)
                            toast({
                                description: "Ocurrió un error al modificar la contraseña.",
                                status: 'error',
                                duration: 9000,
                                isClosable: true,
                                variant: "error"
                            })
                        }
                    })


                }
            })
    }

    const columns: ColumnDef<UserType>[] = [
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
                const user_id = parseInt(mdata?.user.id as string) as number
                if (row.original.id != user_id)
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
            header: "Nombres",
            accessorKey: "first_name",
            id: "first_name"
        },
        {
            header: "Apellidos",
            id: "last_name",
            accessorKey: "last_name"
        },
        {
            header: "CI",
            id: "ci",
            accessorKey: "ci"
        },
        {
            header: "Correo",
            id: "email",
            accessorKey: "email"
        },
        {
            header: "Teléfono",
            id: "phone",
            accessorKey: "phone"
        },
        {
            id: "actions",
            cell: (props) => {
                const user_id = parseInt(mdata?.user.id as string) as number
                if (props.row.original.id != user_id)
                    return (
                        <CRUDActionsButtonGroup inTable onCreateEdit={() => {
                            onEdit(items[props.row.index])
                        }} onRemove={() => {
                            onRemove(items[props.row.index])
                        }} >
                            <Tooltip label='Cambiar Contraseña'>
                                <IconButton
                                    aria-label="Cambiar Contraseña"
                                    icon={<FiLock />}
                                    colorScheme="blue"
                                    onClick={() => onChangePassword(props.row.original)}
                                />
                            </Tooltip>
                        </CRUDActionsButtonGroup>
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
                        link: '/nomenclators/users'
                    },
                    {
                        label: 'Usuarios',
                        icon: undefined,
                        link: '/nomenclators/users'
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
                onSelectItems={(products: Array<UserType>) => {
                    if (!isOpen)
                        setItemsSelects(products)
                }}
                onFilter={onLoad}
                title={"Usuarios"}
                columns={columns}
                rows={items}
                pagination={pagination}
                setPagination={setPagination}
                onFind={onFind}
                onDownloadExcel={onDownloadExcel}
            />
            {/* Fin */}

            {/* Ventanas modales */}
            <CreateEditUserDialog
                action={action}
                isOpen={isOpen}
                onClose={onClose}
                user={itemsSelects[0]}
            />
            {/* Fin */}
        </Box>
    )
}
