import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../navbar/navbar"

export function HomeView() {
  return (
    <div className="homeView">
      
      <Navbar />

      <div>
      <h1>HRMS HomeView</h1>
        <Link to="/login"><button className="btn btn-outline-primary my" >Login</button></Link>
        <Link to="/register"><button className="btn btn-outline-primary my" >User Register</button></Link>
        <Link to="/supvisorAllocation"><button className="btn btn-outline-primary my" >Supervisor Allocation</button></Link>
      </div>
    
    </div>
  );
}
