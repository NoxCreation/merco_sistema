import {
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = {
  photoUrl: string;
};

export default function UserAvatar({ photoUrl }: Props) {
  const onSignOut = async () => {
    await signOut({ callbackUrl: "/auth", redirect: false });
  };

  return (
    <Menu>
      <MenuButton>
        <Avatar src={photoUrl} cursor={"pointer"}>
          <AvatarBadge boxSize="1.25em" bg="green.500" />
        </Avatar>
      </MenuButton>
      <MenuList>
        <Link href={"/profile"}>
          <MenuItem>Perfil</MenuItem>
        </Link>
        <MenuDivider></MenuDivider>
        <MenuItem onClick={onSignOut}>Salir</MenuItem>
      </MenuList>
    </Menu>
  );
}
