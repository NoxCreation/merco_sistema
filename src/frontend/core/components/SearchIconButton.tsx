import React from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, IconButton, Input, InputGroup, InputLeftElement, PopoverBody, PopoverHeader, } from "@chakra-ui/react";
import { SearchIcon, Search2Icon } from "@chakra-ui/icons";

interface Props {
  ButtonIcon?: any
}

export default function SearchIconButton({
  ButtonIcon
}: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        {ButtonIcon ? ButtonIcon : (
          <IconButton
            color={"white"}
            aria-label="Buscar elemento"
            icon={<SearchIcon />}
            colorScheme="cyan"
          />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Buscar elemento</PopoverHeader>
        <PopoverBody>
          <InputGroup>
            <Input />
            <InputLeftElement>
              <Search2Icon />
            </InputLeftElement>
          </InputGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
