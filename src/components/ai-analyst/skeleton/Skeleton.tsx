import {Skeleton} from "@mui/material";

export const ChatSkeleton = () => {
    return (<>
        <Skeleton sx={{
            marginTop: "50px",
            marginBottom: "50px"
        }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
    </>)
}