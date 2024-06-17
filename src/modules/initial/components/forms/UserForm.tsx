import { create_user } from "@/helper/requests/User"
import { Loading } from "@/frontend/core/components/Loading"
import { Alert, AlertIcon, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Heading, Select, Textarea } from "@chakra-ui/react"
import { useState } from "react"

interface Props {
    onNext: () => void
    onPreview: () => void
    shops: Array<any>
}

export const UserForm = ({ onNext, onPreview, shops }: Props) => {
    const [lodiang, setLoading] = useState(false)
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [ci, setCI] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [roleId, setRoleId] = useState(1)
    const [shopId, setShopId] = useState("1")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onCreateUser = () => {
        const data = {
            first_name,
            last_name,
            ci,
            email,
            phone,
            roleId,
            shopId,
            username,
            password_hash: password
        }
        setLoading(true)
        create_user(data, (status: number, data: any)=>{
            if(status==200){
                onNext()
            }
            setLoading(false)
        })
    }

    return (
        <Flex flexDir={'column'} gap={5} pb={10} w={'100%'}>
            <Loading isLoading={lodiang} />
            <Alert status='warning' variant={'warning'}>
                <AlertIcon />
                Ya casi estamos terminando. Ahora solo falta crear su perfil para poder entrar al sistema.
            </Alert>
            <Flex w={'100%'} gap={5}>
                <Flex flex={1} flexDir={'column'} gap={5}>
                    <Heading size={'sm'}>Datos Personales</Heading>
                    <FormControl>
                        <Input type='text' value={first_name} placeholder="Nombre" onChange={t => setFirstName(t.target.value)} />
                        <FormHelperText>Nombre que desea usar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={last_name} placeholder="Apellido" onChange={t => setLastName(t.target.value)}/>
                        <FormHelperText>Apellido que desea usar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={ci} placeholder="CI" onChange={t => setCI(t.target.value)}/>
                        <FormHelperText>Número de Carnet de Identidad</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={email} placeholder="Correo" onChange={t => setEmail(t.target.value)}/>
                        <FormHelperText>Correo que desea registrar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={phone} placeholder="Teléfono" onChange={t => setPhone(t.target.value)}/>
                        <FormHelperText>Teléfono que desea registrar en el sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='text' value={username} placeholder="Usuario" onChange={t => setUsername(t.target.value)}/>
                        <FormHelperText>Nombre de usuario que desea usar para entrar al sistema</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input type='password' value={password} placeholder="Contraseña" onChange={t => setPassword(t.target.value)}/>
                        <FormHelperText>Contraseña que desea usar para entrar al sistema</FormHelperText>
                    </FormControl>
                </Flex>
                <Flex flex={1} flexDir={'column'} gap={5}>
                    <Heading size={'sm'}>Datos Tienda</Heading>
                    <FormControl>
                        <Select value={shopId} onChange={t => setShopId(t.target.value)}>
                            {shops.map((s: any, i: number) => (
                                <option key={i} value={s.id}>{s.name}</option>
                            ))}
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