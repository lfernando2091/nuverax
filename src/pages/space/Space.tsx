import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card, Divider,
    Drawer,
    Grid, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadIcon from '@mui/icons-material/Upload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {AIAnalyst} from "../../components/AIAnalyst";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import CloudIcon from '@mui/icons-material/Cloud';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ComputerIcon from '@mui/icons-material/Computer';
import CloseIcon from "@mui/icons-material/Close";

export const Space = () => {
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const [showFileUpload, setShowFileUpload] = useState(false)

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
    }

    const onOpenFileUpload = () => {
        setShowFileUpload(true)
    }

    const onCloseFileUpload = () => {
        setShowFileUpload(false)
    }

    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            Space {params["id"]}
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
                    AI Space Analyst
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
                    Upload Document
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
                    Request Sign
                </Button>
            </Grid>
        </Grid>
        <AIAnalyst
            context={{
                title: params["id"] ?? "0",
                type: "space",
                id: "0"
            }}
            show={showAiAnalyst}
            onClose={onClose}/>
        <FileUpload open={showFileUpload}
                    onClose={onCloseFileUpload}/>
    </>)
}

export type FileUploadProps = {
    open: boolean
    onClose: () => void
}
export const FileUpload  = ({
                                open,
                                onClose
                            }: FileUploadProps) => {
    const toggleDrawer = () => {
        onClose()
    }

    return (<>
        <Drawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer}
        >
            <Box
                sx={{ width: 'auto' }}
                role="presentation"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>
                        <IconButton size="small" onClick={toggleDrawer} >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography
                            sx={{ marginTop: "10px", marginBottom: "10px" }}
                            variant="h6"
                            component="h3">
                            Upload options
                        </Typography>
                    </Grid>
                </Grid>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ComputerIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Local File" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List dense>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <WhatsAppIcon/>
                            </ListItemIcon>
                            <ListItemText primary="WhatsApp" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddToDriveIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Google Drive" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CloudIcon/>
                            </ListItemIcon>
                            <ListItemText primary="DropBox" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CloudIcon/>
                            </ListItemIcon>
                            <ListItemText primary="OneDrive" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    </>)
}