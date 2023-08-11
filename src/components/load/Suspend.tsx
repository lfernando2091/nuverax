import {ReactNode, useEffect, useState} from "react";
import * as React from "react";

interface ResolveRenderFunction<R = any> {
    (data: Awaited<R>): ReactNode
}

interface ErrorRenderFunction<E = any> {
    (error: E): ReactNode
}

type SuspendProps<R = any, E = any> = {
    render?: boolean
    fallback: ReactNode,
    idle?: ReactNode,
    resolve: Promise<R>,
    error?: ErrorRenderFunction<E>,
    children: ResolveRenderFunction<R>
}

export const Suspend = <R = any, E = any>({
                                     render = true,
                                              idle,
                            fallback,
                                              error: errorComponent,
                                     resolve,
                                     children
                        }: SuspendProps<R, E>) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<Awaited<R> | null>(null)
    const [error, setError] = useState<E | null>(null)
    const [idleState, setIdleState] = useState(true)
    const invokeResolve = async () => {
        setLoading(true)
        setData(null)
        setError(null)
        try {
            const res = await resolve
            setData(res)
            setLoading(false)
        } catch (e) {
            setError(e as E)
            setLoading(false)
        }
    }
    useEffect(() => {
        if (render) {
            setIdleState(false)
            invokeResolve().then()
        }
    }, [render]);

    return (<>
        {idle && idleState &&
            <>{ idle }</>
        }
        {loading &&
            <>{ fallback }</>
        }
        {!loading && error && errorComponent &&
            <>{ errorComponent(error) }</>
        }
        {!loading && data &&
            <>{ children(data) }</>
        }
    </>)
}