import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../navbar/navbar";

export function CreateGroupedEmployeesReport() {
  const [parameterList, setParameterList] = useState([]);
  const [parameter, setParameter] = useState("");
  const [formValues, setformValues] = useState({});
  const [errmsg, setErr] = useState("");
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

  // console.log(parameter);

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

      <Navbar/>
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Create Group Employees Report</h1>

        <form method="post" className="create-employee-details-report-form" onSubmit={handleSubmit}>

          <div className="error">
            <p className="text-danger mt-3">{errmsg}</p>
          </div>

          <div className="form-group mb-3">
            <label className="label" class="h3">Select Employee Grouping Parameter</label>
            <select className="custom-select custom-select-lg mb-3 ml-4 w-25" name="department" id="department" value={formValues.department} onChange={handleParameterChange} required>
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

    <Link to="/reports"><button className="btn btn-outline-primary my" >Back</button></Link>
    <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>

    </div>
  );
}

export default CreateGroupedEmployeesReport;