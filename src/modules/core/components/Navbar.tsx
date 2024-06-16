import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
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
import { ReactElement } from "react";
import React from "react";
import Link from "next/link";

const navbarItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon />,
    href: "/dashboard",
  },
  {
    text: "Inventario",
    icon: <ShoppingBagIcon />,
    href: "/inventario",
  },
  {
    text: "Tránsito",
    icon: <CarIcon />,
    href: "/transito",
  },
  {
    text: "Órdenes",
    icon: <DocumentIcon />,
    href: "/ordenes",
  },
  {
    text: "Finanzas",
    icon: <DollarIcon />,
    href: "/finances",
  },
  {
    text: "Ventas",
    icon: <ShoppingCartIcon />,
    href: "/sales",
  },
  {
    text: "Caja",
    icon: <BoxIcon />,
    href: "/box",
  },
  {
    text: "Nomencladores",
    icon: <ListIcon />,
    href: "/nomenclators",
  },
  {
    text: "Configuración",
    icon: <SettingsIcon />,
    href: "/configuration",
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
    <Link href={href}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        height={"full"}
        cursor={"pointer"}
        justifyContent={"space-between"}
        padding={"10px"}
      >
        <Center height={"25px"} color={isActive ? "cyan" : ""}>
          {React.cloneElement(icon, {
            color: isActive ? "#0BC5EA" : "#718096"
          })}
        </Center>
        <Text
          flexGrow={1}
          color={isActive ? "cyan.400" : ""}
          fontWeight={isActive ? "bold" : ""}
          fontSize={'13px'}
        >
          {text}
        </Text>
      </Flex>
    </Link>
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
        <UserAvatar photoUrl="/avatar.png" />
      </Flex>
    </Flex>
  );
}
