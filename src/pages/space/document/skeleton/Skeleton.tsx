import {Skeleton} from "@mui/material";

export const PageContentSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "20px", minWidth: "500px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "500px" }} variant="rectangular" height={200} />
    </>)
}