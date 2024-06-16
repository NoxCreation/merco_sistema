import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/modules/core/components/BarFilter";

export default function NomenclatorsAccountsScreen() {
    return (
        <Box>
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
            </BarFilter>
            {/* Fin */}

            {/* Tabla */}

            {/* Fin */}

            {/* Ventanas modales */}

            {/* Fin */}
        </Box>
    )
}
