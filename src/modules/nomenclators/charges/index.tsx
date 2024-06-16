import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/modules/core/components/BarFilter";

export default function NomenclatorsChargesScreen() {
    return (
        <Box>
            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/charges'
                    },
                    {
                        label: 'Cargos',
                        icon: undefined,
                        link: '/nomenclators/charges'
                    },
                ]}
            >
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}

            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}
