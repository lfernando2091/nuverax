import {defer, useLoaderData, useLocation, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Alert,
    Button,
    FormControl,
    FormHelperText,
    Grid, IconButton,
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
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppContext} from "../../@core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

enum RecipientType {
    REQUIRED_SIGNATURE = "required-signature",
    COPY = "copy"
}
type SelectOption = {
    name: string
    value: RecipientType
}
type RecipientItem = {
    email: string
    name: string
    type: RecipientType
}
export const spaceLoader = async ({ params }: { params: any }) => {
    const { get } = spaceService()
    return defer({
        getPromise: get(params.idSpace)
    })
}

const newEmptyRecipient: RecipientItem =
    { name: "", email: "", type: RecipientType.REQUIRED_SIGNATURE }

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
    const [recipients, setRecipients] =
        useState<RecipientItem[]>([ newEmptyRecipient ])
    const MAX_RECIPIENTS = 5

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

    const onUpdateRecipient = (index: number, newValue: RecipientItem) => {
        setRecipients(recipients.map((e, i) => i === index ? newValue : e))
    }

    const onRemoveItem = (index: number) => {
        setRecipients(recipients.filter((_e, i) => i !== index))
    }

    const addNewRecipient = () => {
        if (recipients.length < MAX_RECIPIENTS) {
            setRecipients([...recipients, newEmptyRecipient])
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
                    { recipients.length }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container
                      sx={{ marginTop: "10px", marginBottom: "10px" }}
                      spacing={2}>
                    <Grid item xs={12}>
                        {recipients.length === 0 &&
                            <Alert severity="info">
                                {t("emptyRecipients")}
                            </Alert>
                        }
                        {recipients.map((e, i) => (
                            <RecipientInput
                                key={i}
                                index={i}
                                value={e}
                                onRemove={onRemoveItem}
                                onUpdateRecipient={onUpdateRecipient}/>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button size="small" fullWidth startIcon={<PersonAddIcon />}
                                onClick={addNewRecipient}>
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
    index: number
    value: RecipientItem
    onUpdateRecipient: (index: number, value: RecipientItem) => void
    onRemove: (index: number) => void
}

const listOptions: SelectOption[] = [
    { name: "signatureRequiredOpt", value: RecipientType.REQUIRED_SIGNATURE },
    { name: "ccOpt", value: RecipientType.COPY }
]

const RecipientInput = ({
                            index,
                            value,
                            onUpdateRecipient,
                            onRemove
}: RecipientInputProps) => {
    const { t } = useTranslation("spaceNS");
    const onChangeType = (event: SelectChangeEvent) => {
        const strVal = event.target.value as string
        onUpdateRecipient(index, {
            ...value,
            type: strVal as RecipientType
        })
    }

    const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdateRecipient(index, {
            ...value,
            name: event.target.value
        })
    }

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        onUpdateRecipient(index, {
            ...value,
            email: event.target.value
        })
    }

    return (<>
            <Paper sx={{ p: "10px" }} variant="outlined" square>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h4">
                            {t("recipientLbl")}{" " + (index + 1)}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <IconButton size="small" onClick={() => onRemove(index)} >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-email-${index}`}>{t("emailLbl")}</InputLabel>
                            <OutlinedInput
                                type="email"
                                id={`input-email-${index}`}
                                value={value.email}
                                onChange={onChangeEmail}
                                placeholder={t("emailPlaceholder")}
                                label={t("emailLbl")}
                            />
                            <FormHelperText>
                                { t("emailInputHelper")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id={`lbl-recipient-type-${index}`}>{t("recipientType")}</InputLabel>
                            <Select
                                labelId={`lbl-recipient-type-${index}`}
                                value={value.type}
                                label={t("recipientType")}
                                onChange={onChangeType}
                            >
                                {listOptions.map((e, i) => (
                                    <MenuItem key={i} value={e.value}>{t(e.name)}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                                { t("recipientInputHelper")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor={`input-name-${index}`}>{t("fullNameLbl")}</InputLabel>
                            <OutlinedInput
                                type="text"
                                id={`input-name-${index}`}
                                placeholder="Fernando Abc Xyz"
                                label={t("fullNameLbl")}
                                value={value.name}
                                onChange={onChangeName}
                            />
                            <FormHelperText>
                                { t("fullNameInputHelper")}
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>
    </>)
}