import {useEffect, useState} from "react";

export type ApiHelperOptions = {
    enabled: boolean
}


export type ApiHelperResult<R = any, E = any> = {
    loading: boolean
    data: R | null
    error?: E
}

export const useApiHelper = <R = any, E = any>(
    fun: () => Promise<R>, options: ApiHelperOptions = { enabled: true }):
        ApiHelperResult<R, E> => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<R | null>(null)
    const [error, setError] = useState<E>()

    const invokeFun = async () => {
        setData(null)
        setError(undefined)
        try{
            setLoading(true)
            const result = await fun()
            setData(result)
        } catch (e) {
            setError(e as E)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (options.enabled) {
            invokeFun().then()
        }
    }, [options.enabled]);

    return {
        loading,
        data,
        error
    }
}