import {useParams} from "react-router-dom";
import {useAppContext} from "../router";
import {useEffect, useState} from "react";
import {navBar} from "./NavBar";
import {Button, Card, Drawer, Grid, Typography} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {AIAnalyst} from "../../components/AIAnalyst";

export const Space = () => {
    const params = useParams()
    const { setNavMenu, showToolbar } = useAppContext()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)

    useEffect(() => {
        setNavMenu(navBar)
        showToolbar(true)
    }, []);

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onClose = () => {
        setShorAiAnalyst(false)
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
    </>)
}