import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {documentService} from "./services/DocumentService";
import {useTranslation} from "react-i18next";
import {ApiError} from "../../../components/error/Error";
import {Suspend} from "../../../components/load/Suspend";
import {PageContent as PageContentModel} from "./models/DocumentModel";
import {PageContentSkeleton} from "./skeleton/Skeleton";
import {useEffect, useState} from "react";

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
    const getPromise = Promise.all([get(documentId, { page: page })])

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        // setLoad(true)
    }, []);

    return (<>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>{ t("pageContentTitle")
                .replace("{NUMBER}", page)
            }</DialogTitle>
            <DialogContent dividers>
                <DialogContentText>
                    <Suspend
                        render={load}
                        resolve={getPromise}
                        error={(_error) => <>
                            <ApiError title={ t("spaceDocsApiError") }/>
                        </>}
                        fallback={<PageContentSkeleton/>}>
                        {(data) => <>
                            <Typography>
                                { (data as PageContentModel).text }
                            </Typography>
                        </>}
                    </Suspend>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    </>)
}