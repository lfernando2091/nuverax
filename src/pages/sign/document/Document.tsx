import {Box, Button, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {useState} from "react";
import {AIAnalyst} from "../../../components/AIAnalyst";

export const Document = () => {
    const params = useParams()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onCloseAiAnalyst = () => {
        setShorAiAnalyst(false)
    }

    const onSelectTool = (type: ToolType) => {
        switch (type) {
            case "ai-analyst":
                onAiAnalyst()
                break
            case "mask-as-read":
                break
            default:
                break
        }
    }

    return (<>
        <Paper variant="outlined" square >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item></Grid>
                <Grid item>
                    <Stack
                        direction="row"
                        spacing={2}>
                        <TopToolbar onSelectTool={onSelectTool}/>
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
            <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                Document {params["id"]}
            </Typography>
        </Box>
        <AIAnalyst
            context={{
                title: params["id"] ?? "0",
                type: "document",
                id: "0"
            }}
            show={showAiAnalyst}
            onClose={onCloseAiAnalyst}/>
    </>)
}

type TopToolbarProps = {
    onSelectTool: (type: ToolType) => void
}

type ToolType = "ai-analyst" | "mask-as-read"

const TopToolbar = ({ onSelectTool }: TopToolbarProps) => {

    const onClickTool = (type: ToolType) => {
        onSelectTool(type)
    }

    return (<>
        <Button
            disableElevation
            size="small"
            sx={{
                borderRadius: "0px"
            }}
            onClick={() => onClickTool("ai-analyst")}
            startIcon={<AutoAwesomeIcon />}>
            AI Analyst
        </Button>
        <Button
            variant="contained"
            color="secondary"
            disableElevation
            size="small"
            onClick={() => onClickTool("mask-as-read")}
            sx={{
                borderRadius: "0px"
            }}>
            Mars as read
        </Button>
    </>)
}