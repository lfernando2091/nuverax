import {useParams} from "react-router-dom";

export const Space = () => {
    const params = useParams()
    return (<>
        <h3>Space</h3>
        Space: {params["id"]}
    </>)
}