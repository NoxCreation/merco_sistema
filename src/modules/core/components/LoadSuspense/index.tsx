import { useRouter } from 'next/router'
import { Suspense, lazy, useEffect, useState } from 'react'
import { Loading } from '../Loading'

export default function LoadSuspense(params: any) {
    const { load } = params
    //const initialize = lazy(load)
    const [loading, setLoading] = useState(true)
    const [MModule, setModule] = useState({} as any)

    useEffect(() => {
        setModule(lazy(load))
        setLoading(false)
    }, [])

    return (
        <Suspense fallback={<Loading isLoading />}>
            {!loading ? <MModule /> : <Loading isLoading={true} />}
        </Suspense>
    )
}