import './App.css';
import Header from "./components/header/Header";
import Main from "./components/pages/main/Main";
import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";



function App() {
    return (
        <div className="App">
            <BrowserRouter>
            <Header/>
            <AppRouter/>
            </BrowserRouter>
        </div>
    )
}

export default App;
