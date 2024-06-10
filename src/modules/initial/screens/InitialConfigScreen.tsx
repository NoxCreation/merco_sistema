import React from "react";
import InitialLayout from "../layouts/InitialLayout";
import InitialConfigStepper from "../components/InitialConfigStepper";
import {
    Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import BussinessCodeForm from "../components/forms/BussinessCodeForm";

export default function InitialConfigScreen() {
  return (
    <InitialLayout>
      <Stack maxWidth={"740px"} spacing={"40px"} alignItems={"center"}>
        <InitialConfigStepper />
        <BussinessCodeForm />
      </Stack>
    </InitialLayout>
  );
}
