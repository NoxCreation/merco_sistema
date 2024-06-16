import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

const Error403 = () => {
    const router = useRouter()
    return (
        <Flex backgroundColor={"#F3F7F9"} justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100vh'} flexDir={'column'} gap={5}>
            <Heading fontSize={'150px'} color={'primary.200'}>
                403
            </Heading>
            <Text fontWeight={'700'} fontSize={'20px'} color={'terciary.200'}>
                No tiene permiso para acceder a esta dirección
            </Text>
            <Button color={'white'} onClick={()=>router.push("/auth")}>
                Autenticarme
            </Button>
        </Flex>
    )
}

export default Error403
