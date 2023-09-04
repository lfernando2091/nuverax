import {Alert, List, ListSubheader, Typography } from "@mui/material";
import {
    defer,
    LoaderFunctionArgs,
    Outlet,
    useLoaderData,
    useRouteError,
    useSearchParams
} from "react-router-dom";
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import ArticleIcon from "@mui/icons-material/Article";
import {authorizationService} from "../services/AuthorizationService";
import {useTranslation} from "react-i18next";
import { Suspend } from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {spaceService} from "../services/SpaceService";
import {useEffect, useState} from "react";
import {DocumentsSkeleton} from "./skeleton/Skeleton";
import {SignContextProvider, useSignContext} from "./SignContext";
import {If} from "../../components/common/IfStatement";
import {DashboardLayout} from "../common/DashboardLayout";

export const signLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const search = url.searchParams
    const token = search.get("t")
    if (token === null) {
        throw new Error("Missing 't' = Token param")
    }
    const { introspect } = authorizationService()
    return defer({
        introspectResult: await introspect(token)
    })
}

export const SignView = () => {
    const { setIntrospect } = useSignContext()
    const { t } = useTranslation("signNS");
    const { documents } = spaceService()
    const [searchParams, _] = useSearchParams()
    const token = searchParams.get("t")
    const [getDocuments, setGetDocuments] = useState(false)
    const apiService = useLoaderData() as any
    const documentsPromise = () => documents(apiService.introspectResult.spaceId)
    const onDocumentsReady = () => {
        setGetDocuments(false)
    }
    const triggerGetDocuments = () => {
        setGetDocuments(true)
    }
    useEffect(() => {
        setIntrospect(apiService.introspectResult)
    }, []);

    const onChangeScreenSize = (_isMobile: boolean) => {
        triggerGetDocuments()
    }

    const onOpenTemporalDrawer = () => {
        triggerGetDocuments()
    }

    return (<>
        <DashboardLayout
            onChangeScreenSize={onChangeScreenSize}
            onOpenTemporalDrawer={onOpenTemporalDrawer}
            navbar={<>
                <List dense
                      sx={{ marginBottom: "10px" }}
                      component="nav"
                      subheader={
                          <ListSubheader component="div">
                              {t("spaceTxt")}
                          </ListSubheader>
                      }>
                    <ListItemLink
                        to={`/sign?t=${token}`}
                        end
                        disabled={false}
                        primary={t("homeTxt")}
                        icon={<SmartButtonIcon/>}/>
                </List>
                <List dense
                      sx={{ marginBottom: "10px" }}
                      component="nav"
                      subheader={
                          <ListSubheader component="div">
                              {t("documentsTxt")}
                          </ListSubheader>
                      }>
                    <Suspend
                        render={getDocuments}
                        onReady={onDocumentsReady}
                        resolve={documentsPromise}
                        error={(_error) => <>
                            <ApiError title={ t("spaceDocsApiError") }/>
                        </>}
                        fallback={<DocumentsSkeleton/>}>
                        {(data) => <>
                            <If condition={data.length > 0}
                                elseRender={<Alert severity="info">{ t("emptySpaceDocsList") }</Alert>}>
                                {data.map((e, i) => (
                                    <ListItemLink
                                        key={i}
                                        to={`d/${e.shortId}?t=${token}`}
                                        disabled={false}
                                        primary={e.name}
                                        icon={<ArticleIcon/>}/>
                                ))}
                            </If>
                        </>}
                    </Suspend>
                </List>
            </>}>
            <Outlet />
        </DashboardLayout>
    </>)
}
export const SignLayout = () => {
    return (<SignContextProvider>
        <SignView/>
    </SignContextProvider>)
}

export const OnError = () => {
    const { t } = useTranslation("signNS");
    const error = useRouteError()
    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            { t("errorSignPageLoad") }
        </Typography>
    </>)
}