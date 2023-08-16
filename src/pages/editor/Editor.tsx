import {Field, FieldType, PDFViewer, Signature} from "../../components/pdf-viewer";
import {useEditorContext} from "./EditorContext";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useEffect, useState} from "react";

const url = "http://localhost:3000/assets/example-file.pdf"

export const Editor = () => {
    const { setPages, page, newField, setNewField } = useEditorContext()
    const [fields, setFields] =
        useState<Field[]>([])
    const onLoadSuccess = (page: PDFDocumentProxy) => {
        setPages(page.numPages)
    }

    const onUpdate = (value: Field) => {
        setFields(fields
            .map((e) => e.id === value.id ? value: e))
    }

    useEffect(() => {
        if (newField !== null) {
            setFields([...fields, newField])
            setNewField(null)
        }
    }, [newField]);

    return (<>
        <PDFViewer page={page}
                   file={url}
                   onLoadSuccess={onLoadSuccess}>
            <>
                {fields.map((e, i) => {
                    switch (e.type) {
                        case FieldType.SIGNATURE:
                            return (<Signature
                                key={i}
                                data={e}
                                onUpdate={onUpdate}
                            />)
                    }
                    return (<></>)
                })}
            </>
        </PDFViewer>
    </>)
}