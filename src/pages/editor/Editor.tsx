import {Field, FieldType, PDFViewer, Signature} from "../../components/pdf-viewer";
import {useEditorContext} from "./EditorContext";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useEffect, useMemo, useState} from "react";
import {If} from "../../components/common/IfStatement";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import {documentService} from "../services/DocumentService";
import {Options} from "react-pdf/src/shared/types";
import {authHeaders} from "../../@auth/SharedHeaders";

const url = "http://localhost:3000/assets/example-file.pdf"
const url2 = "http://localhost:3000/assets/example-file-2.pdf"

export const Editor = () => {
    const {
        setPages,
        setPage,
        page,
        newField,
        setNewField,
        recipient,
        document
    } = useEditorContext()
    const { downloadUrl } = documentService()
    const { t } = useTranslation("editorNS");
    const [fields, setFields] =
        useState<Field[]>([])
    const [loadFields, setLoadFields] = useState(false)
    const [fileUrl, setFileUrl] = useState("")
    const includeAuthHeader = useMemo((): Options => (
        {
            cMapUrl: 'cmaps/',
            standardFontDataUrl: 'standard_fonts/',
            httpHeaders: {
                ...authHeaders()
            }
        }
    ), [document])
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

    useEffect(() => {
        if (document !== "") {
            setPages(0)
            setPage(1)
            setFileUrl(downloadUrl(document, "INLINE").toString())
        }
    }, [document]);

    return (<>
        <If condition={document !== "" && fileUrl !== ""}
        elseRender={<Alert severity="info">
            {t("selectRecipientAndDocumentInfo")}
        </Alert>}>
            <PDFViewer page={page}
                       file={fileUrl}
                       onFieldsLayerReady={onFieldsLayerReady}
                       onLoadSuccess={onLoadSuccess}
                       extraParams={includeAuthHeader}
            >
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
        </If>
    </>)
}