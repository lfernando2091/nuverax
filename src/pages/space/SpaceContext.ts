import {createContext, useContext} from "react";

export type SpaceState = {

}

export const SpaceContext = createContext<SpaceState>({
})

export const useSpaceContext = () => useContext(SpaceContext)