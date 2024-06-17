import GraphicGrowingIcon from '@/frontend/core/icons/GraphicGrowingIcon'
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Flex,
    Box
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
    title: string
    subtitle: string
    value: string
    icon: ReactNode
    iconColor: string
    badge?: ReactNode
}

export const MiniCard = ({
    title,
    subtitle,
    value,
    icon,
    iconColor,
    badge
}: Props) => {
    return (
        <Card flex={1} w={'100%'}>
            <CardHeader pb={0}>
                <Text
                    fontWeight={'700'}
                    color={'#828D99'}
                    textTransform={'uppercase'}
                    fontSize={'10px'}
                >{title}</Text>
            </CardHeader>
            <CardBody pt={'0'} display={'flex'}>
                <Box w={'100%'}>
                    <Text
                        fontWeight={'700'}
                        fontSize={'20px'}
                    >
                        {value}
                    </Text>
                    <Flex gap={2} alignItems={'center'}>
                        {badge}
                        <Text
                            fontWeight={'300'}
                            color={'gray.400'}
                            fontSize={'10px'}
                            h={'fit-content'}
                        >
                            {subtitle}
                        </Text>
                    </Flex>
                </Box>
                <Flex>
                    <Flex
                        bg={iconColor}
                        w={'45px'}
                        h={'45px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        borderRadius={'full'}
                    >
                        {icon}
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    )
}