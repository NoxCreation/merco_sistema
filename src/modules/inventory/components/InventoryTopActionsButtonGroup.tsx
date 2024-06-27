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
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  onTransferProducts: () => void
  onShowAddProduct: () => void
  onMultipleRemove: () => void
  showAddButton?: boolean
  showTransferButton?: boolean
  disabledTransferButton?: boolean
  disabledRemoveButton?: boolean
}

export default function InventoryTopActionsButtonGroup({
  onTransferProducts,
  onShowAddProduct,
  onMultipleRemove,
  showAddButton,
  showTransferButton,
  disabledTransferButton,
  disabledRemoveButton
}: Props) {

  return (
    <ButtonGroup size="sm" isAttached>
      {/* <SearchIconButton /> */}
      {showTransferButton && (
        <Tooltip label={"Transferir mercancia"}>
          <IconButton
            isDisabled={disabledTransferButton}
            aria-label="Transferir mercancia"
            icon={<BucketIcon />}
            colorScheme="green"
            onClick={() => onTransferProducts()}
          />
        </Tooltip>
      )}

      {showAddButton && (
        <Tooltip label={"Agregar producto"}>
          <IconButton
            aria-label="Agregar producto"
            icon={<AddIcon w={'10px'} h={'10px'} />}
            colorScheme="green"
            onClick={onShowAddProduct}
          />
        </Tooltip>
      )}

      {/* <IconButton
        aria-label="Add to friends"
        icon={<MinusIcon w={'10px'} h={'10px'} />}
        colorScheme="green"
      /> */}

      <Tooltip label={"Eliminar"}>
        <IconButton
          isDisabled={disabledRemoveButton}
          aria-label="Eliminar"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={onMultipleRemove}
        />
      </Tooltip>

    </ButtonGroup>
  );
}
