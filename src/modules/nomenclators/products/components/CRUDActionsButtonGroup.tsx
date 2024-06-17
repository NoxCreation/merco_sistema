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
  inTable?: boolean
}

export default function CRUDActionsButtonGroup({
  inTable
}: Props) {

  return (
    <ButtonGroup size="sm" isAttached>
      {!inTable ? (
        <>
          <SearchIconButton />
          <Tooltip label='Agregar'>
            <IconButton
              aria-label="Add to friends"
              icon={<AddIcon w={'10px'} h={'10px'} />}
              colorScheme="green"
            />
          </Tooltip>
        </>
      ) : (
        <Tooltip label='Editar'>
          <IconButton
            aria-label="Add to friends"
            icon={<EditIcon w={'10px'} h={'10px'} color={'white'} />}
            colorScheme="cyan"
          />
        </Tooltip>
      )}

      <Tooltip label='Eliminar'>
        <IconButton
          aria-label="Add to friends"
          icon={<DeleteIcon w={'10px'} h={'10px'} />}
          colorScheme="red"
        />
      </Tooltip>

    </ButtonGroup>
  );
}
