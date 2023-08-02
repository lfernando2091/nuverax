import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {PagesRouter} from "./pages/router";

function App() {
  return (
      <BrowserRouter>
        <PagesRouter/>
      </BrowserRouter>
  );
}

export default App;
