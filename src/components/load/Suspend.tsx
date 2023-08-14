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
    update?: boolean
    fallback: ReactNode,
    idle?: ReactNode,
    resolve?: Promise<R>,
    resolve2?: () => Promise<R>,
    error?: ErrorRenderFunction<E>,
    onReady?: () => void
    children: ResolveRenderFunction<R>
}

export const Suspend = <R = any, E = any>({
                                     render = true,
                                              update = false,
                                              idle,
                            fallback,
                                              error: errorComponent,
                                     resolve,
                                              resolve2,
                                              onReady,
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
            if (resolve) {
                const res = await resolve
                setData(res)
            } else if(resolve2){
                const res = await resolve2()
                setData(res)
            }
        } catch (e) {
            setError(e as E)
        }
        setLoading(false)
        if (onReady) {
            onReady()
        }
    }
    useEffect(() => {
        if (render) {
            setIdleState(false)
            invokeResolve().then()
        }
    }, [render]);

    useEffect(() => {
        if (update) {
            setIdleState(false)
            invokeResolve().then()
        }
    }, [update]);

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