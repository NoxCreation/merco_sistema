import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const usePermissions = () => {
    const session = useSession()

    const [permissions, setPermissions] = useState([] as Array<string>)

    useEffect(() => {
        if (session) {
            const { data } = session
            if (data) {
                const { permissions } = data['user']
                setPermissions(permissions)
            }
        }
    }, [session])

    return permissions
}