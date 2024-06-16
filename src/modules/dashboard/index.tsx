import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function OrdersScreen() {
  const session = useSession()

  useEffect(()=>{
    //console.log(session)
  }, [])

  return (
    <Flex
      paddingY={"20px"}
      marginY={"25px"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <h1>dashboard</h1>
    </Flex>
  )
}
