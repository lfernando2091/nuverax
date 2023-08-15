import {defer, useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    FormControl,
    FormHelperText,
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
import {useSpaceContext} from "./SpaceContext";
import {useAppContext} from "../../@core";

enum RecipientType {
    REQUIRED_SIGNATURE = "required-signature",
    COPY = "copy"
}
type SelectOption = {
    name: string
    value: RecipientType
}

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
        if (res && res.shouldUpdate) {
            onUpdateNavbar(true)
        }
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
                    <Grid item xs={12}>
                        <RecipientInput
                            type={RecipientType.COPY}
                            name={""}
                            email={""}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" fullWidth startIcon={<PersonAddIcon />}>
                            { t("addRecipientBtn") }
                        </Button>
                    </Grid>
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

type RecipientInputProps = {
    type: RecipientType
    name: string
    email: string
}

const listOptions: SelectOption[] = [
    { name: "signatureRequiredOpt", value: RecipientType.REQUIRED_SIGNATURE },
    { name: "ccOpt", value: RecipientType.COPY }
]

const RecipientInput = ({
                                   type: typeInput = RecipientType.REQUIRED_SIGNATURE,
                                   name: nameInput,
                                   email: emailInput
                               }: RecipientInputProps) => {
    const { t } = useTranslation("spaceNS");
    const [type, setType] = useState(typeInput.valueOf())
    const [name, setName] = useState(nameInput)
    const [email, setEmail] = useState(emailInput)
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
            <Paper sx={{ p: "10px" }} variant="outlined" square>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h4">
                    {t("recipientLbl")} 1
                </Typography>
                <Grid container spacing={2}>
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
                            <FormHelperText id="input-email-helper-text">
                                { t("emailInputHelper")}
                            </FormHelperText>
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
                                {listOptions.map((e, i) => (
                                    <MenuItem value={e.value.valueOf()}>{t(e.name)}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText id="input-name-helper-text">
                                { t("recipientInputHelper")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
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
                            <FormHelperText id="input-name-helper-text">
                                { t("fullNameInputHelper")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
    </>)
}