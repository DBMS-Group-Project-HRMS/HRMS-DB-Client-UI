import React, { useState } from "react";
import Navbar from "../../navbar/navbar";
import { useNavigate, Link } from "react-router-dom";
import "./report.css";

export function CreateLeavesInPeriodByDepartmentReport() {

  const [formValues, setformValues] = useState({});
  const [errmsg, setErr] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]:value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.to >= formValues.from)
      navigate('/reports/LeavesInPeriodByDepartmentReport',{state:{formValues}});
    else
      setErr("Invalid dates, To date must be after From date.");
  }

  return (
    <div className="createReport">

      <Navbar/>
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Create Leaves In Period By Department Report</h1>

        <form method="post" className="create-leaves-in-period-report-form pt-4" onSubmit={handleSubmit}>

          <div className="error">
            <p className="text-danger mt-3">{errmsg}</p>
          </div>

          <p class="h5 mb-3 mx-5">Select the period to calculate the number of leaves based on department:</p>

          <div class="side-by-side">
            <div className="form-group mt-1 mb-0 mx-5 side-by-side w-25">
              <label className="label" class="h3 p-0" >From:</label>
              <input type="date" className="form-control mb-4 ml-4"  name="from" id="from" value={formValues.from} onChange={handleChange} required/>
            </div>

            <div className="side-by-side w-50"></div>

            <div className="form-group mt-1 mb-0 mx-5 side-by-side w-25">
              <label className="label" class="h3 p-0" >To:</label>
              <input type="date" className="form-control mb-4 ml-4"  name="to" id="to" value={formValues.to} onChange={handleChange} required/>
            </div>

          </div>

          <div className="form-group text-center">
            <button type="submit" className="form-control btn btn-info rounded submit px-3" >
              Generate Report
            </button>
          </div>

        </form>
        
      </div>

    <Link to="/reports"><button className="btn btn-outline-primary my" >Back</button></Link>
    <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>

    </div>
  );
}

export default CreateLeavesInPeriodByDepartmentReport;