import { BarFilter } from "@/frontend/core/components/BarFilter";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";
import GenericContainer from "@/frontend/core/components/GenericContainer";

export default function Profile() {
  return (
    <Box>
      {/* Barra de Filteros */}
      <BarFilter
        breadcrumb={[
          {
            label: "Perfil",
            icon: undefined,
            link: "/profile",
          },
        ]}
      ></BarFilter>
      {/* Fin */}

      <GenericContainer title="Contraseña">
        <Stack>
          <FormControl>
            <FormLabel color={"gray.500"}>Nueva contraseña</FormLabel>
            <Input placeholder="Nueva contraseña" />
          </FormControl>
          <FormControl>
            <FormLabel color={"gray.500"}>Confirme contraseña</FormLabel>
            <Input placeholder="Confirme su nueva contraseña" />
          </FormControl>
          <Box color={"gray.500"}>
            <Text>
              Para que su contraseña sea segura, debe cumplir con estos
              requisitos:
            </Text>
            <UnorderedList>
              <ListItem>Debe tener más de 8 caracteres </ListItem>
              <ListItem>Debe poseer al menos un número</ListItem>
              <ListItem>Debe poseer al menos una letra mayúscula </ListItem>
              <ListItem>Debe poseer al menos un caracter extraño</ListItem>
            </UnorderedList>
          </Box>
          <Flex justifyContent={"end"}>
            <Button color={"white"} colorScheme="cyan" width={"fit-content"}>
              Cambiar contraseña
            </Button>
          </Flex>
        </Stack>
      </GenericContainer>
    </Box>
  );
}
