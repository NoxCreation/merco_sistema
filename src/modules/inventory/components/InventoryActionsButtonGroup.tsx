import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import BucketIcon from "@/frontend/core/icons/BucketIcon";
import {
  AddIcon,
  DeleteIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  onTransferProducts: () => void
}

export default function InventoryActionsButtonGroup({
  onTransferProducts
}: Props) {

  return (
    <ButtonGroup size="sm" isAttached>
      <SearchIconButton />
      <IconButton
        aria-label="Add to friends"
        icon={<BucketIcon />}
        colorScheme="green"
        onClick={() => onTransferProducts()}
      />
      <IconButton
        aria-label="Add to friends"
        icon={<AddIcon w={'10px'} h={'10px'} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<MinusIcon w={'10px'} h={'10px'} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<DeleteIcon />}
        colorScheme="red"
      />
    </ButtonGroup>
  );
}
