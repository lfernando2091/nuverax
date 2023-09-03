import {createContext, ReactNode, useContext, useState} from "react";
import {Introspect} from "../models/AuthorizationModel";

export type SignState = {
    introspect: Introspect | null
    setIntrospect: (value: Introspect) => void
    setConfirmSignature: (value: Blob | null) => void
    confirmSignature: Blob | null
}

export const SignContext = createContext<SignState>({
    introspect: null,
    setIntrospect: (_value: Introspect) => { },
    confirmSignature: null,
    setConfirmSignature: (_value: Blob | null) => { }
})

export const useSignContext = () => useContext(SignContext)

type SignContextProviderProps = {
    children: ReactNode
}

export const SignContextProvider = ({ children }: SignContextProviderProps) => {
    const [introspect, setIntrospect] = useState<Introspect | null>(null)
    const [confirmSignature, setConfirmSignature] = useState<Blob | null>(null)

    const setIntrospectValue = (value: Introspect) => {
        setIntrospect(value)
    }

    const setConfirmSignatureValue = (value: Blob | null) => {
        setConfirmSignature(value)
    }

    const value: SignState = {
        introspect,
        setIntrospect: setIntrospectValue,
        confirmSignature,
        setConfirmSignature: setConfirmSignatureValue
    }

    return (<SignContext.Provider value={value}>
        { children }
    </SignContext.Provider>)
}