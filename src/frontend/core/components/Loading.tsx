import { Flex, Spinner, Text } from "@chakra-ui/react"

export const Loading = ({ isLoading, adapted }: { isLoading: boolean, adapted?: boolean }) => {
    return (
        <>
            {isLoading && (
                <Flex
                    position={adapted ? 'absolute' : 'fixed'}
                    left={0}
                    top={0}
                    w={adapted ? '100%' : '100vw'}
                    h={adapted ? '100%' : '100vh'}
                    bg={adapted ? 'white' : '#ffffff00'}
                    backdropFilter="blur(10px)"
                    zIndex={999}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {/* <Spinner color="white" size={'lg'} /> */}
                    <div className="loader"></div>
                </Flex>
            )}
        </>
    )
}