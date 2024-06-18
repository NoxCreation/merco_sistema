import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import { DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton } from "@chakra-ui/react";

export default function OrderActionsButtonGroup() {
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
