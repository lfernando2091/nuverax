import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {documentService} from "./services/DocumentService";
import {useTranslation} from "react-i18next";
import {ApiError} from "../../../components/error/Error";
import {Suspend} from "../../../components/load/Suspend";
import {PageContent as PageContentModel} from "./models/DocumentModel";
import {PageContentSkeleton} from "./skeleton/Skeleton";
import {useEffect, useState} from "react";
import {useApiHelper} from "../../../utils/ApiHelper";

type PageContentProps = {
    documentId: string
    page: number
    open: boolean
    onClose: () => void
}

export const PageContent = ({
                                documentId,
                                page,
                                open = true,
                                onClose
                            }: PageContentProps) => {
    const { get } = documentService()
    const { t } = useTranslation("spaceDocNS");
    const [load, setLoad] = useState(false)

    const { loading, data, error } = useApiHelper(
        () => get(documentId, { page: page }),
        { enabled: load }
    )

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        if (open) {
            setLoad(true)
        } else {
            setLoad(false)
        }
    }, [open]);

    return (<>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{ t("pageContentTitle")
                .replace("{NUMBER}", page)
            }</DialogTitle>
            <DialogContent dividers>
                {loading &&
                    <PageContentSkeleton/>
                }
                {!loading && error &&
                    <ApiError title={ t("pageContentNotFound") }/>
                }
                {!loading && data &&
                    <DialogContentText>
                        { (data as PageContentModel).text }
                    </DialogContentText>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{ t("closeBtn") }</Button>
            </DialogActions>
        </Dialog>
    </>)
}