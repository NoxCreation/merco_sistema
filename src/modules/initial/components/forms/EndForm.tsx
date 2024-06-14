import { Alert, AlertIcon, Button, Flex } from "@chakra-ui/react"
import { useRouter } from "next/router"

export const EndForm = () => {
    const router = useRouter()

    const goAuth=()=>{
        router.push("/auth")
    }

    return (
        <Flex flexDir={'column'} gap={5}>
            <Alert status='success'>
                <AlertIcon />
                Se ha configurado el sistema satisfactoriamente!
            </Alert>
            <Flex justifyContent={"right"} gap={5}>
                <Button colorScheme="cyan" color={"white"} onClick={goAuth}>
                    Autenticarme
                </Button>
            </Flex>
        </Flex>
    )
}