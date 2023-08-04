import {useParams} from "react-router-dom";
import {useAppContext} from "../router";
import {useEffect} from "react";
import {navBar} from "./NavBar";
import {Button, Card, Grid, Typography} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from "@mui/icons-material/Delete";

export const Space = () => {
    const params = useParams()
    const { setNavMenu, showToolbar } = useAppContext()

    useEffect(() => {
        setNavMenu(navBar)
        showToolbar(true)
    }, []);

    return (<>
        <Typography sx={{ marginTop: "10px", marginBottom: "10px" }} variant="h6" component="h3">
            Space {params["id"]}
        </Typography>
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
                        startIcon={<AutoAwesomeIcon />}>
                    AI Space Analyst
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
                        startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </Grid>
            <Grid item xs={6} md={4}>
            </Grid>
        </Grid>
    </>)
}