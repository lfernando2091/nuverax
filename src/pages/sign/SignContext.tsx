import {createContext, ReactNode, useContext, useState} from "react";
import {Introspect} from "../models/AuthorizationModel";

export type SignState = {
    introspect: Introspect | null
    setIntrospect: (value: Introspect) => void
}

export const SignContext = createContext<SignState>({
    introspect: null,
    setIntrospect: (_value: Introspect) => { }
})

export const useSignContext = () => useContext(SignContext)

type SignContextProviderProps = {
    children: ReactNode
}

export const SignContextProvider = ({ children }: SignContextProviderProps) => {
    const [introspect, setIntrospect] = useState<Introspect | null>(null)

    const setIntrospectValue = (value: Introspect) => {
        setIntrospect(value)
    }

    const value: SignState = {
        introspect,
        setIntrospect: setIntrospectValue
    }

    return (<SignContext.Provider value={value}>
        { children }
    </SignContext.Provider>)
}