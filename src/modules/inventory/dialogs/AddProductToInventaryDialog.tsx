import { Product } from "@/backend/types";
import ProductCard from "@/frontend/core/components/ProductCard";
import { useGetBussiness } from "@/helper/hooks/useGetBussiness";
import { get_products } from "@/helper/requests/Products";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  ModalFooter,
  Button,
  Badge,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  CircularProgress
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { ContentOptions } from "sweetalert/typings/modules/options/content";

type Props = {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: Product) => void
};

export default function AddProductToInventaryDialog({ isOpen, onClose, onAddProduct }: Props) {
  const [loading, setLoading] = useState(false)
  const [find, setFind] = useState("")
  const [products, setProducts] = useState([] as Array<Product>)
  const businesses = useGetBussiness()

  useEffect(() => {
    if (isOpen) {
      setProducts([])
      setFind("")
    }
  }, [isOpen])

  const onFind = () => {
    if (find != "") {
      setLoading(true)
      const filter = {
        businessId: businesses?.id,
        code: {
          LIKE: find
        }
      }
      get_products({ page: 1, pageSize: 10000, filter }, (status: number, data: any) => {
        if (status == 200) {
          setProducts(data.data)
        }
        setLoading(false)
      })
    }
    else {
      setProducts([])
    }

  }

  const onSelect = (product: Product) => {
    swal({
      title: "Agregar producto",
      text: "Si continua, agregará al inventario el siguiente producto.",
      icon: "warning",
      buttons: ["Cancelar", "Continuar"],
      dangerMode: false,
    })
      .then((willDelete) => {
        onClose()
        if (willDelete) {
          onAddProduct(product)
          onClose()
          /* swal({
            text: 'Escriba el precio en USD de este producto.',
            content: 'input' as any,
            button: {
              text: "Agregar",
              closeModal: true,
            },
          } as any).then((value)=>{
            onAddProduct(product, value)
            onClose()
          }) */
        }
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent>
        <ModalHeader display={"flex"} alignItems={"center"} gap={"10px"}>
          <Text>Agregar</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <InputGroup>
              <Input value={find} onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  onFind()
                }
              }} onChange={t => setFind(t.target.value)} placeholder="Buscar por código del producto" />
              <InputRightElement>
                {loading ? (<CircularProgress size={'20px'} isIndeterminate color='cyan.400' />) : (<SearchIcon color={"gray.400"} />)}
              </InputRightElement>
            </InputGroup>
            <SimpleGrid
              columns={3}
              height={"450px"}
              spacing={"10px"}
              padding={"10px"}
              overflowY={"scroll"}
              overflowX={"hidden"}
            >
              {products.map((product, index) => (
                <ProductCard
                  onClick={() => onSelect(product)}
                  key={index}
                  isSelected={false}
                  currency="USD"
                  photoUrl={`/api/statics${product.image}`}
                  price={product.coste_usd}
                  productName={product.name}
                />
              ))}
            </SimpleGrid>
          </Stack>
        </ModalBody>

        {/* <ModalFooter>
          <Button onClick={onClose} colorScheme="gray">Cancelar</Button>
          <Button colorScheme="cyan" ms={3} onClick={() => { }} color={"white"}>
            Aceptar
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}
