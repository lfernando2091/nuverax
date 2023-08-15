import './@core/i18n/i18n';
import React, {useState} from 'react';
import './App.css';
import {AppState, AppContext} from "./@core";
import {RouterProvider} from "react-router-dom";
import {router} from "./pages/Router";

import {pdfjs} from "react-pdf";

const url = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    url,
    import.meta.url,
).toString();

function App() {
    const [language, setLanguage] = useState("es")
    const [updateNavBar, setUpdateNavBar] = useState(true)

    const updateLanguage = (value: string) => {
        setLanguage(value)
    }

    const onUpdateNavbar = (value: boolean) => {
        setUpdateNavBar(value)
    }

    const state: AppState = {
        appVersion: "0.0.1-experimental",
        language: language,
        setLanguage: updateLanguage,
        onUpdateNavbar,
        updateNavbar: updateNavBar
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
