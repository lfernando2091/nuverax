import {Box, Button, Grid, Paper, Stack, Typography} from "@mui/material";
import {defer, LoaderFunctionArgs, useLoaderData, useParams, useRouteError} from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {useState} from "react";
import {AIAnalyst} from "../../../components/ai-analyst";
import {useTranslation} from "react-i18next";
import {useApiHelper} from "../../../utils/ApiHelper";
import {documentService} from "../../services/DocumentService";
import {DocumentResponse, PageContent} from "../../space/document/models/DocumentModel";
import { If } from "../../../components/common/IfStatement";
import {ApiError} from "../../../components/error/Error";
import { Suspend } from "../../../components/load/Suspend";
import { DocumentSkeleton } from "../skeleton/Skeleton";

export const documentLoader = async ({ params }: LoaderFunctionArgs) => {
    const { get } = documentService()
    return defer({
        getDocumentPromise: await get(params["idDocument"]!!)
    })
}

export const Document = () => {
    const { t } = useTranslation("signNS");
    const apiService = useLoaderData() as any
    const { downloadUrl } = documentService()
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const documentInfo = apiService.getDocumentPromise as DocumentResponse
    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onCloseAiAnalyst = () => {
        setShorAiAnalyst(false)
    }

    const onSelectTool = (type: ToolType) => {
        switch (type) {
            case "ai-analyst":
                onAiAnalyst()
                break
            case "mask-as-read":
                break
            default:
                break
        }
    }

    return (<>
        <Paper variant="outlined" square >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item></Grid>
                <Grid item>
                    <Stack
                        direction="row"
                        spacing={2}>
                        <TopToolbar onSelectTool={onSelectTool}/>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
        <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85vh',
            flexGrow: 1,
            p: 3
        }}>
            <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                {t("documentTxt")} {documentInfo.title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { documentInfo.fileName }
            </Typography>
        </Box>
        <AIAnalyst
            context={{
                title: params["idDocument"] ?? "0",
                type: "document",
                id: "0"
            }}
            show={showAiAnalyst}
            onClose={onCloseAiAnalyst}/>
    </>)
}

type TopToolbarProps = {
    onSelectTool: (type: ToolType) => void
}

type ToolType = "ai-analyst" | "mask-as-read"

const TopToolbar = ({ onSelectTool }: TopToolbarProps) => {

    const onClickTool = (type: ToolType) => {
        onSelectTool(type)
    }

    return (<>
        <Button
            disableElevation
            size="small"
            sx={{
                borderRadius: "0px"
            }}
            onClick={() => onClickTool("ai-analyst")}
            startIcon={<AutoAwesomeIcon />}>
            AI Analyst
        </Button>
        <Button
            variant="contained"
            color="secondary"
            disableElevation
            size="small"
            onClick={() => onClickTool("mask-as-read")}
            sx={{
                borderRadius: "0px"
            }}>
            Mars as read
        </Button>
    </>)
}

export const OnError = () => {
    const { t } = useTranslation("signNS");
    const params = useParams()
    const error = useRouteError()
    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            { t("documentNotFound") } { params["idDocument"] }
        </Typography>
    </>)
}