import {createContext, ReactNode, useContext, useState} from "react";
import {Field} from "../../components/pdf-viewer";

export type EditorState = {
    pages: number
    setPages: (value: number) => void
    page: number
    setPage: (value: number) => void
    newField: Field | null,
    setNewField: (value: Field | null) => void,
    recipient: string
    setRecipient: (value: string) => void
    document: string
    setDocument: (value: string) => void
}

export const EditorContext = createContext<EditorState>({
    pages: 0,
    setPages: (_value: number) => { },
    page: 0,
    setPage: (_value: number) => { },
    newField: null,
    setNewField: (_value: Field | null) => { },
    recipient: "",
    setRecipient: (_value: string) => { },
    document: "",
    setDocument: (_value: string) => { }
})

export const useEditorContext = () => useContext(EditorContext)

type EditorContextProviderProps = {
    children: ReactNode
}

export const EditorContextProvider = (props: EditorContextProviderProps) => {
    const [pages, setPages] = useState(0)
    const [page, setPage] = useState(1)
    const [newField, setNewField] = useState<Field | null>(null)
    const [recipient, setRecipient] = useState("")
    const [document, setDocument] = useState("")

    const pageCount = (value: number) => {
        setPages(value)
    }

    const setPageNav = (value: number) => {
        setPage(value)
    }

    const onAddNewField = (value: Field | null) => {
        setNewField(value)
    }

    const setCurrentRecipient = (value: string) => {
        setRecipient(value)
    }

    const setCurrentDocument = (value: string) => {
        setDocument(value)
    }

    const state: EditorState = {
        pages,
        setPages: pageCount,
        page,
        setPage: setPageNav,
        newField,
        setNewField: onAddNewField,
        document,
        setDocument: setCurrentDocument,
        recipient,
        setRecipient: setCurrentRecipient
    }
    return (<EditorContext.Provider value={state}>
        { props.children }
        </EditorContext.Provider>)
}