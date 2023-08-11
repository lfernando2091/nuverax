import {Skeleton} from "@mui/material";

export const PageContentSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "20px", minWidth: "80%" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
        <Skeleton sx={{ marginBottom: "10px", minWidth: "80%" }} variant="rectangular" height={20} />
    </>)
}