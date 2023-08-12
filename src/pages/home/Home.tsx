import "./Home.css"
import {
    Alert,
    Button, Divider,
    Grid, IconButton, List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, Menu, MenuItem, Snackbar,
    Typography
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {MouseEvent, useEffect, useState, Suspense} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import {Await, useNavigate, defer, useLoaderData, LoaderFunction} from "react-router-dom";
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import {useTranslation} from "react-i18next";
import {spaceService} from "../space";
import {ApiError} from "../../components/error/Error";
import {RecentSpacesSkeleton} from "./skeleton/Skeleton";
import {SpaceRes} from "../space/models/SpaceModel";
import {green} from "@mui/material/colors";
import {useApiHelper} from "../../utils/ApiHelper";
import {LoadingButtonArea} from "../../components/loading/LoadingArea";

type SpaceItemProps = {
    spaceData: SpaceRes,
    onDeleteItem: (id: string) => void
}

export const SpaceItem = (props: SpaceItemProps) => {
    const { t } = useTranslation("homeNS");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate()

    const onClickSpace = (spaceId: string) => {
        navigate(`/s/${spaceId}`)
    }

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDelete = () => {
        handleClose()
        props.onDeleteItem(props.spaceData.id)
    }

    return (
        <ListItem
            secondaryAction={
                <>
                    <IconButton onClick={handleMenu} edge="end">
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu
                        elevation={1}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem dense>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>{t("editBtn")}</ListItemText>
                        </MenuItem>
                        <MenuItem dense>
                            <ListItemIcon>
                                <TextFieldsIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>{t("renameBtn")}</ListItemText>
                        </MenuItem>
                        <MenuItem dense>
                            <ListItemIcon>
                                <ContentCopyIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>{t("duplicateBtn")}</ListItemText>
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem dense onClick={onDelete}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>{t("deleteBtn")}</ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            } disablePadding>
            <ListItemButton onClick={() => onClickSpace(`${props.spaceData.shortId}`)}>
                <ListItemIcon>
                    <SmartButtonIcon />
                </ListItemIcon>
                <ListItemText primary={props.spaceData.name} />
            </ListItemButton>
        </ListItem>
    )
}

export const homeLoader = async () => {
    const waitUntil = new Promise((resolve, reject) => {
        // resolve(777);
    })
    const {
        list
    } = spaceService()
    return defer({
        spaceList: list(),
        waitUntil
    })
}

export const Home = () => {
    const [callCreateApi, setCallCreateApi] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const { t } = useTranslation("homeNS");
    const navigate = useNavigate()
    const [reloadLastSpaces, setReloadLastSpaces] = useState(false)
    const apiService = useLoaderData() as any
    const {
        create,
        del
    } = spaceService()

    const {
        loading,
        data: apiCreateData,
        error: apiCreateError
    } = useApiHelper(
        () => create({ }),
        {
            enabled: callCreateApi
        })

    useEffect(() => {
        if (apiCreateData !== null) {
            navigate(`/s/${apiCreateData.id}`)
        }
        if (apiCreateError) {
            setCallCreateApi(false)
            setOpenAlert(true)
        }
    }, [apiCreateData, apiCreateError]);

    const onCreateSpace = () => {
        setCallCreateApi(true)
    }

    const onCloseAlert = () => {
        setOpenAlert(false)
    }

    const buttonSuccessfulStyle = {
        ...(apiCreateData !== null && {
            bgcolor: green[500],
            color: "#fff",
            border: "0px",
            '&:hover': {
                bgcolor: green[700],
                border: "0px",
            },
        }),
    }

    const onDeleteItem = async (id: string) => {
        setReloadLastSpaces(true)
        await del(id)
        setReloadLastSpaces(false)
    }

    return <>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h4">
            { t("title") }
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={6} md={4}>
                <LoadingButtonArea loading={loading}>
                    <Button variant="outlined"
                            color="secondary"
                            sx={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                width: "100%",
                                ...buttonSuccessfulStyle
                            }}
                            disabled={loading}
                            onClick={onCreateSpace}
                            startIcon={<AddIcon />}>
                        { t("createSpaceBtn") }
                    </Button>
                </LoadingButtonArea>
                <Snackbar open={openAlert}
                          anchorOrigin={{ vertical: "top", horizontal: "right" }}
                          autoHideDuration={6000}
                          onClose={onCloseAlert}>
                    <Alert onClose={onCloseAlert} severity="error" sx={{ width: '100%' }}>
                        { t("createSpaceApiError") }
                    </Alert>
                </Snackbar>
            </Grid>
            <Grid item xs={6} md={4}>
            </Grid>
            <Grid item xs={6} md={4}>
            </Grid>
        </Grid>

        <List
            sx={{
                marginTop: "30px",
                width: '100%',
                bgcolor: 'background.paper'
        }}
            component="nav"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    { t("lastSpaceLbl") }
                </ListSubheader>
            }
        >
            {/*let data = useAsyncValue();*/}
            {!reloadLastSpaces &&
                <Suspense fallback={<RecentSpacesSkeleton/>}>
                    <Await
                        resolve={apiService.spaceList}
                        errorElement={<ApiError title={ t("recentSpacesApiError") }/>}
                    >
                        {(spaces: SpaceRes[]) => <>
                            {spaces.map((e, i) => (
                                <SpaceItem
                                    key={i}
                                    spaceData={e}
                                    onDeleteItem={onDeleteItem}/>
                            ))}
                        </>}
                    </Await>
                </Suspense>
            }
        </List>
    </>
}