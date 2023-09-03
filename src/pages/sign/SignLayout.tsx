import {MainContent, Header, NxMain, NxNavMenu, SimpleColumLayout, Footer, DrawerHeader} from "../../@core";
import {Alert, Box, Divider, Grid, IconButton, List, ListSubheader, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
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
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu'

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
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    const { setIntrospect } = useSignContext()
    const { t } = useTranslation("signNS");
    const { documents } = spaceService()
    const [searchParams, _] = useSearchParams()
    const token = searchParams.get("t")
    const [getDocuments, setGetDocuments] = useState(false)
    const apiService = useLoaderData() as any
    const [openNavbar, setOpenNavbar] = useState(!matches)
    const documentsPromise = () => documents(apiService.introspectResult.spaceId)
    const onDocumentsReady = () => {
        setGetDocuments(false)
    }
    const onCloseDrawer = (value: boolean) => {
        setOpenNavbar(value)
    }
    const triggerGetDocuments = () => {
        setGetDocuments(true)
    }
    useEffect(() => {
        setIntrospect(apiService.introspectResult)
    }, []);
    useEffect(triggerGetDocuments, [matches]);
    useEffect(() => {
        if (openNavbar && matches) {
            triggerGetDocuments()
        }
    }, [openNavbar]);
    return (<>
        <SimpleColumLayout
            header={<Header open={openNavbar} isMobile={matches} setOpenNavbar={onCloseDrawer}/>}
            navbar={<NxNavMenu open={openNavbar} isMobile={matches} onClose={onCloseDrawer}>
                <Box sx={{
                    overflowX: "hidden", overflowY: "visible"
                }}>
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
                </Box>
            </NxNavMenu>}>
            {/*<NavMenu></NavMenu>*/}
            <NxMain isMobile={matches} open={openNavbar}>
                <Toolbar variant="dense"/>
                <Outlet />
                <Footer/>
            </NxMain>
        </SimpleColumLayout>
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