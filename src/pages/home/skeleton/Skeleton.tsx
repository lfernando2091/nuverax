import {Skeleton} from "@mui/material";

export const RecentSpacesSkeleton = () => {
    return (<>
        <Skeleton sx={{ marginBottom: "20px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "20px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "20px" }} variant="rectangular" height={40} />
    </>)
}