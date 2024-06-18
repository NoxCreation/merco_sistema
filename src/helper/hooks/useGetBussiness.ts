import { useSession } from "next-auth/react"

export const useGetBussiness=()=>{
    const { data: data_session } = useSession()
    const businesses = data_session?.user.shop.businesses[0]
    return businesses
}