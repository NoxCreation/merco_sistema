import { BreadcrumbMain } from "@/modules/core/components/BreadcrumbMain"
import TabGroup from "@/modules/core/components/TabGroup"
import { Flex, Select } from "@chakra-ui/react"
import InventoryActionsButtonGroup from "./InventoryActionsButtonGroup"

interface Props {
    setActiveTabIndex: (tab: number) => void
    onTransferProducts: () => void
}

export const BarFilterInventory = ({
    setActiveTabIndex,
    onTransferProducts
}: Props) => {
    const tabs = ["Inventario", "Historial"];

    return (
        <Flex
            paddingY={"20px"}
            marginY={"25px"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <BreadcrumbMain items={[
                {
                    label: 'Inventario',
                    icon: undefined,
                    link: '/inventario'
                }
            ]} />
            <Flex gap={"10px"} alignItems={"center"}>
                <TabGroup tabs={tabs} onChange={setActiveTabIndex} />
                <Select
                    colorScheme="cyan"
                    minWidth={"210px"}
                    backgroundColor={"white"}
                >
                    <option>Almacen</option>
                </Select>
                <InventoryActionsButtonGroup
                    onTransferProducts={onTransferProducts}
                />
            </Flex>
        </Flex>
    )
}