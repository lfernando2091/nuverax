import {SyntheticEvent, useEffect, useState} from "react";
import {defer, useLoaderData, useNavigate, useParams, useRouteError} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import DeleteIcon from '@mui/icons-material/Delete';
import {Page} from "./Page";
import {AIAnalyst} from "../../../components/ai-analyst/AIAnalyst";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useTranslation} from "react-i18next";
import {documentService} from "./services/DocumentService";
import {Suspend} from "../../../components/load/Suspend";
import {ApiError} from "../../../components/error/Error";
import {DocumentResponse} from "./models/DocumentModel";
import {PageContent} from "./PageContent";
import {useApiHelper} from "../../../utils/ApiHelper";
import {waitUntil} from "../../../utils/Utils";
import {useAppContext} from "../../../@core";

export const documentLoader = async ({ params }: { params: any }) => {
    const { get } = documentService()
    return defer({
        documentInfo: await get(params.idDocument)
    })
}

export const Document = () => {
    const { onUpdateNavbar } = useAppContext()
    const { del } = documentService()
    const navigate = useNavigate()
    const { t } = useTranslation("spaceDocNS");
    const [expanded, setExpanded] = useState<string | false>("panel1")
    const params = useParams()
    const deletePromise = () => del(params["idDocument"]!!)
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const apiService = useLoaderData() as any
    const documentInfo = apiService.documentInfo as DocumentResponse
    const [viewPageContent, setViewPageContent] = useState<number | null>(null)
    const [showDeleteConfirm, setShorDeleteConfirm] = useState(false)

    const handleChange =
        (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        }

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }
    const onViewPageContent = async (page: number) => {
        setViewPageContent(page)
    }

    const onCloseViewPageContent = () => {
        setViewPageContent(null)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
    }

    const onDelete = () => {
        setShorDeleteConfirm(true)
    }

    const onCloseDelete = (shouldUpdate?: boolean) => {
        setShorDeleteConfirm(false)
        if (shouldUpdate) {
            onUpdateNavbar(true)
            navigate(`/s/${params["idSpace"]}`)
        }
    }

    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            { t("title") } { documentInfo.title }
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { documentInfo.fileName }
        </Typography>
        <Grid container
              sx={{ marginTop: "10px", marginBottom: "10px" }}
              spacing={2}>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="secondary"
                        fullWidth
                        disableElevation
                        onClick={onAiAnalyst}
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<AutoAwesomeIcon />}>
                    { t("aiDocumentAnalystBtn") }
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="inherit"
                        fullWidth
                        disableElevation
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<DriveFileRenameOutlineIcon />}>
                    { t("editFieldsBtn") }
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
                <Button variant="outlined"
                        color="inherit"
                        fullWidth
                        disableElevation
                        onClick={onDelete}
                        sx={{
                            borderRadius: "0px",
                            paddingTop: "10px",
                            paddingBottom: "10px"
                        }}
                        startIcon={<DeleteIcon />}>
                    { t("deleteBtn") }
                </Button>
            </Grid>
        </Grid>
        <Accordion expanded={expanded === 'panel1'}
                   square
                   variant="outlined"
                   onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    { t("pagesHeader") }
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {documentInfo.pages}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    {Array(documentInfo.pages).fill({ }).map((e, i) => (
                        <Grid key={i} item xs={6} md={4}>
                            <Page pageNumber={i + 1} onViewContent={onViewPageContent}/>
                        </Grid>
                    ))}
                </Grid>
            </AccordionDetails>
        </Accordion>
        <ConfirmDialog
            fun={deletePromise}
            show={showDeleteConfirm}
            title={t("confirmDeleteTitle")}
            description={t("confirmDeleteDesc")}
            cancelText={t("cancelBtn")}
            confirmText={t("confirmBtn")}
            closeText={t("closeBtn")}
            errorText={t("errorDelete")}
            successText={t("successDelete")}
            onClose={onCloseDelete}/>
        <PageContent
            documentId={params["idDocument"] ?? "0"}
            open={viewPageContent !== null}
            page={viewPageContent ?? 0}
            onClose={onCloseViewPageContent}/>
        <AIAnalyst
            context={{
                title: params["idDocument"] ?? "0",
                type: "document",
                id: "0"
            }}
            show={showAiAnalyst}
            onClose={onClose}/>
    </>)
}

type DeleteDialogProps<R = any> = {
    show: boolean
    title: string
    description: string
    errorText?: string
    successText?: string
    cancelText?: string
    confirmText?: string
    closeText?: string
    onClose: (shouldUpdate?: boolean) => void
    fun:() => Promise<R>
}

export const ConfirmDialog = <R = any, E = any>({
                                   show,
                                  onClose,
                                  title,
                                  description,
                                                    errorText = "Error",
                                                    successText = "Success",
                                  cancelText = "Cancel",
                                  confirmText = "Confirm",
                                                    closeText = "Close",
                                       fun
                               }: DeleteDialogProps<R>) => {
    const [start, setStart] = useState(false)

    const {
        loading,
        data,
        error
    } = useApiHelper<R, E>(
        fun,
        {
            enabled: start
        }
    )

    const onCloseDialog = (e: any, reason: "backdropClick" | "escapeKeyDown") => {
        if (loading) {
            if (reason !== "backdropClick") {
                onNormalClose()
            }
        } else if (data){
            onSuccessClose()
        } else {
            onNormalClose()
        }
    }

    const onConfirmAction = () => {
        setStart(true)
    }

    const onNormalClose = () => {
        setStart(false)
        onClose()
    }

    const onSuccessClose = () => {
        setStart(false)
        onClose(true)
    }

    return (<>
        <Dialog keepMounted={true} disableEscapeKeyDown={loading} open={show} onClose={onCloseDialog}>
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent>
                { description }
                {loading &&
                    <LinearProgress />
                }
                {data &&
                    <Alert severity="success">{ successText }</Alert>
                }
                {error &&
                    <>
                        <ApiError title={ errorText }/>
                    </>
                }
            </DialogContent>
            <DialogActions>
                {data &&
                    <Button onClick={onSuccessClose}>
                        { closeText }
                    </Button>
                }
                {data === null &&
                    <>
                        <Button disabled={loading} onClick={() => onNormalClose()}>
                            { cancelText }
                        </Button>
                        {error === undefined &&
                            <Button disabled={loading} variant="outlined" onClick={onConfirmAction}>
                                { confirmText }
                            </Button>
                        }
                    </>
                }
            </DialogActions>
        </Dialog>
    </>)
}

export const OnError = () => {
    const { t } = useTranslation("spaceDocNS");
    const params = useParams()
    const error = useRouteError()
    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            { t("documentNotFound") } { params["idDocument"] }
        </Typography>
    </>)
}