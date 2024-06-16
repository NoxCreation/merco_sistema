import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/modules/core/components/BarFilter";

export default function NomenclatorsRolesScreen() {
    return (
        <Box>
            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/roles'
                    },
                    {
                        label: 'Roles',
                        icon: undefined,
                        link: '/nomenclators/roles'
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
