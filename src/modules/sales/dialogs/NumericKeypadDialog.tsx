import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@/frontend/core/icons/CloseIcon";

interface Props {
  initValue: number
  isOpen: boolean
  max?: number
  isDecimal?: boolean
  onClose: () => void
  onEnter: (value: string) => void
};

export default function NumericKeypadDialog({ isOpen, initValue, max, isDecimal, onClose, onEnter }: Props) {
  const [value, setValue] = useState("0" as string)
  const value_ref = useRef(value)
  const max_ref = useRef(max)
  const isDecimal_ref = useRef(isDecimal)

  useEffect(() => {
    value_ref.current = value
    max_ref.current = max
    isDecimal_ref.current = isDecimal
  }, [value, max, isDecimal])

  useEffect(() => {
    if (isOpen) {
      setValue(initValue ? `${initValue}` : "0")
    }
  }, [isOpen])

  // Para detectar cuando se presiona esc
  useEffect(() => {
    const handleInputKeyboard = (evento: any) => {
      //console.log(evento.key)
      switch (evento.key) {
        case "Backspace":
          if (value_ref.current.length == 1) {
            setValue("0")
            break
          }
          setValue(value_ref.current.slice(0, value_ref.current.length - 1))
          break
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
          if (value_ref.current == "0") {
            value_ref.current = ""
          }
          if (evento.key == ".") {
            if (value_ref.current.includes('.'))
              break
            if(!isDecimal_ref.current)
              break
          }
          if (max_ref.current && parseFloat(`${value_ref.current}${evento.key}`) <= max_ref.current)
            setValue && setValue(`${value_ref.current}${evento.key}`)
          break
        case "Enter":
          onEnter && onEnter(value_ref.current)
          onClose()
          break
      }
    }
    window.addEventListener('keydown', handleInputKeyboard);
    return () => {
      window.removeEventListener('keydown', handleInputKeyboard);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="#00000030" backdropFilter="blur(10px)" />
      <ModalContent w={'fit-content'}>
        <ModalCloseButton />
        <ModalBody mt={8}>
          <Flex py={'10px'} h={'65px'} w={'100%'} justifyContent={'end'}>
            <Text
              fontWeight={600}
              color={'gray.600'}
              fontSize={'30px'}
              textAlign={'end'}
            >{value}</Text>
            {max && (
              <Flex alignItems={'end'}>
                <Text h={'fit-content'} color={'cyan.400'}>
                  /{max}
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex gap={'10px'} flexDir={'column'} pb={5}>
            <Flex gap={'20px'}>
              <DigitButton
                bg={"blue.300"}
                icon={<CloseIcon />}
              />
              <DigitButton
                bg={"cyan.300"}
                value="9"
              />
              <DigitButton
                bg={"cyan.300"}
                value="8"
              />
            </Flex>
            <Flex gap={'20px'}>
              <DigitButton
                bg={"cyan.300"}
                value="7"
              />
              <DigitButton
                bg={"cyan.300"}
                value="6"
              />
              <DigitButton
                bg={"cyan.300"}
                value="5"
              />
            </Flex>
            <Flex gap={'20px'}>
              <DigitButton
                bg={"cyan.300"}
                value="4"
              />
              <DigitButton
                bg={"cyan.300"}
                value="3"
              />
              <DigitButton
                bg={"cyan.300"}
                value="2"
              />
            </Flex>
            <Flex gap={'20px'}>
              <DigitButton
                bg={"cyan.300"}
                value="1"
              />
              <DigitButton
                isDisabled={!isDecimal}
                bg={"cyan.300"}
                value="0"
              />
              <DigitButton
                bg={"cyan.300"}
                value="."
              />
            </Flex>
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}

interface PropsDigitButton {
  isDisabled?: boolean
  bg: string
  value?: string
  icon?: any
}

const DigitButton = ({ isDisabled, bg, value, icon }: PropsDigitButton) => {
  return (
    <Flex
      w={'60px'}
      h={'60px'}
      fontWeight={600}
      bg={isDisabled ? 'gray.300' : bg}
      fontSize={'25px'}
      color={'gray.50'}
      borderRadius={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      cursor={isDisabled ? 'no-drop' : 'pointer'}
      filter={isDisabled ? "brightness(1.0)" : ''}
      _hover={{
        filter: !isDisabled ? "brightness(0.90)" : ''
      }}
    >
      {value ? value : icon}
    </Flex>
  )
}
