import {Box, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

export const Sign = () => {
    const params = useParams()
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
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                aaa
            </Typography>
        </Box>
    </>)
}