import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";

export default function NomenclatorsUnitsScreen() {
    return (
        <Box>
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
