import {Box, Grid, Paper, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

export const Document = () => {
    const params = useParams()

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
                    <Stack direction="row" spacing={2}>
                        <TopToolbar/>
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
    </>)
}

const TopToolbar = () => {
    return (<>
        <div>Hola</div>
    </>)
}