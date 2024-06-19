import SearchIconButton from "@/frontend/core/components/SearchIconButton";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  onCreateEdit: () => void
  onRemove: () => void
  onFind: (column: string, value: string) => void
  column_find?: string
  inTable?: boolean
}

export default function CRUDActionsButtonGroup({
  inTable,
  column_find,
  onCreateEdit,
  onFind,
  onRemove
}: Props) {

  return (
    <ButtonGroup size="sm" isAttached>
      {!inTable ? (
        <>
          <SearchIconButton onFind={onFind} column_name={column_find as string} />
          <Tooltip label='Agregar'>
            <IconButton
              aria-label="Add to friends"
              icon={<AddIcon w={'10px'} h={'10px'} />}
              colorScheme="green"
              onClick={onCreateEdit}
            />
          </Tooltip>
        </>
      ) : (
        <Tooltip label='Editar'>
          <IconButton
            aria-label="Add to friends"
            icon={<EditIcon w={'10px'} h={'10px'} color={'white'} />}
            colorScheme="cyan"
            onClick={onCreateEdit}
          />
        </Tooltip>
      )}

      <Tooltip label='Eliminar'>
        <IconButton
          aria-label="Add to friends"
          icon={<DeleteIcon w={'10px'} h={'10px'} />}
          colorScheme="red"
          onClick={onRemove}
        />
      </Tooltip>

    </ButtonGroup>
  );
}
