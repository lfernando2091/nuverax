import {
    Box, Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ComputerIcon from "@mui/icons-material/Computer";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import CloudIcon from "@mui/icons-material/Cloud";

export enum UploadOption {
    LocalFile = "local-file"
}

export type FileUploadOptionsProps = {
    open: boolean
    onClose: (option?: UploadOption) => void
}
export const FileUploadOptions  = ({
                                open,
                                onClose
                            }: FileUploadOptionsProps) => {
    const toggleDrawer = () => {
        onClose()
    }

    const onSelectOption = (option: UploadOption) => {
        onClose(option)
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
                        <ListItemButton onClick={() => onSelectOption(UploadOption.LocalFile)}>
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