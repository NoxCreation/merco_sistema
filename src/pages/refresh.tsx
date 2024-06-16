import { Loading } from "@/modules/core/components/Loading"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Refresh = () => {
    const router = useRouter()
    useEffect(() => {
        const load = async () => {
            await signOut({ callbackUrl: '/login', redirect: false })
            router.push("/login")
        }
        load()
    }, [])

    return <Loading isLoading />
}

export default Refresh
