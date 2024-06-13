import SearchIconButton from "@/modules/core/components/SearchIconButton";
import BucketIcon from "@/modules/core/icons/BucketIcon";
import {
  AddIcon,
  DeleteIcon,
  MinusIcon,
  Search2Icon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export default function InventoryActionsButtonGroup() {
  const context = useContext(InventoryContext);

  return (
    <ButtonGroup size="sm" isAttached>
      <SearchIconButton />
      <IconButton
        aria-label="Add to friends"
        icon={<BucketIcon />}
        colorScheme="green"
        onClick={() => context?.setOpenTransferMerchandiseModal(true)}
      />
      <IconButton
        aria-label="Add to friends"
        icon={<AddIcon />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<MinusIcon />}
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
