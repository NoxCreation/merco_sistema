import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Heading, Select, Textarea } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
    onNext: () => void
    onPreview: () => void
}

export const UserForm = ({ onNext, onPreview }: Props) => {
    const [lodiang, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onCreateUser = () => {
        //onNext()
    }

    return (
        <Flex flexDir={'column'} gap={5} pb={10} w={'100%'}>
            <Alert status='warning' variant={'warning'}>
                <AlertIcon />
                Ya casi estamos terminando. Ahora solo falta crear su perfil para poder entrar al sistema.
            </Alert>
            <Flex w={'100%'} gap={5}>
                <Flex flex={1} flexDir={'column'} gap={5}>
                    <Heading size={'sm'}>Datos Personales</Heading>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Nombre" />
                        <FormHelperText>Nombre que desea usar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Apellido" />
                        <FormHelperText>Apellido que desea usar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="CI" />
                        <FormHelperText>Número de Carnet de Identidad</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Correo" />
                        <FormHelperText>Correo que desea registrar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Teléfono" />
                        <FormHelperText>Teléfono que desea registrar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Usuario" />
                        <FormHelperText>Nombre de usuario que desea usar para entrar al sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='password' value={password} placeholder="Contraseña" />
                        <FormHelperText>Contraseña que desea usar para entrar al sistema</FormHelperText>
                    </FormControl>
                </Flex>
                <Flex flex={1} flexDir={'column'} gap={5}>
                    <Heading size={'sm'}>Datos Tienda</Heading>
                    <FormControl>
                        <Select>
                            <option value={''}>FrioPlus Marianao</option>
                            <option value={''}>MercoVenta Lisa</option>
                        </Select>
                        <FormHelperText>Elija la tienda a la que pertenece</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Textarea isDisabled></Textarea>
                    </FormControl>
                </Flex>
            </Flex>
            <Flex justifyContent={"right"} gap={5}>
                <Button colorScheme="cyan" variant={'ghost'} onClick={onPreview}>
                    Retroceder
                </Button>
                <Button colorScheme="cyan" color={"white"} onClick={onCreateUser}>
                    Crear Usuario
                </Button>
            </Flex>
        </Flex>
    )
}