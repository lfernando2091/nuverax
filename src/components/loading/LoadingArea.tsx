import {Box, CircularProgress} from "@mui/material";
import {ReactNode} from "react";
import {green} from "@mui/material/colors";

export type LoadingArea = {
    loading: boolean,
    children: ReactNode
}

export const LoadingButtonArea = ({
                                loading,
                                children
                            }: LoadingArea) => {
  return (<>
      <Box sx={{ m: 1, position: 'relative' }}>
          { children }
          {loading && (
              <CircularProgress
                  size={24}
                  sx={{
                      color: green[500],
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                  }}
              />
          )}
      </Box>
  </>)
}