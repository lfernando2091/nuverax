import {SyntheticEvent, useEffect, useState} from "react";
import {defer, useLoaderData, useParams, useRouteError} from "react-router-dom";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
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

export const documentLoader = async ({ params }: { params: any }) => {
    const { get } = documentService()
    return defer({
        documentInfo: await get(params.idDocument)
    })
}

export const Document = () => {
    const { t } = useTranslation("spaceDocNS");
    const [expanded, setExpanded] = useState<string | false>("panel1")
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const apiService = useLoaderData() as any
    const documentInfo = apiService.documentInfo as DocumentResponse
    const [viewPageContent, setViewPageContent] = useState<number | null>(null)

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