import { BreadcrumbMain } from "@/modules/core/components/BreadcrumbMain"
import { Flex } from "@chakra-ui/react"

interface Props {
}

export const BarFilterTransit = ({
}: Props) => {

    return (
        <Flex
            paddingY={"20px"}
            marginY={"25px"}
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <BreadcrumbMain items={[
                {
                    label: 'Tránsito',
                    icon: undefined,
                    link: '/transito'
                }
            ]} />
            <Flex gap={"10px"} alignItems={"center"}>
                options
            </Flex>
        </Flex>
    )
}