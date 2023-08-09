import './@core/i18n/i18n';
import React, {useState} from 'react';
import './App.css';
import {AppState, AppContext} from "./@core";
import {RouterProvider} from "react-router-dom";
import {router} from "./pages/Router";

function App() {
    const [language, setLanguage] = useState("es")

    const updateLanguage = (value: string) => {
        setLanguage(value)
    }

    const state: AppState = {
        appVersion: "0.0.1-experimental",
        language: language,
        setLanguage: updateLanguage
    }

  return (
      <AppContext.Provider value={state}>
          <RouterProvider
              future={{ v7_startTransition: true }}
              router={router} />
      </AppContext.Provider>
  )
}

export default App;
