import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { HomeView } from "../views/home/HomeView";
import { Login } from "../views/login/login";
import { Register } from "../views/register/register";
import { ViewUser } from "../views/viewUser/ViewUser";
import { ViewUsersList } from "../views/manager/ViewUsersList";
import { Error } from "../views/error/error";

export function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manager/view_user/:user_id" element={<ViewUser />} />
          <Route path="/manager/view_users_list" element={<ViewUsersList />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    );
}