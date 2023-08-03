import {useParams} from "react-router-dom";
import {useAppContext} from "../router";
import {useEffect} from "react";
import {navBar} from "./NavBar";

export const Space = () => {
    const params = useParams()
    const { setNavMenu } = useAppContext()

    useEffect(() => {
        setNavMenu(navBar)
    }, []);

    return (<>
        <h3>Space</h3>
        Space: {params["id"]}
    </>)
}