import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";

export function CreateLeavesInPeriodByDepartmentReport() {

  const [formValues, setformValues] = useState({});
  const [errmsg, setErr] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]:value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.to >= formValues.from)
      navigate('/reports/LeavesInPeriodByDepartmentReport',{state:{formValues}});
    else{
      setAlertType("alert alert-danger");
      setAlertMessage("Invalid dates, To date must be after From date.");
      setShow(true);
    }
  }

  return (
    <div className="createReport">
      
      <div className="Container-fluid shadow background-Report">
        <h1 class="text-center mt-3 mb-3">Create Leaves In Period By Department Report</h1>

        <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
              {alertMessage}
            </div>
          </div>
        </div>

        <form method="post" className="create-leaves-in-period-report-form pt-4" onSubmit={handleSubmit}>

          <p class="mb-3 mx-5 px-1">Select the period to calculate the number of leaves based on department:</p>

          <div class="side-by-side">
            <div className="form-group mt-1 mb-0 mx-5 side-by-side w-25">
              <label className="label h5">From:</label>
              <input type="date" className="form-control mb-4 mx-4" name="from" id="from" value={formValues.from} onChange={handleChange} required/>
            </div>

            <div className="side-by-side w-50"></div>

            <div className="form-group mt-1 mb-0 mx-5 side-by-side w-25">
              <label className="label h5">To:</label>
              <input type="date" className="form-control mb-4 mx-4"  name="to" id="to" value={formValues.to} onChange={handleChange} required/>
            </div>

          </div>

          <div className="form-group text-center">
            <button type="submit" className="form-control btn btn-info rounded submit px-3" >
              Generate Report
            </button>
          </div>

        </form>
        
      </div>

    </div>
  );
}

export default CreateLeavesInPeriodByDepartmentReport;