import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbar"

export function HomeView() {
  return (
    <div className="homeView">
      
      <Navbar />

      <div>
      <h1 class="text-center mt-3 mb-0">HR Management System</h1>
        <Link to="/login"><button className="btn btn-outline-primary my" >Login</button></Link>
        <Link to="/register"><button className="btn btn-outline-primary my" >User Register</button></Link>
        <Link to="/supvisorAllocation"><button className="btn btn-outline-primary my" >Supervisor Allocation</button></Link>
        <Link to="/supervisorHome"><button className="btn btn-outline-primary my" >Supervisor Home</button></Link>
        <Link to="/hrHome"><button className="btn btn-outline-primary my" >HR Manager Home</button></Link>
        <Link to="/managerHome"><button className="btn btn-outline-primary my" >Manager Home</button></Link>
        <Link to="/reportList"><button className="btn btn-outline-primary my" >Reports</button></Link>
        <Link to="/employeeHome"><button className="btn btn-outline-primary my" >Employee Home</button></Link>
      </div>
    </div>
  );
}
