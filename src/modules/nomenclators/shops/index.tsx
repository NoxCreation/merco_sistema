import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";

export default function NomenclatorsWorkersScreen() {
    return (
        <Box>
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
