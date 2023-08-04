import {Route} from "react-router-dom";
import {Space} from "./Space";
import {Document} from "./document/Document";

export const spaceRouter = () => (
    <>
        <Route index element={<Space />} />
        <Route path="d/:id" element={<Document />} />
    </>
)