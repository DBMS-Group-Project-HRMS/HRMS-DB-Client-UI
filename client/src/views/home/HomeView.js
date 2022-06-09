import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function HomeView() {
  return (
    <div className="homeView">
        <h1>HRMS HomeView</h1>
        <Link to="/login"><button className="btn btn-outline-primary my" >Login</button></Link>
        <Link to="/register"><button className="btn btn-outline-primary my" >User Register</button></Link>
    </div>
  );
}
