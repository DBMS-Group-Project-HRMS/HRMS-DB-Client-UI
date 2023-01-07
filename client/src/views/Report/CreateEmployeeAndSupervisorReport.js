import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export function CreateEmployeeAndSupervisorReport() {
  const [parameterList, setParameterList] = useState([]);
  const [parameters, setParameters] = useState(null);
  const [formValues, setformValues] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("https://hrms-client-server.onrender.com/report/get_employee_and_supervisor_report_parameters", { headers:{Authorization : `Bearer ${token}`} })
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
    setParameters(new Array(parameterList.length).fill(false));
  },[parameterList]);

  useEffect(() => {
    setformValues({ ...formValues, "parameters":parameters });
  }, [parameters]);

  const handleParameterChange = (position) => {
    const updatedCheckedParameters = parameters.map((parameter, index) =>
      index === position ? !parameter : parameter
    );
    
    setParameters(updatedCheckedParameters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reports/employeeAndSupervisorReport',{state:{formValues}});
  }

  const isRequired = (parameter) => {
    let requiredParametrs = ["Employee Name", "Supervisor Name"];

    if (requiredParametrs.includes(parameter))
      return true;
    else
      return false;

  }

  return (
    <div className="createReport">
      <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
        {alertMessage}
      </div>
      
      <div className="Container-fluid shadow background-Report">
        <h1 class="text-center mt-3 mb-0">Create Employee And Supervisor Report</h1>

        <form method="post" className="create-employee-and-supervisor-report-form" onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label className="label h5">Select Report Parameters</label>
            <ul className="parameter-list w-25 pl-5 m-0">
              {parameterList.map((name, index) => {
                return (
                  <div className="parameter-list-item">
                    <div className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name="parameters"
                        value={name.COLUMN_NAME}
                        checked={parameters[index]}
                        required={isRequired(name.COLUMN_NAME)}
                        onChange={() => handleParameterChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name.COLUMN_NAME}</label>
                    </div>
                  </div>
                );
              })}
            </ul>
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

export default CreateEmployeeAndSupervisorReport;