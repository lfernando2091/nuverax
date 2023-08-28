import {FieldType, PDFViewer, Signature} from "../../components/pdf-viewer";
import {useEditorContext} from "./EditorContext";
import {PDFDocumentProxy} from "pdfjs-dist";
import {useEffect, useMemo, useState} from "react";
import {If} from "../../components/common/IfStatement";
import {Alert} from "@mui/material";
import {useTranslation} from "react-i18next";
import {documentService} from "../services/DocumentService";
import {Options} from "react-pdf/src/shared/types";
import {authHeaders} from "../../@auth/SharedHeaders";
import {fieldService} from "../services/FieldService";
import {useParams} from "react-router-dom";
import {Field, FieldCreateReq, FieldUpdateBatchReq, FieldUpdateDataBatchReq} from "../models/FieldModel";

const url = "http://localhost:3000/assets/example-file.pdf"
const url2 = "http://localhost:3000/assets/example-file-2.pdf"

export const Editor = () => {
    const {
        pages,
        setPages,
        setPage,
        page,
        newField,
        setNewField,
        recipient,
        document,
        setChanges,
        changes,
        onSaveChanges,
        setOnSaveChanges
    } = useEditorContext()
    const params = useParams()
    const { getFields, batch } = fieldService()
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
        if (value.action === undefined) {
            value.action = "update"
        }
        setFields(fields
            .map((e) => e.uuId === value.uuId ? value: e))
        setChanges(true)
    }

    const loadRecipientDocumentField = async () => {
        const res = await getFields(
            params.idSpace!!,
            document,
            recipient,
            page
        )
        setFields(res)
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

    const onChangeDocument = () => {
        // TODO Add warning
        setChanges(false)
        setFields([])
        setPages(0)
        setPage(1)
        setFileUrl(downloadUrl(document, "INLINE").toString())
    }

    useEffect(() => {
        // onChangeDocument
        if (document !== "") {
            onChangeDocument()
        }
    }, [document]);

    const onSaveChangesEvent = async () => {
        const update: FieldUpdateDataBatchReq[] = []
        const create: FieldCreateReq[] = []
        const del: string[] = []
        fields.forEach((e) => {
            switch (e.action) {
                case "update":
                    update.push({
                        uuId: e.uuId,
                        position: e.position,
                        size: e.size
                    })
                    break;
                case "create":
                    create.push({
                        uuId: e.uuId,
                        spaceId: e.spaceId,
                        documentId: e.documentId,
                        recipientId: e.recipientId,
                        page: e.page,
                        type: e.type,
                        position: e.position,
                        size: e.size
                    })
                    break;
                case "delete":
                    del.push(e.uuId)
                    break;
            }
        })
        const data: FieldUpdateBatchReq = {
            update,
            create,
            delete: del
        }
        await batch(data)
        await loadRecipientDocumentField()
    }

    useEffect(() => {
        if (changes && onSaveChanges) {
            setOnSaveChanges(false)
            setChanges(false)
            onSaveChangesEvent().then()
        }
    }, [changes, onSaveChanges]);

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