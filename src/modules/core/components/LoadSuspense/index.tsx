import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Loading } from '../Loading'

export default function LoadSuspense(params: any) {
    const { load } = params
    const router = useRouter()
    const initialize = lazy(load)
    const [MModule, setModule] = useState(initialize as any)

    useEffect(() => {
        setModule(lazy(load))
    }, [load, router])

    return (
        <Suspense fallback={<Loading isLoading />}>
            <MModule />
        </Suspense>
    )
}