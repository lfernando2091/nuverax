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
    const [loadFields, setLoadFields] = useState(false)
    const onLoadSuccess = (page: PDFDocumentProxy) => {
        setPages(page.numPages)
    }

    const onUpdate = (value: Field) => {
        setFields(fields
            .map((e) => e.id === value.id ? value: e))
    }

    const loadRecipientDocumentField = async () => {
        // TODO CALL API TO GET CURRENT FIELDS
        setFields([])
        setLoadFields(false)
    }

    const onFieldsLayerReady = () => {
        setLoadFields(true)
    }

    useEffect(() => {
        if (newField !== null) {
            setFields([...fields, newField])
            setNewField(null)
        }
    }, [newField])

    useEffect(() => {
        if (recipient !== "" && document !== "" && loadFields) {
            loadRecipientDocumentField().then()
        }
    }, [recipient, document, loadFields]);

    return (<>
        <PDFViewer page={page}
                   file={url}
                   onFieldsLayerReady={onFieldsLayerReady}
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