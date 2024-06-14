import { get_bussines_by_code } from "@/helper/requests/Shop";
import { Loading } from "@/modules/core/components/Loading";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  onNext: () => void
  onPreview: () => void
  setShops: (shops: Array<any>) => void
}

export default function BussinessCodeForm({ onNext, onPreview, setShops }: Props) {
  const [lodiang, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const toast = useToast()

  const onCheckCode = () => {
    if (code == "") {
      toast({
        description: "Debe introducir un código válido en el formulario.",
        status: 'error',
        duration: 9000,
        isClosable: true,
        variant: "error"
      })
    }
    else {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)

        get_bussines_by_code(code, (status: number, data: any) => {
          if (status == 200) {
            setShops(data.shops)
            toast({
              description: "Código de negocio correcto",
              status: 'success',
              duration: 9000,
              isClosable: true,
              variant: "success"
            })
            onNext()
          }
          else {
            toast({
              description: "Código no válido",
              status: 'error',
              duration: 9000,
              isClosable: true,
              variant: "error"
            })
          }
        })
      }, 1000)
    }
  }

  return (
    <React.Fragment>
      <Loading isLoading={lodiang} />
      {/* <Heading as={"h3"} width={"full"} fontSize={"18px"}>
        Código
      </Heading> */}
      <Text color={"black"} fontSize={"15px"} textAlign={'justify'}>
        Para comenzar a usar el sistema debe ponerse en contacto con la
        administración y adquirir el código del negocio para poder realizar la
        configuración inicial.
      </Text>
      <Center maxWidth={"300px"}>
        <FormControl>
          <FormLabel color={"gray.500"} fontSize={"15px"}>Código de negocio</FormLabel>
          {/* <Input placeholder="B-202401" fontSize={"15px"} value={code} onChange={t => setCode(t.target.value)} /> */}
          <HStack>
            <PinInput value={code} onChange={t => setCode(t)}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>
      </Center>
      <Flex width={"full"} justifyContent={"right"} gap={5}>
        <Button colorScheme="cyan" variant={'ghost'} onClick={onPreview}>
          Retroceder
        </Button>
        <Button colorScheme="cyan" color={"white"} onClick={onCheckCode} >
          Continuar
        </Button>
      </Flex>
    </React.Fragment>
  );
}
