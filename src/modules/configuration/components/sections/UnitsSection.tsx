import { FormControl, FormLabel, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import UnitItem from "../UnitItem";

export default function UnitsSection() {
  return (
    <Stack width={"full"}>
      <Heading as="h5" size={"15px"} fontWeight={"bold"} color={"gray.500"}>
        Unidad
      </Heading>
      <FormControl>
        <FormLabel>Promotor</FormLabel>
        <UnitItem />
      </FormControl>
      <FormControl>
        <FormLabel>Vendedor</FormLabel>
        <UnitItem />
      </FormControl>
    </Stack>
  );
}
