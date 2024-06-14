import { ThemeConfig, extendTheme } from "@chakra-ui/react";
import InputStyle from "./InputStyle";
import ButtonStyle from "./ButtonStyle";
import BadgeStyle from "./BadgeStyle";
import FormLabelStyle from "./FormLabelStyle";

const MercoSistemaTheme: ThemeConfig = extendTheme({
  fonts: {
    body: "Lato, sans-serif",
    heading: "Lato, sans-serif",
  },
  components: {
    Input: InputStyle,
    Select: InputStyle,
    Button: ButtonStyle,
    FormLabel: FormLabelStyle,
    Badge: BadgeStyle,
  },
  styles: {
    global: {
      // styles for the `body`
    },
  },
});

export default MercoSistemaTheme;
