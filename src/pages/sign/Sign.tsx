import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import UploadIcon from "@mui/icons-material/Upload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useState} from "react";
import {AIAnalyst} from "../../components/AIAnalyst";

export const Sign = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onCloseAiAnalyst = () => {
        setShorAiAnalyst(false)
    }

    const onSignDocuments = () => {
        navigate("options")
    }

    return (<>
        <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85vh',
            flexGrow: 1,
            p: 3
        }}>
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
                            onClick={onSignDocuments}
                            startIcon={<DriveFileRenameOutlineIcon />}>
                        Sign documents
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
                onClose={onCloseAiAnalyst}/>
            {/*<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>*/}
            {/*    aaa*/}
            {/*</Typography>*/}
        </Box>
    </>)
}