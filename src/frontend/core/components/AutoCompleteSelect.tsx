import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

type Props = {
  options: string[];
  onChange?: (newValue: string) => void;
};

export default function AutoCompleteSelect({ options, onChange }: Props) {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);
  const [isExpanded, setExpanded] = React.useState<boolean>(false);
  const [terms, setTerms] = React.useState<string>("");
  const [isNavigating, setIsNavigating] = React.useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const filteredOptions =
    terms.length > 0
      ? options.filter((option) =>
          option.toLowerCase().includes(terms.toLowerCase())
        )
      : options;

  function handleClick() {
    setExpanded(!isExpanded);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerms(event.target.value);
  }

  function handleSelect(option: string) {
    setTerms(option);
    onChange && onChange(option);
    setExpanded(false);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isNavigating) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setSelectedIndex(
          (prevIndex) => (prevIndex + 1) % filteredOptions.length
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setSelectedIndex(
          (prevIndex) =>
            (prevIndex - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;
      case "Enter":
        event.preventDefault();
        if (selectedIndex === -1) return;
        console.log(`Seleccionado: ${filteredOptions[selectedIndex]}`);
        setExpanded(false);
        setTerms(filteredOptions[selectedIndex]);
        setIsNavigating(false);

        break;
      default:
        break;
    }
  };

  return (
    <Box>
      <InputGroup onClick={handleClick}>
        <Input
          value={terms}
          ref={inputRef}
          onChange={handleChange}
          type="text"
          background={"white"}
          placeholder="Escribe..."
          onKeyDown={handleKeyDown}
        />
        <InputRightElement>
          {terms.length > 0 ? (
            <CloseIcon
              width={"10px"}
              onClick={() => {
                setTerms("");
                setIsNavigating(true);
                inputRef.current?.focus();
              }}
            />
          ) : (
            <ChevronDownIcon />
          )}
        </InputRightElement>
      </InputGroup>
      <Box position={"relative"} height={"fit-content"} ref={dropdownRef} >
        {isExpanded && (
          <Box
            position={"absolute"}
            maxHeight={"300px"}
            overflowY={"auto"}
            width={"full"}
            top={"6px"}
            padding={"10px"}
            background={"white"}
            left={0}
            rounded={"md"}
            border={"1px solid #eee"}
          >
            {filteredOptions.map((option, index) => (
              <Box
                width={"full"}
                as="button"
                key={index}
                padding={"5px"}
                rounded={"sm"}
                cursor={"pointer"}
                background={
                  selectedIndex === index ? "gray.100" : "transparent"
                }
                _hover={{ background: "gray.100" }}
                _focus={{ background: "gray.100" }}
                onClick={() => handleSelect(option)}
                textAlign={"start"}
              >
                <Text>{option}</Text>
              </Box>
            ))}
            {filteredOptions.length === 0 && (
              <Box padding={"5px"} rounded={"sm"} cursor={"pointer"}>
                <Text textStyle={"italic"} color={"gray.400"}>
                  No hay opciones
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
