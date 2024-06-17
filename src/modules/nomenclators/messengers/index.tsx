import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";

export default function NomenclatorsMessengersScreen() {
    return (
        <Box>
            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/messengers'
                    },
                    {
                        label: 'Mensajeros',
                        icon: undefined,
                        link: '/nomenclators/messengers'
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
