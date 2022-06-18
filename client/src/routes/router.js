import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { HomeView } from "../views/home/HomeView";
import { Login } from "../views/login/login";
import { Logout } from "../views/login/logout";
import { Register } from "../views/register/register";
import { Supervisor } from "../views/setSupervisor/supervisor";
import { ViewUser } from "../views/viewUser/ViewUser";
import { ViewUsersList } from "../views/manager/ViewUsersList";
import { ApplyLeave } from "../views/user/ApplyLeave";
import { Error } from "../views/error/error";
import SupervisorHome from "../views/Supervisor/SupervisorHome";
import HRHome from "../views/HRManager/HRHome";
import ManagerHome from "../views/manager/ManagerHome";

export function Router(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/supvisorAllocation" element={<Supervisor />} />
          <Route path="/supervisorHome" element={<SupervisorHome />} />
          <Route path="/hrHome" element={<HRHome />} />
          <Route path="/managerHome" element={<ManagerHome />} />
          <Route path="/manager/view_user/:user_id" element={<ViewUser />} />
          <Route path="/manager/view_users_list" element={<ViewUsersList />} />
          <Route path="/user/apply_leave" element={<ApplyLeave />} />
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    );
}