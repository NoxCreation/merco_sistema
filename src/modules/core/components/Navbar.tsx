import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import HomeIcon from "../icons/HomeIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import CarIcon from "../icons/CarIcon";
import DocumentIcon from "../icons/DocumentIcon";
import DollarIcon from "../icons/DollarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import BoxIcon from "../icons/BoxIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ListIcon from "../icons/ListIcon";
import Logo from "../components/Logo";
import UserAvatar from "../components/UserAvatar";
import { usePathname } from "next/navigation";
import { ReactElement, ReactNode } from "react";
import React from "react";

const navbarItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon />,
    href: "/Dashboard",
  },
  {
    text: "Inventario",
    icon: <ShoppingBagIcon />,
    href: "/Inventario",
  },
  {
    text: "Transito",
    icon: <CarIcon />,
    href: "/Transito",
  },
  {
    text: "Ordenes",
    icon: <DocumentIcon />,
    href: "/Ordenes",
  },
  {
    text: "Finanzas",
    icon: <DollarIcon />,
    href: "/Finanzas",
  },
  {
    text: "Ventas",
    icon: <ShoppingCartIcon />,
    href: "/Ventas",
  },
  {
    text: "Caja",
    icon: <BoxIcon />,
    href: "/Caja",
  },
  {
    text: "Nomencladores",
    icon: <ListIcon />,
    href: "/Nomencladores",
  },
  {
    text: "Configuracion",
    icon: <SettingsIcon />,
    href: "Configuracion",
  },
];

type Props = {
  text: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
};

function NavbarLink({ text, href, icon, isActive }: Props) {
  return (
    <Flex
      as={"a"}
      direction={"column"}
      alignItems={"center"}
      height={"full"}
      cursor={"pointer"}
      justifyContent={"space-between"}
      padding={"10px"}
      href={href}
    >
      <Center height={"25px"} color={isActive ? "cyan" : ""}>
        {React.cloneElement(icon, { color: isActive ? "#0BC5EA" : "#718096" })}
      </Center>
      <Text
        flexGrow={1}
        color={isActive ? "cyan.400" : ""}
        fontWeight={isActive ? "black" : ""}
      >
        {text}
      </Text>
    </Flex>
  );
}

export default function Navbar() {
  const pathname = usePathname();

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
        {navbarItems.map((item) => (
          <NavbarLink
            key={item.href}
            isActive={pathname === item.href}
            href={item.href}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </Flex>
      <Flex>
        <UserAvatar photoUrl="https://www.shutterstock.com/image-photo/smiling-business-man-black-suit-260nw-531023809.jpg" />
      </Flex>
    </Flex>
  );
}
