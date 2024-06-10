import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import AuthenticationForm from "../components/forms/AuthenticationForm";
import InitialLayout from "../layouts/InitialLayout";

export default function AuthenticationScreen() {
  return (
    <InitialLayout>
      <AuthenticationForm />
    </InitialLayout>
  );
}
