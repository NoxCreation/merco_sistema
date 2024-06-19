import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  PopoverBody,
  PopoverHeader,
  Tooltip,
  Box
} from "@chakra-ui/react";
import { SearchIcon, Search2Icon, CloseIcon } from "@chakra-ui/icons";

interface Props {
  ButtonIcon?: any
  column_name?: string
  onFind?: (column: string, value: string) => void
}

export default function SearchIconButton({
  onFind,
  column_name,
  ButtonIcon
}: Props) {
  const [value, setValue] = useState("")

  return (
    <Popover placement='right' >
      <PopoverTrigger>
        {ButtonIcon ? ButtonIcon : (
          <Box as="button" className="chakra-button css-ired1u">
            <Tooltip label='Buscar'>
              <IconButton
                color={"white"}
                aria-label="Buscar elemento"
                icon={<SearchIcon />}
                colorScheme="cyan"
              />
            </Tooltip>
          </Box>
        )}
      </PopoverTrigger>
      <PopoverContent >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Buscar elemento</PopoverHeader>
        <PopoverBody bg={'white'}>
          <InputGroup>
            <InputLeftElement onClick={() => onFind && onFind(column_name as string, value)}>
              <Search2Icon _hover={{
                color: 'silver'
              }} />
            </InputLeftElement>
            <Input value={value} onChange={t => setValue(t.target.value)} onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onFind && onFind(column_name as string, value)
              }
            }} />
            <InputRightElement>
              <CloseIcon h={'12px'} onClick={()=>{
                setValue("")
                onFind && onFind(column_name as string, "")
              }}/>
            </InputRightElement>
          </InputGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
