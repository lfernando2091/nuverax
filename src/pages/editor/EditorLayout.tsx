import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {
    Alert,
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputLabel,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Stack,
    styled,
    Typography
} from "@mui/material";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import {defer, Link, Outlet, useLoaderData, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {ChangeEvent, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {EditorContextProvider, useEditorContext} from "./EditorContext";
import {FieldType} from "../../components/pdf-viewer";
import {v4 as uuidv4} from 'uuid'
import {spaceService} from "../space";
import {SpaceDocument, SpaceRes} from "../space/models/SpaceModel";
import {useTranslation} from "react-i18next";
import {Suspend} from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {EditorRecipientSkeleton, EditorTitleSkeleton} from "./skeleton/Skeleton";
import {recipientService} from "../services/RecipientService";
import {Recipient, RecipientType} from "../space/models/RecipientModel";
import {If} from "../../components/common/IfStatement";
import SaveIcon from '@mui/icons-material/Save';
import {fieldService} from "../services/FieldService";
import { Field } from "../models/FieldModel";
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmDialog } from "../../components/dialog/ConfirmDialog";
import {notifyService} from "../services/NotifyService";
import { DashboardLayout } from "../common/DashboardLayout";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const editorLoader = async ({ params }: { params: any }) => {
    const { get } = spaceService()
    return defer({
        getPromise: get(params.idSpace)
    })
}

export type EditorViewProps = {
    getPromise: Promise<SpaceRes>
}

export const EditorView = ({
                               getPromise
                           }: EditorViewProps) => {
    const {
        pages,
        setPage,
        page,
        setNewField,
        setRecipient,
        setDocument,
        document,
        recipient,
        changes,
        setChanges,
        setOnSaveChanges,
        selectedField,
        setSelectedField,
        setOndeleteField
    } = useEditorContext()
    const { getAll } = recipientService()
    const { documents } = spaceService()
    const { get } = notifyService()
    const navigate = useNavigate()
    const [searchParams, _setSearchParams] = useSearchParams()
    const params = useParams()
    const [confirmDialog, setConfirmDialog] = useState(false)
    const [loadRecipients, setLoadRecipients] = useState(false)
    const promiseNotifyGet = () => get(params.idSpace!!)
    const getSpacePromise = () => getPromise
    const getAllRecipients = () => getAll(params.idSpace!!)
    const getDocuments = () => documents(params.idSpace!!)
    const { t } = useTranslation("editorNS");

    const onChangeRecipient = (event: SelectChangeEvent) => {
        // TODO Add warning
        setChanges(false)
        setSelectedField(null)
        setRecipient(event.target.value as string)
    }
    const onChangeDocument = (event: SelectChangeEvent) => {
        // TODO Add warning
        setChanges(false)
        setSelectedField(null)
        setDocument(event.target.value as string)
    }

    const onShowConfirm = () => {
        setConfirmDialog(true)
    }

    const onCloseSuccessfulDialog = (shouldUpdate?: boolean) => {
        setConfirmDialog(false)
        if (shouldUpdate) {
            navigate(`/s/${params["idSpace"]}`)
        }
    }

    const onSelectPage = (value: number) => {
        // TODO Add warning
        setChanges(false)
        setSelectedField(null)
        setPage(value)
    }

    const onAddNewSignatureField = () => {
        const newElement: Field = {
            spaceId: params.idSpace!!,
            type: FieldType.SIGNATURE,
            uuId: uuidv4(),
            size: {
                height: 30,
                width: 100
            },
            position: {
                y: 0,
                x: 0
            },
            page,
            recipientId: recipient,
            documentId: document,
            action: "create"
        }
        setNewField(newElement)
        setChanges(true)
    }

    const onSaveChanges = () => {
        setOnSaveChanges(true)
    }

    const onDeleteField = () => {
        setOndeleteField(true)
    }

    return (<>
        <DashboardLayout
            navbar={<>
                {searchParams.has("relay_state") &&
                    <>
                        <Button size="small"
                                component={Link}
                                to={searchParams.get("relay_state") ?? "/"}
                                sx={{ marginTop: "10px", marginBottom: "10px" }}
                                startIcon={<ArrowBackIosIcon />}>
                            Back
                        </Button>
                    </>
                }
                <Suspend<SpaceRes, Error>
                    error={(_error: Error) => <>
                        <ApiError title={ t("editorSpaceLoadError") }/>
                    </>}
                    fallback={<EditorTitleSkeleton/>}
                    resolve={getSpacePromise}
                    onReady={() => setLoadRecipients(true)}
                >
                    {(data: SpaceRes) =>
                        <>
                            <Typography sx={{
                                marginTop: "10px",
                                px: "16px"
                            }} variant="h6" component="h6">
                                Editor
                            </Typography>
                            <Typography sx={{
                                fontSize: 14,
                                px: "16px"
                            }} color="text.secondary" gutterBottom>
                                {t("editorSubtitle") + " "} {data.name}
                            </Typography>
                        </>
                    }
                </Suspend>
                <Suspend<Recipient[], Error>
                    render={loadRecipients}
                    error={(_error: Error) => <>
                        <ApiError title={ t("recipientsError") }/>
                    </>}
                    fallback={<EditorRecipientSkeleton/>}
                    resolve={getAllRecipients}
                >
                    { (data) => (
                        <>
                            <If condition={data.length > 0}
                                elseRender={<Alert severity="info">{ t("emptyRecipients") }</Alert>}>
                                <FormControl sx={{
                                    marginTop: "20px",
                                    width: "210px",
                                    px: "16px"
                                }} size="small">
                                    <InputLabel id="lbl-recipient-id">{t("recipientTxt")}</InputLabel>
                                    <Select
                                        variant="standard"
                                        labelId="lbl-recipient-id"
                                        id="input-recipient-id"
                                        value={recipient}
                                        label={t("recipientTxt")}
                                        onChange={onChangeRecipient}
                                    >
                                        <ListSubheader>{t("signatureRequiredTxt")}</ListSubheader>
                                        {data
                                            .filter((e, i) => e.type === RecipientType.REQUIRES_SIGNATURE)
                                            .map((e, i) => (
                                                <MenuItem key={i} value={ e.id }>{ e.fullName }</MenuItem>
                                            ))}
                                        <ListSubheader>{t("receivesCopyTxt")}</ListSubheader>
                                        {data
                                            .filter((e, i) => e.type === RecipientType.COPY)
                                            .map((e, i) => (
                                                <MenuItem key={i} disabled value={ e.id }>{ e.fullName }</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </If>
                        </>
                    ) }
                </Suspend>
                <Suspend<SpaceDocument[], Error>
                    render={loadRecipients}
                    error={(_error: Error) => <>
                        <ApiError title={ t("documentsError") }/>
                    </>}
                    fallback={<EditorRecipientSkeleton/>}
                    resolve={getDocuments}
                >
                    {(data) => (<FormControl sx={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "210px",
                        px: "16px"
                    }} size="small" disabled={recipient === ""}>
                        <InputLabel id="lbl-document-id">{t("documentTxt")}</InputLabel>
                        <Select
                            variant="standard"
                            labelId="lbl-document-id"
                            id="input-document-id"
                            value={document}
                            label={t("documentTxt")}
                            onChange={onChangeDocument}
                        >
                            {data.map((e, i) => (
                                <MenuItem key={i} value={ e.shortId }>{ e.name }</MenuItem>
                            ))
                            }
                        </Select>
                    </FormControl>)}
                </Suspend>

                <Divider />

                <List dense
                      sx={{ marginBottom: "10px" }}
                      component="nav"
                      subheader={
                          <ListSubheader component="div">
                              {t("fieldTxt") }
                          </ListSubheader>
                      }>
                    <ListItemButton
                        onClick={onAddNewSignatureField}
                        selected={false}
                        disabled={document === ""}>
                        <ListItemIcon>{<DriveFileRenameOutlineIcon/>}</ListItemIcon>
                        <ListItemText primary={t("signatureTxt")}/>
                    </ListItemButton>
                    <ListItemButton
                        selected={false}
                        disabled={true}>
                        <ListItemIcon>{<CalendarMonthIcon/>}</ListItemIcon>
                        <ListItemText primary={t("dateTxt")}/>
                    </ListItemButton>
                    <ListItemButton
                        selected={false}
                        disabled={true}>
                        <ListItemIcon>{<TextFieldsIcon/>}</ListItemIcon>
                        <ListItemText primary={t("nameTxt")}/>
                    </ListItemButton>
                    <ListItemButton
                        selected={false}
                        disabled={true}>
                        <ListItemIcon>{<AlternateEmailIcon/>}</ListItemIcon>
                        <ListItemText primary={t("emailTxt")}/>
                    </ListItemButton>
                </List>
            </>}
            rightNavbar={<>
                <NavMenu
                    anchor="right"
                    width={100}>
                    <List dense
                          sx={{ marginBottom: "10px" }}
                          component="nav"
                          subheader={
                              <ListSubheader component="div">
                                  {t("pagesTxt")}
                              </ListSubheader>
                          }>
                        {Array(pages).fill({ }).map((_e, i) => (
                            <ListItemButton
                                key={i}
                                onClick={() => onSelectPage(i + 1)}
                                selected={(i + 1) === page}
                                disabled={false}>
                                <ListItemText primary={`${t("pageTxt")} ${i + 1}`}/>
                            </ListItemButton>
                        ))}
                    </List>
                </NavMenu>
            </>}
            rightNavbarOpen={true}
            rightDrawerWidth={100}>
            <Paper
                sx={{ position: "sticky" }}
                variant="outlined" square>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <IconButton size="small">
                            <ChromeReaderModeIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2}>
                            {/*<TopToolbar/>*/}
                            <IconButton
                                disabled={selectedField === null}
                                onClick={onDeleteField}
                                color="primary"
                                size="small">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                onClick={onSaveChanges}
                                disabled={!changes}
                                color="primary"
                                size="small">
                                <SaveIcon />
                            </IconButton>
                            <Button
                                onClick={onShowConfirm}
                                endIcon={<ArrowForwardIcon />}
                                variant="contained"
                                size="small">
                                {t("sendBtn")}
                            </Button>
                            <ConfirmDialog
                                fun={promiseNotifyGet}
                                show={confirmDialog}
                                title={t("confirmRequestTitle")}
                                description={t("confirmRequestContent")}
                                cancelText={t("cancelBtn")}
                                confirmText={t("confirmBtn")}
                                closeText={t("closeBtn")}
                                errorText={t("errorNotifyRecipients")}
                                successText={t("successNotifyRecipients")}
                                onClose={onCloseSuccessfulDialog}
                            />
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
                <Outlet />
            </Box>
        </DashboardLayout>
    </>)
}

export const EditorLayout = () => {
    const apiService = useLoaderData() as any
    return (<>
        <EditorContextProvider>
            <EditorView getPromise={apiService.getPromise}/>
        </EditorContextProvider>
    </>)
}

const TopToolbar = () => {
    return (<>
        <LocationTool/>
        <SizeTool/>
    </>)
}

const LocationTool = () => {
    const [x, setX] = useState("0")
    const [y, setY] = useState("0")
    const onChangeX = (e: ChangeEvent<HTMLInputElement>) => {
        setX(e.target.value)
    }
    const onChangeY = (e: ChangeEvent<HTMLInputElement>) => {
        setY(e.target.value)
    }
    return (<>
        <Typography variant="h6" component="h6">
            X
        </Typography>
        <FormControl size="small">
            <Input
                type="number"
                id="pos-x"
                value={x}
                sx={{ width: "60px", height: "30px" }}
                onChange={onChangeX}
            />
        </FormControl>
        <Typography variant="h6" component="h6">
            Y
        </Typography>
        <FormControl size="small">
            <Input
                type="number"
                id="pos-y"
                value={y}
                sx={{ width: "60px", height: "30px" }}
                onChange={onChangeY}
            />
        </FormControl>
    </>)
}

const SizeTool = () => {
    const [w, setW] = useState("0")
    const [h, setH] = useState("0")
    const onChangeW = (e: ChangeEvent<HTMLInputElement>) => {
        setW(e.target.value)
    }
    const onChangeH = (e: ChangeEvent<HTMLInputElement>) => {
        setH(e.target.value)
    }
    return (<>
        <Typography variant="h6" component="h6">
            W
        </Typography>
        <FormControl size="small">
            <Input
                type="number"
                id="pos-w"
                value={w}
                sx={{ width: "60px", height: "30px" }}
                onChange={onChangeW}
            />
        </FormControl>
        <Typography variant="h6" component="h6">
            H
        </Typography>
        <FormControl size="small">
            <Input
                type="number"
                id="pos-h"
                value={h}
                sx={{ width: "60px", height: "30px" }}
                onChange={onChangeH}
            />
        </FormControl>
    </>)
}