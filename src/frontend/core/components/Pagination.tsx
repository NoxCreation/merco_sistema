import {
  Pagination as ArkPagination,
  PaginationProps as ArkPaginationProps,
  PaginationEllipsis,
  PaginationListItem,
  PaginationNextPageTrigger,
  PaginationPageTrigger,
  PaginationPrevPageTrigger,
  usePaginationContext,
} from '@ark-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  Center,
  Flex,
  IconButton,
  List,
  ListItem,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export type PaginationProps = Omit<ArkPaginationProps, 'children'>

interface Props extends PaginationProps {
  page: number;
}

export const Pagination = (props: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  //const _props = props.paginationProps

  return (
    <ArkPagination {...props}>
      <PaginationMain {...props} />
    </ArkPagination>
  )
}

export const PaginationMain = (props: PaginationProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  const { onChange } = props

  return (
    <ArkPagination {...props} style={{ marginTop: '30px', marginBottom: "20px" }} page={props.page} onChange={(i) => {
      onChange && onChange(i)
    }}>
      {({ pages, page }) => (
        <List display="flex" justifyContent="space-between">
          <ListItem mr={2}>
            <PaginationPrevPageTrigger asChild >
              <Button colorScheme="cyan" color={"white"} size={'sm'}>
                <Flex gap={"8px"}>
                  <ArrowBackIcon />
                  <Text>Anterior</Text>
                </Flex>
              </Button>
            </PaginationPrevPageTrigger>
          </ListItem>

          <List display={{ base: 'none', md: 'flex' }} gap="1">
            {pages.map((page, index) => page.type === 'page' ? (
                <ListItem key={index}>
                  <PaginationPageTrigger asChild {...page}>
                    <Button
                      onClick={() => {
                        onChange && onChange({ page: page.value, pageSize: 10 })
                      }}
                      bg="transparent"
                      key={index}
                      color={'#00B5D8'}
                      border={'1px solid #00B5D8'}
                      _selected={{ bg: '#00B5D8', color: 'white' }}
                      _hover={{
                        bg: "#00B5D8",
                        color: 'white'
                      }}
                      size={'sm'}
                    >
                      {page.value}
                    </Button>
                  </PaginationPageTrigger>
                </ListItem>
              ) : (
                <ListItem mr={2} key={index} alignItems="center" display="flex">
                  <PaginationEllipsis index={index}>
                    <Button variant="secondary" borderRadius="full" pointerEvents="none" width="10" size={'sm'}>
                      &#8230;
                    </Button>
                  </PaginationEllipsis>
                </ListItem>
              ),
            )}
          </List>
          <ListItem as={Center} display={{ md: 'none' }}>
            <Text fontWeight="medium" color="fg.emphasized">
              Page {page} of {pages.length}
            </Text>
          </ListItem>

          <ListItem ml={2}>
            <PaginationNextPageTrigger asChild >
              <Button colorScheme="cyan" color={"white"} size={'sm'}>
                <Flex gap={"8px"}>
                  <ArrowForwardIcon />
                  <Text>Siguiente</Text>
                </Flex>
              </Button>
            </PaginationNextPageTrigger>
          </ListItem>
        </List>
      )}
    </ArkPagination>
  )
}