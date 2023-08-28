import {createContext, ReactNode, useContext, useState} from "react";
import { Field } from "../models/FieldModel";

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
    changes: boolean,
    setChanges: (value: boolean) => void
    onSaveChanges: boolean
    setOnSaveChanges: (value: boolean) => void
    selectedField: Field | null
    setSelectedField: (value: Field | null) => void
    onDeleteField: boolean
    setOndeleteField: (value: boolean) => void
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
    setDocument: (_value: string) => { },
    changes: false,
    setChanges: (_value: boolean) => { },
    onSaveChanges: false,
    setOnSaveChanges: _value => { },
    selectedField: null,
    setSelectedField: (_value: Field | null) => { },
    onDeleteField: false,
    setOndeleteField: (_value: boolean) => { }
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
    const [changes, setChanges] = useState(false)
    const [onSaveChanges, setOnSaveChanges] = useState(false)
    const [selectedField, setSelectedField] = useState<Field | null>(null)
    const [onDeleteField, setOndeleteField] = useState(false)

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

    const onChanges = (value: boolean) => {
        setChanges(value)
    }

    const onChangesEvent = (value: boolean) => {
        setOnSaveChanges(value)
    }

    const onSetSelectedFieldEvent = (value: Field | null) => {
        setSelectedField(value)
    }

    const setOndeleteFieldEvent = (value: boolean) => {
        setOndeleteField(value)
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
        setRecipient: setCurrentRecipient,
        changes,
        setChanges: onChanges,
        onSaveChanges,
        setOnSaveChanges: onChangesEvent,
        selectedField,
        setSelectedField: onSetSelectedFieldEvent,
        onDeleteField,
        setOndeleteField: setOndeleteFieldEvent
    }
    return (<EditorContext.Provider value={state}>
        { props.children }
        </EditorContext.Provider>)
}