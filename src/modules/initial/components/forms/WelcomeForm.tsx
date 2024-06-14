import { Flex, Image, Heading, Text, Button } from "@chakra-ui/react"

interface Props {
    onNext: () => void
}

export const WelcomeForm = ({ onNext }: Props) => {
    return (
        <Flex>
            <Flex flex={1} alignItems={'center'}>
                <Image src="/OIG2.png" h={'fit-content'} />
            </Flex>
            <Flex flex={1} flexDir={"column"} gap={2} textAlign={'center'}>
                <Heading textAlign={'center'} w={'100%'}>
                    Bienvenido
                </Heading>
                <Text>
                    <b>Merco Sistema</b> es un software de gestión de inventario, hecho a la medida
                    por <b>NOX Creation</b> para sus clientes <b>FrioPlus</b>, <b>MercoVenta</b> y <b>RefriShop</b>.
                </Text>
                <Text>
                    Si usted es parte de alguno de estos clientes, para el correcto funcionamiento del
                    sistema, debe proceder con esta configuración inicial.
                </Text>
                <Text>
                    Deseamos que el siguiente sistema sea de su agrado. Puede contactarnos por las siguientes vías:
                </Text>
                <Text>
                    <ul style={{
                        listStyle: "none"
                    }}>
                        <li>
                            <a href="mailto:services@noxcreation.dev">services@noxcreation.dev</a>
                        </li>
                        <li>
                            <a href="tel:+5358477311">+5358477311</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://noxcreation.dev">https://noxcreation.dev</a>
                        </li>
                    </ul>
                </Text>
                <Flex justifyContent={'right'} mt={5}>
                    <Button colorScheme="cyan" color={"white"} onClick={onNext}>
                        Continuar
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}