import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../navbar/navbar";

export function CreateEmployeeByDepartmentReport() {
  const parameterList = ["a", "b", "c", "d", "e"]

  const [departmentList, setDepartmentList] = useState([]);
  const initialValues = { department: "", parameters: [] };
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    let token = sessionStorage.getItem("token");
      Axios.get("http://localhost:3001/report/get_department_list", { headers:{Authorization : `Bearer ${token}`} })
    .then((resDepartmentList) => {
      setDepartmentList(resDepartmentList.data.data);
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
  }, []);

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]:value });
  };

  const handleParameterChange = (e) => {
    const { name, value } = e.target;
    const index = initialValues.parameters.indexOf(value);
    if (index > -1)
      initialValues.parameters.splice(index, 1);
    else
      initialValues.parameters.push(value);

    console.log(initialValues.parameters);

    // setformValues({ ...formValues, [name]: initialValues.parameters });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    setIsSubmit(true);
  }

  return (
    <div className="createReport">

      <Navbar/>
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Create Employee By Department Report</h1>

        <form method="post" className="signin-form" onSubmit={handleSubmit}>

          <div className="form-group mb-3">
            <label className="label" class="h3">Department</label>
            <select className="custom-select custom-select-lg mb-3 ml-4 w-25" name="department" id="department" value={formValues.department} onChange={handleDepartmentChange} >
              <option disabled defaultValue="">Select Department</option>
              <option value="All">All</option>
              {departmentList.map((department) => <option key={department.Name} value={department.Name}>{department.Name}</option>)}
            </select>
          </div>

          <div className="form-group mb-3">
            <label className="label" class="h3">Report Parameters</label>
            <ul className="parameter-list w-25 pl-5 m-0">
              {parameterList.map((name, index) => {
                return (
                    <div className="parameter-list-item">
                      <div className="left-section">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name="parameters"
                          value={name}
                          onChange={handleParameterChange}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
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

    <Link to="/reports"><button className="btn btn-outline-primary my" >Back</button></Link>
    <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>

    </div>
  );
}

export default CreateEmployeeByDepartmentReport;