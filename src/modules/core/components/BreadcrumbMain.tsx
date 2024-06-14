import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react"
import Link from "next/link"

interface Props {
    items: Array<any>
}

export const BreadcrumbMain = ({ items }: Props) => {
    return (
        <Flex mt={'10px'} mb={'10px'} ml={'10px'}>
            <Breadcrumb>
                {items.map((t, i) => (
                    <BreadcrumbItem key={i}>
                        <Link href={t.link ? t.link : '#'}>
                            <Flex gap={2} alignItems={'center'}>
                                {t.icon}
                                <BreadcrumbLink color={i == items.length - 1 ? 'secondary.200' : '#77808e'} fontWeight={'400'} fontSize={'15px'}>{t.label}</BreadcrumbLink>
                            </Flex>
                        </Link>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>
        </Flex>
    )
}