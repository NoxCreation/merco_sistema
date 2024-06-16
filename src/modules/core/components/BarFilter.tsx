import { BreadcrumbMain } from "@/modules/core/components/BreadcrumbMain"
import TabGroup from "@/modules/core/components/TabGroup"
import { Flex, Select } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    breadcrumb: Array<any>
    children?: ReactNode
}

export const BarFilter = ({
    breadcrumb,
    children
}: Props) => {
    const tabs = ["Inventario", "Historial"];

    return (
        <Flex
            paddingY={"20px"}
            marginY={"25px"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <BreadcrumbMain items={breadcrumb} />
            <Flex gap={"10px"} alignItems={"center"}>
                {children}
            </Flex>
        </Flex>
    )
}