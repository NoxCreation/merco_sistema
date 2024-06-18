import DollarIcon from "@/frontend/core/icons/DollarIcon";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

export default function OrdersTableActions() {

  return (
    <ButtonGroup size="sm" isAttached>
      <IconButton
        aria-label="Add to friends"
        icon={<EditIcon w={"10px"} h={"10px"} />}
        colorScheme="cyan"
        color={"white"}
      />
      <IconButton
        aria-label="Add to friends"
        icon={<DollarIcon color="white" width={"15px"} heigth={"15px"} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<DeleteIcon w={"10px"} h={"10px"} />}
        colorScheme="red"
      />
    </ButtonGroup>
  );
}
