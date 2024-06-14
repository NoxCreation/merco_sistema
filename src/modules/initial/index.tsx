import React, { useState } from "react";
import InitialLayout from "./layouts/InitialLayout";
import InitialConfigStepper from "./components/InitialConfigStepper";
import {
  Stack,
  useSteps,
} from "@chakra-ui/react";
import BussinessCodeForm from "./components/forms/BussinessCodeForm";
import { WelcomeForm } from "./components/forms/WelcomeForm";
import { UserForm } from "./components/forms/UserForm";
import { EndForm } from "./components/forms/EndForm";

const steps = [
  { title: "Bienvenida", description: "Introducción" },
  { title: "Código", description: "Código de negocio" },
  { title: "Usuario", description: "Creando usuario" },
  { title: "Finalizando", description: "Fin configuración" },
];

export default function InitialConfigScreen() {
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 1,
    count: steps.length,
  });
  const [shops, setShops] = useState(Array<any>)

  const onNext = () => {
    goToNext()
  }

  const onPreview = () => {
    goToPrevious()
  }

  return (
    <InitialLayout>
      <Stack width={"780px"} spacing={"45px"} alignItems={"center"} pt={10}>
        <InitialConfigStepper steps={steps} activeStep={activeStep} />

        {activeStep == 1 && (<WelcomeForm onNext={onNext} />)}
        {activeStep == 2 && (<BussinessCodeForm onNext={onNext} onPreview={onPreview} setShops={setShops}/>)}
        {activeStep == 3 && (<UserForm onNext={onNext} onPreview={onPreview} shops={shops}/>)}
        {activeStep == 4 && (<EndForm />)}
      </Stack>
    </InitialLayout>
  );
}
