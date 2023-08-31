import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {Box, Grid, List, ListSubheader, Typography} from "@mui/material";
import {
    defer,
    LoaderFunctionArgs,
    Outlet,
    useLoaderData,
    useParams,
    useRouteError,
    useSearchParams
} from "react-router-dom";
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import {DocumentModel} from "../space/models/SpaceModel";
import ArticleIcon from "@mui/icons-material/Article";
import {authorizationService} from "../services/AuthorizationService";
import {useTranslation} from "react-i18next";
import { Suspend } from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {spaceService} from "../services/SpaceService";
import {useEffect, useState} from "react";
import {DocumentsSkeleton} from "./skeleton/Skeleton";
import {SignContextProvider, useSignContext} from "./SignContext";
const docsList: DocumentModel[] = [
    { id: "abc1", name: "Document 1" },
    { id: "abc2", name: "Document 2" },
    { id: "abc3", name: "Document 3" },
    { id: "abc4", name: "Document 4" },
    { id: "abc5", name: "Document 5" }
]
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
    useEffect(() => {
        setIntrospect(apiService.introspectResult)
        setGetDocuments(true)
    }, []);
    return (<>
        <OneColumnLayout>
            <NavMenu>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    sx={{
                        height: "100%"
                    }}
                >
                    <Grid item>
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
                                disabled={false}
                                primary={t("homeTxt")}
                                icon={<SmartButtonIcon/>}/>
                        </List>
                        <Suspend
                            render={getDocuments}
                            onReady={onDocumentsReady}
                            resolve={documentsPromise}
                            error={(_error) => <>
                                <ApiError title={ t("spaceDocsApiError") }/>
                            </>}
                            fallback={<DocumentsSkeleton/>}>
                            {(data) => <>
                                <List dense
                                      sx={{ marginBottom: "10px" }}
                                      component="nav"
                                      subheader={
                                          <ListSubheader component="div">
                                              {t("documentsTxt")}
                                          </ListSubheader>
                                      }>
                                    {data.map((e, i) => (
                                        <ListItemLink
                                            key={i}
                                            to={`d/${e.shortId}?t=${token}`}
                                            disabled={false}
                                            primary={e.name}
                                            icon={<ArticleIcon/>}/>
                                    ))}
                                </List>
                            </>}
                        </Suspend>
                    </Grid>
                </Grid>
            </NavMenu>
            <MainContent>
                <Outlet />
            </MainContent>
        </OneColumnLayout>
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