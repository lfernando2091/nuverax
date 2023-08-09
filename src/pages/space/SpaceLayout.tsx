import {Outlet, Route, Link} from "react-router-dom";
import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {Box, Button, Grid, IconButton, List, ListSubheader, Paper} from "@mui/material";
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import ArticleIcon from '@mui/icons-material/Article';
import {DocumentModel} from "./models/SpaceModel";
import {useTranslation} from "react-i18next";

const docsList: DocumentModel[] = [
    { id: "abc1", name: "Document 1" },
    { id: "abc2", name: "Document 2" },
    { id: "abc3", name: "Document 3" },
    { id: "abc4", name: "Document 4" },
    { id: "abc5", name: "Document 5" }
]
export const SpaceLayout = () => {
    const { t } = useTranslation("spaceNS");
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
                                disabled={false}
                                primary={ t("nav.homeBtn") }
                                active={true}
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
                            {docsList.map((e, i) => (
                                <ListItemLink
                                    key={i}
                                    to={`d/${e.id}`}
                                    disabled={false}
                                    primary={e.name}
                                    active={false}
                                    icon={<ArticleIcon/>}/>
                            ))}
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