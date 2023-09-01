import {Box, Button, Grid, Typography} from "@mui/material";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {useEffect, useState} from "react";
import {AIAnalyst} from "../../components/ai-analyst";
import {useSignContext} from "./SignContext";
import {spaceService} from "../services/SpaceService";
import {useApiHelper} from "../../utils/ApiHelper";
import {If} from "../../components/common/IfStatement";
import {SpaceContentSkeleton} from "./skeleton/Skeleton";
import {useTranslation} from "react-i18next";
import {ApiError} from "../../components/error/Error";
import {SpaceRes} from "../space/models/SpaceModel";
import {recipientService} from "../services/RecipientService";
import {Recipient} from "../space/models/RecipientModel";

export const Sign = () => {
    const { t } = useTranslation("signNS");
    const { introspect } = useSignContext()
    const params = useParams()
    const navigate = useNavigate()
    const [showAiAnalyst, setShorAiAnalyst] = useState(false)
    const { get: getSpace } = spaceService()
    const { get: getRecipient } = recipientService()
    const [searchParams, _] = useSearchParams()
    const token = searchParams.get("t")

    const onAiAnalyst = () => {
        setShorAiAnalyst(true)
    }

    const onCloseAiAnalyst = () => {
        setShorAiAnalyst(false)
    }

    const onSignDocuments = () => {
        navigate(`options?t=${token}`)
    }

    const {
        loading: spaceLoading,
        data: spaceData,
        error: spaceError
    } = useApiHelper<SpaceRes, Error>(
        () => getSpace(introspect!!.spaceId),
        { enabled: introspect !== null }
    )

    const {
        loading: recipientLoading,
        data: recipientData,
        error: recipientError
    } = useApiHelper<Recipient, Error>(
        () => getRecipient(introspect!!.recipientId),
        { enabled: introspect !== null }
    )

    return (<>
        <Box component="div" sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '85vh',
            flexGrow: 1,
            p: 3
        }}>
            <If condition={spaceLoading || recipientLoading}>
                <SpaceContentSkeleton/>
            </If>
            <If condition={spaceData !== null && recipientData !== null}>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
                    {`${t("spaceTxt")} `} {spaceData?.name}
                </Typography>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    {t("recipientWelcome")
                        .replace("{1}", recipientData?.fullName)}
                </Typography>
                <Typography sx={{ marginTop: "10px", marginBottom: "10px" }}>
                    {spaceData?.description}
                </Typography>
            </If>
            <If condition={spaceError !== undefined}>
                <ApiError title={ t("spaceDataError") }/>
            </If>
            <If condition={recipientError !== undefined}>
                <ApiError title={ t("recipientDataError") }/>
            </If>
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
                        {t("aiSpaceAnalyst")}
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
                        {t("signDocuments")}
                    </Button>
                </Grid>
            </Grid>
            <AIAnalyst
                context={{
                    title: params["idSpace"] ?? "0",
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