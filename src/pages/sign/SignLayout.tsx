import {MainContent, NavMenu, OneColumnLayout} from "../../@core";
import {Box, Grid, List, ListSubheader} from "@mui/material";
import {Outlet} from "react-router-dom";
import {ListItemLink} from "../../components/ListItemLink";
import SmartButtonIcon from "@mui/icons-material/SmartButton";
import {DocumentModel} from "../space/models/SpaceModel";
import ArticleIcon from "@mui/icons-material/Article";
const docsList: DocumentModel[] = [
    { id: "abc1", name: "Document 1" },
    { id: "abc2", name: "Document 2" },
    { id: "abc3", name: "Document 3" },
    { id: "abc4", name: "Document 4" },
    { id: "abc5", name: "Document 5" }
]
export const SignLayout = () => {
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
                                      Space
                                  </ListSubheader>
                              }>
                            <ListItemLink
                                to=""
                                disabled={false}
                                primary="Home"
                                active={true}
                                icon={<SmartButtonIcon/>}/>
                        </List>
                        <List dense
                              sx={{ marginBottom: "10px" }}
                              component="nav"
                              subheader={
                                  <ListSubheader component="div">
                                      Documents
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
                <Outlet />
            </MainContent>
        </OneColumnLayout>
    </>)
}