import {Skeleton} from "@mui/material";

export const DocumentsSkeleton = () => (
    <>
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={30} />
    </>
)

export const SpaceContentSkeleton = () => (
    <>
        <Skeleton sx={{ marginBottom: "30px" }} variant="rectangular" height={40} />
        <Skeleton sx={{ marginBottom: "10px" }} variant="rectangular" height={20} />
    </>
)