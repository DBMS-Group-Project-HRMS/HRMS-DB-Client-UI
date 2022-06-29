import React from "react";
import Navbar from "../../navbar/navbar";
import { Link } from "react-router-dom";

export function CreateLeavesInPeriodByDepartmentReport() {

  return (
    <div className="createReport">

      <Navbar/>
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Create Leaves In Period By Department Report</h1>
      </div>

    <Link to="/reports"><button className="btn btn-outline-primary my" >Back</button></Link>
    <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>

    </div>
  );
}

export default CreateLeavesInPeriodByDepartmentReport;