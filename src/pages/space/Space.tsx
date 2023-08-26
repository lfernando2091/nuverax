import {defer, useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {
    Button,
    Grid,
    LinearProgress,
    Typography
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadIcon from '@mui/icons-material/Upload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {AIAnalyst} from "../../components/ai-analyst";
import {useTranslation} from "react-i18next";
import {Suspend} from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {SpaceSkeleton} from "./skeleton/Skeleton";
import {spaceService} from "../services/SpaceService";
import {SpaceRes} from "./models/SpaceModel";
import {FileUploadOptions, UploadOption} from "../components/FileUploadOptions";
import {CloseResult, LocalUpload} from "../components/LocalUpload";
import {useAppContext} from "../../@core";
import {recipientService} from "../services/RecipientService";
import {Recipient, RecipientItem} from "./models/RecipientModel";
import {RecipientLayout} from "./components";

export const spaceLoader = async ({ params }: { params: any }) => {
    const { get } = spaceService()
    return defer({
        getPromise: get(params.idSpace)
    })
}
export const Space = () => {
    const { t } = useTranslation("spaceNS");
    const { onUpdateNavbar } = useAppContext()
    const params = useParams()
    const recipientServ = recipientService()
    const apiService = useLoaderData() as any
    const navigate = useNavigate()
    const location = useLocation()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const [showFileUpload, setShowFileUpload] = useState(false)
    const [uploadOption, setUploadOption] = useState<UploadOption | null>(null)
    const [recipients, setRecipients] =
        useState(0)
    const [renderRecipients, setRenderRecipients] = useState(false)

    const recipientsPromise = () => recipientServ.getAll(params["idSpace"]!!)

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
    }

    const onOpenFileUpload = () => {
        setShowFileUpload(true)
        setUploadOption(null)
    }

    const onStartEditor = () => {
        navigate(`/editor/${params["idSpace"]}?relay_state=${location.pathname}`)
    }

    const onCloseFileUpload = (option?: UploadOption) => {
        setShowFileUpload(false)
        if (option) {
            setUploadOption(option)
        }
    }

    const onCloseUploadFile = (res?: CloseResult) => {
        setUploadOption(null)
        if (res && res.shouldUpdate) {
            onUpdateNavbar(true)
        }
    }

    const onCountRecipients = (value: number) => {
        setRecipients(value)
    }

    return (<>
        <Suspend<SpaceRes, Error>
            error={(_error) => <>
                <ApiError title={ t("spaceDocsApiError") }/>
            </>}
            fallback={<SpaceSkeleton/>}
            resolve={() => apiService.getPromise}
            onReady={() => setRenderRecipients(true)}>
            { (data: SpaceRes) => <>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                    { t("title") } {data.name}
                </Typography>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    {data.description}
                </Typography>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    <Grid item xs={6} md={4}>
                        <Button variant="outlined"
                                color="secondary"
                                fullWidth
                                disableElevation
                                sx={{
                                    borderRadius: "0px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px"
                                }}
                                onClick={onAiAnalyst}
                                startIcon={<AutoAwesomeIcon />}>
                            { t("aiSpaceAnalystBtn") }
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
                                onClick={onOpenFileUpload}
                                startIcon={<UploadIcon />}>
                            { t("uploadDocBtn") }
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Button variant="outlined"
                                color="inherit"
                                fullWidth
                                disableElevation
                                disabled={recipients === 0}
                                sx={{
                                    borderRadius: "0px",
                                    paddingTop: "10px",
                                    paddingBottom: "10px"
                                }}
                                onClick={onStartEditor}
                                startIcon={<DriveFileRenameOutlineIcon />}>
                            { t("requestSign") }
                        </Button>
                    </Grid>
                </Grid>
            </>}
        </Suspend>

        <Suspend<Recipient[], Error>
            render={renderRecipients}
            error={(_error: Error) => <>
                <ApiError title={ t("errorRecipients") }/>
            </>}
            fallback={<LinearProgress />}
            resolve={recipientsPromise}
            onReady={() => setRenderRecipients(false)}>
            {(data: Recipient[]) => (
                <RecipientLayout onCountRecipients={onCountRecipients} recipients={data}/>
            )}
        </Suspend>

        <AIAnalyst
            context={{
                title: params["idSpace"] ?? "0",
                type: "space",
                id: params["idSpace"] ?? "0"
            }}
            show={showAiAnalyst}
            onClose={onClose}/>
        <LocalUpload
            show={uploadOption === UploadOption.LocalFile}
            accept={["application/pdf"]}
            service={spaceService()}
            extra={{
                spaceId: params["idSpace"] ?? "0"
            }}
            onClose={onCloseUploadFile}/>
        <FileUploadOptions open={showFileUpload}
                    onClose={onCloseFileUpload}/>
    </>)
}