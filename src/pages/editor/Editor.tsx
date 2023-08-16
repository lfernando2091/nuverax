import {Field, FieldType, PDFViewer, Signature} from "../../components/pdf-viewer";
import {useEditorContext} from "./EditorContext";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useEffect, useState} from "react";

const url = "http://localhost:3000/assets/example-file.pdf"

export const Editor = () => {
    const {
        setPages,
        page,
        newField,
        setNewField,
        recipient,
        document
    } = useEditorContext()
    const [fields, setFields] =
        useState<Field[]>([])
    const onLoadSuccess = (page: PDFDocumentProxy) => {
        setPages(page.numPages)
    }

    const onUpdate = (value: Field) => {
        setFields(fields
            .map((e) => e.id === value.id ? value: e))
    }

    const loadRecipientDocumentField = async () => {
        setFields([])
    }

    useEffect(() => {
        if (newField !== null) {
            setFields([...fields, newField])
            setNewField(null)
        }
    }, [newField])

    useEffect(() => {
        if (recipient !== "" && document !== "") {
            loadRecipientDocumentField().then()
        }
    }, [recipient, document]);

    return (<>
        <PDFViewer page={page}
                   file={url}
                   onLoadSuccess={onLoadSuccess}>
            <>
                {fields
                    .filter((e) => e.page === page)
                    .map((e, i) => {
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