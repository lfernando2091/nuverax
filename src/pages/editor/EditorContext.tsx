import {createContext, ReactNode, useContext, useState} from "react";

export type EditorState = {
    pages: number
    setPages: (value: number) => void
    page: number
    setPage: (value: number) => void
}

export const EditorContext = createContext<EditorState>({
    pages: 0,
    setPages: (_value: number) => { },
    page: 0,
    setPage: (_value: number) => { },
})

export const useEditorContext = () => useContext(EditorContext)

type EditorContextProviderProps = {
    children: ReactNode
}

export const EditorContextProvider = (props: EditorContextProviderProps) => {
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)

    const pageCount = (value: number) => {
        setPages(value)
    }

    const setPageNav = (value: number) => {
        setPage(value)
    }

    const state: EditorState = {
        pages,
        setPages: pageCount,
        page,
        setPage: setPageNav
    }
    return (<EditorContext.Provider value={state}>
        { props.children }
        </EditorContext.Provider>)
}