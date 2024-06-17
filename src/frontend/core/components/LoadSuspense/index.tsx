import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Loading } from '../Loading'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { usePermissions } from '@/helper/hooks/usePermissions'

export default function LoadSuspense(params: any) {
    const { load } = params
    //const initialize = lazy(load)
    const [loading, setLoading] = useState(true)
    const [MModule, setModule] = useState({} as any)
    const { status, data } = useSession()
    const pathname = usePathname()
    const perms = usePermissions()
    const router = useRouter()

    useEffect(() => {

        if (pathname != "/" && pathname != '/auth' && pathname != "/initial-config") {
            if (status != "unauthenticated") {
                if (Object.keys(perms).length > 0) {
                    // gestionar permisos
                    const {
                        view_box,
                        view_dashboard,
                        view_finance,
                        view_inventory,
                        view_orders,
                        view_sales,
                        view_transit
                    } = perms as any

                    let redirect = false
                    switch (pathname) {
                        case "/dashboard":
                            if (!view_dashboard) { router.push("/403"); redirect = true }
                            break
                        case "/inventario":
                            if (!view_inventory) { router.push("/403"); redirect = true }
                            break
                        case "/transito":
                            if (!view_transit) { router.push("/403"); redirect = true }
                            break
                        case "/ordenes":
                            if (!view_orders) { router.push("/403"); redirect = true }
                            break
                        case "/finances":
                            if (!view_finance) { router.push("/403"); redirect = true }
                            break
                        case "/sales":
                            if (!view_sales) { router.push("/403"); redirect = true }
                            break
                        case "/box":
                            if (!view_box) { router.push("/403"); redirect = true }
                            break
                        /* case "/configuration":
                            if (!view_dashboard) router.push("/403")
                            break */
                    }

                    if (!redirect) {
                        // cargar modulo
                        setModule(lazy(load))
                        setLoading(false)
                    }
                }
            }
        }
        else {
            setModule(lazy(load))
            setLoading(false)
        }
    }, [status, perms])

    return (
        <Suspense fallback={<Loading isLoading />}>
            {!loading ? <MModule /> : <Loading isLoading={true} />}
        </Suspense>
    )
}