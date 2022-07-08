import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./report.css";

export function CreateGroupedEmployeesReport() {
  const [parameterList, setParameterList] = useState([]);
  const [parameter, setParameter] = useState("");
  const [formValues, setformValues] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/report/get_group_employees_report_parameters", { headers:{Authorization : `Bearer ${token}`} })
    .then((resParameterList) => {
      setParameterList(resParameterList.data.data);
    })
    .catch((err) => {
      setAlertMessage("");
      setAlertType("alert alert-danger");
      switch (err.response.request.status) {
        case 400:          
          setAlertMessage(err.response.data.message);
          setShow (true);
          break;
        case 500:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        case 501:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        case 502:
          setAlertMessage("Server Error!");
          setShow (true);
          break;
        default:
          break;
      }
    });
  },[]);

  useEffect(() => {
    setformValues({ ...formValues, "parameter":parameter });
  }, [parameter]);

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    setParameter(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reports/groupedEmployeesReport', {state:{formValues}});
  }

  return (
    <div className="createReport">
      <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
        {alertMessage}
      </div>
      
      <div className="Container-fluid shadow background-Report">
        <h1 class="text-center mt-3 mb-0">Create Group Employees Report</h1>

        <form method="post" className="create-employee-details-report-form" onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label className="label h5">Select Employee Grouping Parameter</label>
            <select className="custom-select custom-select-lgw-15 mx-3" name="parameter" id="parameter" value={formValues.parameter} onChange={handleParameterChange} required>
              <option disabled selected value="" >Select Grouping Parameter</option>
              {parameterList.map((parameter) => <option key={parameter.COLUMN_NAME} value={parameter.COLUMN_NAME}>{parameter.COLUMN_NAME}</option>)}
            </select>
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

export default CreateGroupedEmployeesReport;