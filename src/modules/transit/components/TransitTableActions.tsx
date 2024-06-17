import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import BucketIcon from "@/frontend/core/icons/BucketIcon";
import DollarIcon from "@/frontend/core/icons/DollarIcon";
import { AddIcon, MinusIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

export default function TransitTableActions() {

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
