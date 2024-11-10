import React from 'react';
import {Route, Routes} from "react-router-dom";
import App from "../App";
import Search from "./pages/search/Search";
import Main from "./pages/main/Main";

const AppRouter = () => {
    return (
       <Routes>
           <Route path="/" element={<Main/>} />
           <Route path="/search" element={<Search/>} />
       </Routes>
    );
};

export default AppRouter;