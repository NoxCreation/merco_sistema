import React, { useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";
import CRUDActionsButtonGroup from "./components/CRUDActionsButtonGroup";
import CRUDTable from "./components/ProductTable";
import CreateEditProductDialog from "./dialog/CreateEditProductDialog";
import { Product } from "@/backend/types/UserType";

export default function NomenclatorsProductsScreen() {
    const [action, setAction] = useState("" as string)
    const [productsSelects, setProductsSelects] = useState([] as Array<Product>)
    const {
        isOpen,
        onOpen,
        onClose,
    } = useDisclosure();

    return (
        <Box>
            {/* Barra de Filteros */}
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
                    onCreateEdit={()=>{
                        setProductsSelects([])
                        setAction("create")
                        onOpen()
                    }}
                />
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}
            <CRUDTable
                onEdit={(product: Product)=>{
                    setProductsSelects([product])
                    setAction("edit")
                    onOpen()
                }}
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
