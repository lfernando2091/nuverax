import React from 'react';
import './App.css';
import {AppState, AppContext} from "./@core";
import {RouterProvider} from "react-router-dom";
import {router} from "./pages/router";

function App() {
    const state: AppState = {
        appVersion: "0.0.1"
    }

  return (
      <AppContext.Provider value={state}>
          <RouterProvider router={router} />
      </AppContext.Provider>
  )
}

export default App;
