import React from "react";
import { Box } from "@chakra-ui/react";
import { BarFilter } from "@/frontend/core/components/BarFilter";

export default function NomenclatorsCategoriesScreen() {
    return (
        <Box>
            {/* Barra de Filteros */}
            <BarFilter
                breadcrumb={[
                    {
                        label: 'Nomencladores',
                        icon: undefined,
                        link: '/nomenclators/categorie'
                    },
                    {
                        label: 'Categoría',
                        icon: undefined,
                        link: '/nomenclators/categorie'
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
