import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {
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
import {Link, Outlet, useParams, useSearchParams} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {ChangeEvent, useState} from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {SuccessfulModal} from "./components/Successful";
import {EditorContextProvider, useEditorContext} from "./EditorContext";
import {FieldType} from "../../components/pdf-viewer";
import {v4 as uuidv4} from 'uuid'
import {RecipientType, spaceService} from "../space";
import {SpaceRes} from "../space/models/SpaceModel";
import {useTranslation} from "react-i18next";
import { Suspend } from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {EditorTitleSkeleton} from "./skeleton/Skeleton";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface Option {
    name: string,
    value: string
}

interface RecipientOption extends Option {
    type: RecipientType
}

const recipients: RecipientOption[] = [
    { name: "ABC 1", value: "abc-a123", type: RecipientType.REQUIRED_SIGNATURE },
    { name: "ABC 2", value: "abc-a124", type: RecipientType.REQUIRED_SIGNATURE },
    { name: "ABC 3", value: "abc-a125", type: RecipientType.COPY },
    { name: "ABC 4", value: "abc-a126", type: RecipientType.COPY },
    { name: "ABC 5", value: "abc-a127", type: RecipientType.REQUIRED_SIGNATURE },
    { name: "ABC 6", value: "abc-a128", type: RecipientType.COPY }
]

const documents: Option[] = [
    { name: "Document 1", value: "abc-a123" },
    { name: "Document 2", value: "abc-a124" },
    { name: "Document 3", value: "abc-a125" },
    { name: "Document 4", value: "abc-a126" }
]

export const EditorView = () => {
    const {
        pages,
        setPage,
        page,
        setNewField,
        setRecipient,
        setDocument,
        document,
        recipient
    } = useEditorContext()
    const { get } = spaceService()
    const [searchParams, _setSearchParams] = useSearchParams()
    const params = useParams()
    const [succesful, setSuccessful] = useState(false)
    const getSpacePromise = () => get(params["idSpace"]!!)
    const { t } = useTranslation("spaceNS");

    const onChangeRecipient = (event: SelectChangeEvent) => {
        setRecipient(event.target.value as string)
    }
    const onChangeDocument = (event: SelectChangeEvent) => {
        setDocument(event.target.value as string)
    }

    const onSuccessful = () => {
        setSuccessful(true)
    }

    const onCloseSuccessfulDialog = () => {
        setSuccessful(false)
    }

    const onSelectPage = (value: number) => {
        setPage(value)
    }

    const onAddNewSignatureField = () => {
        setNewField({
            type: FieldType.SIGNATURE,
            id: uuidv4(),
            size: {
                h: 30,
                w: 100
            },
            position: {
                y: 0,
                x: 0
            },
            page,
            recipientId: recipient,
            documentId: document
        })
    }

    return (<>
        <OneColumnLayout>
            <NavMenu>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Grid item>
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
                                <ApiError title={ t("spaceDocsApiError") }/>
                            </>}
                            fallback={<EditorTitleSkeleton/>}
                            resolve={getSpacePromise}
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
                                        Space {data.name}
                                    </Typography>
                                </>
                            }
                        </Suspend>
                        <FormControl sx={{
                            marginTop: "20px",
                            width: "210px",
                            px: "16px"
                        }} size="small">
                            <InputLabel id="lbl-recipient-id">Recipient</InputLabel>
                            <Select
                                variant="standard"
                                labelId="lbl-recipient-id"
                                id="input-recipient-id"
                                value={recipient}
                                label="Recipient"
                                onChange={onChangeRecipient}
                            >
                                <ListSubheader>Signature Required</ListSubheader>
                                {recipients
                                    .filter((e, i) => e.type === RecipientType.REQUIRED_SIGNATURE)
                                    .map((e, i) => (
                                        <MenuItem key={i} value={ e.value }>{ e.name }</MenuItem>
                                    ))}
                                <ListSubheader>Receives a Copy</ListSubheader>
                                {recipients
                                    .filter((e, i) => e.type === RecipientType.COPY)
                                    .map((e, i) => (
                                        <MenuItem key={i} disabled value={ e.value }>{ e.name }</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            width: "210px",
                            px: "16px"
                        }} size="small" disabled={recipient === ""}>
                            <InputLabel id="lbl-document-id">Document</InputLabel>
                            <Select
                                variant="standard"
                                labelId="lbl-document-id"
                                id="input-document-id"
                                value={document}
                                label="Document"
                                onChange={onChangeDocument}
                            >
                                {documents.map((e, i) => (
                                    <MenuItem key={i} value={ e.value }>{ e.name }</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>

                        <Divider />

                        <List dense
                              sx={{ marginBottom: "10px" }}
                              component="nav"
                              subheader={
                                  <ListSubheader component="div">
                                      Fields
                                  </ListSubheader>
                              }>
                            <ListItemButton
                                onClick={onAddNewSignatureField}
                                selected={false}
                                disabled={document === ""}>
                                <ListItemIcon>{<DriveFileRenameOutlineIcon/>}</ListItemIcon>
                                <ListItemText primary="Signature"/>
                            </ListItemButton>
                            <ListItemButton
                                selected={false}
                                disabled={true}>
                                <ListItemIcon>{<CalendarMonthIcon/>}</ListItemIcon>
                                <ListItemText primary="Date"/>
                            </ListItemButton>
                            <ListItemButton
                                selected={false}
                                disabled={true}>
                                <ListItemIcon>{<TextFieldsIcon/>}</ListItemIcon>
                                <ListItemText primary="Name"/>
                            </ListItemButton>
                            <ListItemButton
                                selected={false}
                                disabled={true}>
                                <ListItemIcon>{<AlternateEmailIcon/>}</ListItemIcon>
                                <ListItemText primary="Email"/>
                            </ListItemButton>
                        </List>
                    </Grid>
                </Grid>
            </NavMenu>
            <MainContent>
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
                                <TopToolbar/>
                                <Button
                                    onClick={onSuccessful}
                                    endIcon={<ArrowForwardIcon />}
                                    variant="contained"
                                    size="small">
                                    Next
                                </Button>
                                <SuccessfulModal onClose={onCloseSuccessfulDialog} open={succesful}/>
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
            </MainContent>
            <NavMenu
                anchor="right"
                width={100}>
                <List dense
                      sx={{ marginBottom: "10px" }}
                      component="nav"
                      subheader={
                          <ListSubheader component="div">
                              Pages
                          </ListSubheader>
                      }>
                    {Array(pages).fill({ }).map((_e, i) => (
                            <ListItemButton
                                key={i}
                                onClick={() => onSelectPage(i + 1)}
                                selected={(i + 1) === page}
                                disabled={false}>
                                <ListItemText primary={`Page ${i + 1}`}/>
                            </ListItemButton>
                    ))}
                </List>
            </NavMenu>
        </OneColumnLayout>
    </>)
}

export const EditorLayout = () => {
    return (<>
        <EditorContextProvider>
            <EditorView/>
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