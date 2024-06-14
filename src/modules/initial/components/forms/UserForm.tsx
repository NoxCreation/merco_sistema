import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Text } from "@chakra-ui/react"

interface Props {
    onNext: () => void
    onPreview: () => void
}

export const UserForm = ({ onNext, onPreview }: Props) => {
    return (
        <Flex flexDir={'column'} gap={5}>
            <Alert status='warning'>
                <AlertIcon />
                Ya casi estamos terminando. Ahora solo falta <br />
                crear su perfil para poder entrar al sistema. <br />
            </Alert>
            <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input type='email' />
                <FormHelperText>Nombre de usuario que desea usar para entrar al sistema</FormHelperText>
            </FormControl>
            <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input type='password' />
                <FormHelperText>Contraseña que desea usar para entrar al sistema</FormHelperText>
            </FormControl>
            <Flex justifyContent={"right"} gap={5}>
                <Button colorScheme="cyan" variant={'ghost'} onClick={onPreview}>
                    Retroceder
                </Button>
                <Button colorScheme="cyan" color={"white"} onClick={onNext}>
                    Crear Usuario
                </Button>
            </Flex>
        </Flex>
    )
}