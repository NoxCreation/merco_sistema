import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import HomeIcon from "./icons/HomeIcon";
import ShoppingBagIcon from "./icons/ShoppingBagIcon";
import CarIcon from "./icons/CarIcon";
import DocumentIcon from "./icons/DocumentIcon";
import DollarIcon from "./icons/DollarIcon";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import BoxIcon from "./icons/BoxIcon";
import SettingsIcon from "./icons/SettingsIcon";
import ListIcon from "./icons/ListIcon";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";

const navbarItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    text: "Inventario",
    icon: <ShoppingBagIcon />,
  },
  {
    text: "Transito",
    icon: <CarIcon />,
  },
  {
    text: "Ordenes",
    icon: <DocumentIcon />,
  },
  {
    text: "Finanzas",
    icon: <DollarIcon />,
  },
  {
    text: "Ventas",
    icon: <ShoppingCartIcon />,
  },
  {
    text: "Caja",
    icon: <BoxIcon />,
  },
  {
    text: "Nomencladores",
    icon: <ListIcon />,
  },
  {
    text: "Configuracion",
    icon: <SettingsIcon />,
  },
];

export default function Navbar() {
  return (
    <Flex
      width={"full"}
      paddingX={"20px"}
      paddingY={"10px"}
      gap={"20px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      backgroundColor={"white"}
      borderRadius={"xl"}
      boxShadow={"0 4px 120px 0 rgba(115, 115, 155, 8%)"}
    >
      <Flex alignItems={"center"} gap={"20px"}>
        <Box width="30px" margin="10px">
          <Logo />
        </Box>
        {navbarItems.map((item, index) => (
          <Flex
            direction={"column"}
            key={index}
            alignItems={"center"}
            height={"full"}
            cursor={"pointer"}
            justifyContent={"space-between"}
            padding={"10px"}
          >
            <Center height={"25px"}>{item.icon}</Center>
            <Text flexGrow={1}>{item.text}</Text>
          </Flex>
        ))}
      </Flex>
      <Flex>
        <UserAvatar photoUrl="https://www.shutterstock.com/image-photo/smiling-business-man-black-suit-260nw-531023809.jpg" />
      </Flex>
    </Flex>
  );
}
