import {useEffect} from "react";
import {navBar} from "../NavBar";
import {useAppContext} from "../../router";
import {useParams} from "react-router-dom";

export const Document = () => {
    const params = useParams()
    const { setNavMenu } = useAppContext()

    useEffect(() => {
        setNavMenu(navBar)
    }, []);

    return (<>
        <h4>Document {params["id"]}</h4>
    </>)
}