import { Avatar, AvatarBadge } from "@chakra-ui/react";
import React from "react";

type Props = {
  photoUrl: string;
};

export default function UserAvatar({ photoUrl }: Props) {
  return (
    <Avatar src={photoUrl}>
      <AvatarBadge boxSize="1.25em" bg="green.500" />
    </Avatar>
  );
}
