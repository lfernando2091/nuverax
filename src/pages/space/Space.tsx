import {useParams} from "react-router-dom";
import {useEffect, useState, ChangeEvent} from "react";
import {
    Accordion, AccordionDetails, AccordionSummary,
    Box,
    Button,
    Card, Divider,
    Drawer, FormControl,
    Grid, IconButton, InputLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, TextField,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const Space = () => {
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const [showFileUpload, setShowFileUpload] = useState(false)
    const [showRecipients, setShowRecipients] = useState(false)

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

    const onShowRecipients = () => {
        setShowRecipients(!showRecipients)
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
        <Accordion expanded={showRecipients}
                   square
                   onChange={onShowRecipients}
                   variant="outlined">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Recipients
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
                        Add Recipient
                    </Button>
                </Grid>
            </AccordionDetails>
        </Accordion>
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

export const RecipientInput = () => {
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
                    Recipient 1
                </Typography>
                <Grid container rowSpacing={1}>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="input-email">Email</InputLabel>
                            <OutlinedInput
                                type="email"
                                id="input-email"
                                value={email}
                                onChange={onChangeEmail}
                                placeholder="example-email@domain.com"
                                label="Email"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="lbl-recipient-type">Recipient type</InputLabel>
                            <Select
                                labelId="lbl-recipient-type"
                                id="input-recipient-type"
                                value={type}
                                label="Recipient type"
                                onChange={onChangeType}
                            >
                                <MenuItem value="required-signature">Required Signature</MenuItem>
                                <MenuItem value="carbon-copy">Carbon Copy</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1}>
                    <Grid item xs={8}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="input-name">Full Name</InputLabel>
                            <OutlinedInput
                                type="text"
                                id="input-name"
                                placeholder="Fernando Abc Xyz"
                                label="Full Name"
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