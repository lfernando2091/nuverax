import {Outlet, Route, Link, useParams, defer, useLoaderData} from "react-router-dom";
import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {Alert, Box, Button, Grid, IconButton, List, ListSubheader, Paper} from "@mui/material";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ArticleIcon from '@mui/icons-material/Article';
import {SpaceDocument} from "./models/SpaceModel";
import {useTranslation} from "react-i18next";
import {spaceService} from "./services/SpaceService";
import {Suspend} from "../../components/load/Suspend";
import {ApiError} from "../../components/error/Error";
import {NavDocumentsListSkeleton} from "./skeleton/Skeleton";

export const spaceLoader = async ({ params }: { params: any }) => {
    const { documents } = spaceService()
    return defer({
        documentsPromise: documents(params.idSpace)
    })
}

export const SpaceLayout = () => {
    const { t } = useTranslation("spaceNS");
    const params = useParams()
    const apiService = useLoaderData() as any

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
                        <Button size="small"
                                component={Link}
                                to="/"
                                sx={{ marginTop: "10px", marginBottom: "10px" }}
                                startIcon={<ArrowBackIosIcon />}>
                            { t("nav.backBtn") }
                        </Button>
                        <List dense
                              sx={{ marginBottom: "10px" }}
                              component="nav"
                              subheader={
                                  <ListSubheader component="div">
                                      { t("nav.spaceHeader") }
                                  </ListSubheader>
                              }>
                            <ListItemLink
                                to=""
                                end
                                disabled={false}
                                primary={ t("nav.homeBtn") }
                                icon={<SmartButtonIcon/>}/>
                        </List>
                        <List dense
                              sx={{ marginBottom: "10px" }}
                              component="nav"
                              subheader={
                                  <ListSubheader component="div">
                                      { t("nav.docsHeader") }
                                  </ListSubheader>
                              }>
                            <Suspend
                                resolve={apiService.documentsPromise}
                                error={(_error) => <>
                                    <ApiError title={ t("spaceDocsApiError") }/>
                                </>}
                                fallback={<NavDocumentsListSkeleton/>}>
                                { (data) => <>
                                    {(data as SpaceDocument[]).length === 0 &&
                                        <>
                                            <Alert severity="info">{ t("emptySpaceDocsList") }</Alert>
                                        </>
                                    }
                                    {(data as SpaceDocument[]).map((e, i) => (
                                        <ListItemLink
                                            key={i}
                                            to={`d/${e.shortId}`}
                                            disabled={false}
                                            primary={e.name}
                                            icon={<ArticleIcon/>}/>
                                    ))}
                                </>
                                }
                            </Suspend>
                        </List>
                    </Grid>
                </Grid>
            </NavMenu>
            <MainContent>
                <Paper variant="outlined" square >
                    <IconButton size="small">
                        <ChromeReaderModeIcon />
                    </IconButton>
                </Paper>
                <Box component="div" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '85vh',
                    flexGrow: 1,
                    p: 3
                }}>
                    <Outlet />
                </Box>
            </MainContent>
        </OneColumnLayout>
    </>)
}