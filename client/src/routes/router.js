import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { HomeView } from "../views/home/HomeView";
import { Login } from "../views/login/login";
import { Error } from "../views/error/error";

export function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    );
}