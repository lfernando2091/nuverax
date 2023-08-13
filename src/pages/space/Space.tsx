import {defer, useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadIcon from '@mui/icons-material/Upload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {AIAnalyst} from "../../components/ai-analyst/AIAnalyst";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useTranslation} from "react-i18next";
import {Suspend} from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {SpaceSkeleton} from "./skeleton/Skeleton";
import {spaceService} from "./services/SpaceService";
import {SpaceRes} from "./models/SpaceModel";
import {FileUploadOptions, UploadOption} from "../components/FileUploadOptions";
import {CloseResult, LocalUpload} from "../components/LocalUpload";

export const spaceLoader = async ({ params }: { params: any }) => {
    const { get } = spaceService()
    return defer({
        getPromise: get(params.idSpace)
    })
}

export const Space = () => {
    const { t } = useTranslation("spaceNS");
    const params = useParams()
    const apiService = useLoaderData() as any
    const navigate = useNavigate()
    const location = useLocation()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const [showFileUpload, setShowFileUpload] = useState(false)
    const [showRecipients, setShowRecipients] = useState(false)
    const [uploadOption, setUploadOption] = useState<UploadOption | null>(null)

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

    const onShowRecipients = () => {
        setShowRecipients(!showRecipients)
    }

    const onCloseUploadFile = (res?: CloseResult) => {
        setUploadOption(null)
    }

    return (<>
        <Suspend
            error={(_error) => <>
                <ApiError title={ t("spaceDocsApiError") }/>
            </>}
            fallback={<SpaceSkeleton/>}
            resolve={apiService.getPromise}>
            { (data: SpaceRes) => <>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                    { t("title") } {data.name}
                </Typography>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    {data.description}
                </Typography>
            </>}
        </Suspend>
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
        <Accordion expanded={showRecipients}
                   square
                   onChange={onShowRecipients}
                   variant="outlined">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    { t("recipientsHeader") }
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    0
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    <RecipientInput/>
                    <Button size="small" fullWidth startIcon={<PersonAddIcon />}>
                        { t("addRecipientBtn") }
                    </Button>
                </Grid>
            </AccordionDetails>
        </Accordion>
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

export const RecipientInput = () => {
    const { t } = useTranslation("spaceNS");
    const [type, setType] = useState("required-signature")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const onChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    }

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    return (<>
        <Grid item xs={12}>
            <Paper variant="outlined" square>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h4">
                    {t("recipientLbl")} 1
                </Typography>
                <Grid container rowSpacing={1}>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="input-email">{t("emailLbl")}</InputLabel>
                            <OutlinedInput
                                type="email"
                                id="input-email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder={t("emailPlaceholder")}
                                label={t("emailLbl")}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="lbl-recipient-type">{t("recipientType")}</InputLabel>
                            <Select
                                labelId="lbl-recipient-type"
                                id="input-recipient-type"
                                value={type}
                                label={t("recipientType")}
                                onChange={onChangeType}
                            >
                                <MenuItem value="required-signature">{t("signatureRequiredOpt")}</MenuItem>
                                <MenuItem value="carbon-copy">{t("ccOpt")}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1}>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="input-name">{t("fullNameLbl")}</InputLabel>
                            <OutlinedInput
                                type="text"
                                id="input-name"
                                placeholder="Fernando Abc Xyz"
                                label={t("fullNameLbl")}
                                value={name}
                                onChange={onChangeName}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </>)
}