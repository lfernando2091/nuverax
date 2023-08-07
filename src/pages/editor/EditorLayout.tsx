import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {
    Box,
    Button, Divider, FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListSubheader,
    MenuItem,
    Paper,
    Select, SelectChangeEvent,
    Typography
} from "@mui/material";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import {Link, Outlet, useParams, useSearchParams} from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {useState} from "react";
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from "@mui/icons-material/SmartButton";


export const EditorLayout = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const params = useParams()
    const [recipient, setRecipient] = useState("abc123")
    const [document, setDocument] = useState("abc123")

    const onChangeRecipient = (event: SelectChangeEvent) => {
        setRecipient(event.target.value as string)
    }
    const onChangeDocument = (event: SelectChangeEvent) => {
        setDocument(event.target.value as string)
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
                            Space {params["id"]}
                        </Typography>
                        <FormControl sx={{
                            marginTop: "20px",
                            width: "210px",
                            px: "16px"
                        }} size="small">
                            <InputLabel id="lbl-recipient-id">Recipient</InputLabel>
                            <Select
                                labelId="lbl-recipient-id"
                                id="input-recipient-id"
                                value={recipient}
                                label="Recipient"
                                onChange={onChangeRecipient}
                            >
                                <MenuItem value="abc123">Luis HHHHHH HHHHHH</MenuItem>
                                <MenuItem value="abc124">Fernando MMMMM MMMMM</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{
                            marginTop: "20px",
                            marginBottom: "20px",
                            width: "210px",
                            px: "16px"
                        }} size="small">
                            <InputLabel id="lbl-document-id">Document</InputLabel>
                            <Select
                                labelId="lbl-document-id"
                                id="input-document-id"
                                value={document}
                                label="Document"
                                onChange={onChangeDocument}
                            >
                                <MenuItem value="abc123">Document ABC1234</MenuItem>
                                <MenuItem value="abc124">Document XYZ0987</MenuItem>
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
                            <ListItemLink
                                to=""
                                disabled={false}
                                primary="Home"
                                active={true}
                                icon={<SmartButtonIcon/>}/>
                        </List>
                    </Grid>
                </Grid>
            </NavMenu>
            <MainContent>
                <Paper variant="outlined" square >
                    <IconButton size="small">
                        <ChromeReaderModeIcon />
                    </IconButton>
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
        </OneColumnLayout>
    </>)
}