import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";

export default function NomenclatorsProductsScreen() {
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
                options
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}

            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}
