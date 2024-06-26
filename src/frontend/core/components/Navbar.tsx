import {
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import HomeIcon from "../icons/HomeIcon";
import ShoppingBagIcon from "../icons/ShoppingBagIcon";
import CarIcon from "../icons/CarIcon";
import DocumentIcon from "../icons/DocumentIcon";
import DollarIcon from "../icons/DollarIcon";
import ShoppingCartIcon from "../icons/ShoppingCartIcon";
import BoxIcon from "../icons/BoxIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ListIcon from "../icons/ListIcon";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import React from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { navbarItems } from "../utils/navbarItems";

type Props = {
  text: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
  subitems?: Array<any>;
};

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
            isActive={pathname === item.href || (item.subitems ? (item.subitems.find(t => t.href === pathname) ? true : false) : false)}
            href={item.href}
            icon={item.icon}
            text={item.text}
            subitems={item.subitems}
          />
        ))}
      </Flex>
      <Flex>
        <UserAvatar photoUrl="/avatar.png" />
      </Flex>
    </Flex>
  );
}

function NavbarLink({ text, href, icon, isActive, subitems }: Props) {
  const [contraction, setContraction] = useState(false);
  const pathname = usePathname();
  return (
    <>
      {subitems ? (
        <Menu isOpen={contraction}>
          <MenuButton onClick={(t) => setContraction(!contraction)}>
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
                  color: isActive ? "#0BC5EA" : "#718096",
                })}
              </Center>
              <Flex gap={2}>
                <Text
                  flexGrow={1}
                  color={isActive ? "cyan.400" : ""}
                  fontWeight={isActive ? "bold" : ""}
                  fontSize={"13px"}
                >
                  {text}
                </Text>
                {!contraction && <FiChevronDown />}
                {contraction && <FiChevronUp />}
              </Flex>
            </Flex>
          </MenuButton>
          <MenuList>
            {subitems.map((si, index) => (
              <Link href={si.href} key={index}>
                <MenuItem color={pathname === si.href ? "#0BC5EA" : "#718096"}>
                  {si.text}
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      ) : (
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
                color: isActive ? "#0BC5EA" : "#718096",
              })}
            </Center>
            <Text
              flexGrow={1}
              color={isActive ? "cyan.400" : ""}
              fontWeight={isActive ? "bold" : ""}
              fontSize={"13px"}
            >
              {text}
            </Text>
          </Flex>
        </Link>
      )}
    </>
  );
}
