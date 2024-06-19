import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import BucketIcon from "@/frontend/core/icons/BucketIcon";
import { AddIcon, MinusIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";
import React from "react";

type Props = {
  onEdit: () => void;
  onTransferProducts: () => void;
  onDelete: () => void;
};

export default function InventoryTableActions({
  onTransferProducts,
  onEdit,
  onDelete,
}: Props) {
  return (
    <ButtonGroup size="sm" isAttached>
      <IconButton
        aria-label="Add to friends"
        color={"white"}
        icon={<EditIcon w={"12px"} h={"12px"} />}
        colorScheme="cyan"
        onClick={onEdit}
      />
      <IconButton
        aria-label="Add to friends"
        icon={<BucketIcon />}
        colorScheme="green"
        onClick={onTransferProducts}
      />
      <IconButton
        aria-label="Add to friends"
        icon={<AddIcon w={"10px"} h={"10px"} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<MinusIcon w={"10px"} h={"10px"} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        onClick={onDelete}
        icon={<DeleteIcon />}
        colorScheme="red"
      />
    </ButtonGroup>
  );
}
