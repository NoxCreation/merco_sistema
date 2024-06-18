import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import DollarIcon from "@/frontend/core/icons/DollarIcon";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

export default function TransitActionsButtonGroup() {
  return (
    <ButtonGroup size="sm" isAttached>
      <SearchIconButton />
      <IconButton
        aria-label="Add to friends"
        icon={<AddIcon color="white" width={"10px"} height={"10px"} />}
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
