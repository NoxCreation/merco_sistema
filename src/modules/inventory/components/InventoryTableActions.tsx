import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import BucketIcon from "@/frontend/core/icons/BucketIcon";
import { AddIcon, MinusIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";
import React, { useEffect } from "react";

type Props = {
  /* onEdit: () => void;
  
   */
  showTransferButton: boolean
  onTransferProducts: () => void;
  onDelete: () => void;
};

export default function InventoryTableActions({
  /* ,
  onEdit,
  onDelete, */
  showTransferButton,
  onTransferProducts,
  onDelete
}: Props) {
  
  return (
    <ButtonGroup size="sm" isAttached>
      <Tooltip label={"Editar"}>
        <IconButton
          aria-label="Editar"
          color={"white"}
          icon={<EditIcon w={"12px"} h={"12px"} />}
          colorScheme="cyan"
        /* onClick={onEdit} */
        />
      </Tooltip>
      {showTransferButton && (
        <Tooltip label={"Transferir mercancia"}>
          <IconButton
            aria-label="Transferir mercancia"
            icon={<BucketIcon />}
            colorScheme="green"
            onClick={onTransferProducts}
          />
        </Tooltip>
      )}

      {/* <IconButton
        aria-label="Add to friends"
        icon={<AddIcon w={"10px"} h={"10px"} />}
        colorScheme="green"
      />
      <IconButton
        aria-label="Add to friends"
        icon={<MinusIcon w={"10px"} h={"10px"} />}
        colorScheme="green"
      /> */}

      <Tooltip label={"Eliminar"}>
        <IconButton
          aria-label="Eliminar"
          onClick={onDelete}
          icon={<DeleteIcon />}
          colorScheme="red"
        />
      </Tooltip>

    </ButtonGroup>
  );
}
