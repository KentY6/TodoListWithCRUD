import React from "react";
import "./App.css";
import { Main } from "../screens/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthenticationForm } from "../screens/AuthenticationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Main />} />
        <Route path={`/login/`} element={<AuthenticationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
