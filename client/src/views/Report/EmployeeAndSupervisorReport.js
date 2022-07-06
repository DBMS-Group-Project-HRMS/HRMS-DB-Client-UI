import React, { useState, useEffect } from "react";
import Axios from 'axios';
// import Navbar from "../../navbar/navbar";
import  { useLocation, Link } from 'react-router-dom';
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Table } from "reactstrap";

const COLUMNS = [
  { Header: "Employee ID", accessor: "Employee ID" },
  { Header: "Employee Name", accessor: "Employee Name" },
  { Header: "Employee Department", accessor: "Employee Department" },
  { Header: "Employee Type", accessor: "Employee Type" },
  { Header: "Supervisor ID", accessor: "Supervisor ID" },
  { Header: "Supervisor Name", accessor: "Supervisor Name" },
  { Header: "Supervisor Department", accessor: "Supervisor Department" },
  { Header: "Supervisor Type", accessor: "Supervisor Type" },
];

export function EmployeeAndSupervisorReport() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [parameterList, setParameterList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const location = useLocation();

  const formValues = location.state.formValues;
  const department = formValues.department;

  const user_id = sessionStorage.getItem("userId");
  const current = new Date();
  const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.get("http://localhost:3001/report/getCurrentUserName/"+ user_id , { headers:{Authorization : `Bearer ${token}`} })
    .then((currentUser) => {
      setCurrentUsername(currentUser.data.data[0].firstname+" "+currentUser.data.data[0].lastname);
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
  },[user_id]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    Axios.post("http://localhost:3001/report/create_employee_and_supervisor_report", formValues, { headers:{Authorization : `Bearer ${token}`} })
      .then( (response)=>{
        setParameterList(response.data.data[0])
        setEmployeeList(response.data.data[1]);
      })
      .catch((err) => {
        setAlertType("alert alert-danger");
        setAlertMessage("");
        switch (err.response.request.status) {
          case 400:
            setAlertMessage(err.response.data.message);
            setShow(true);
            break;
          case 500:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 501:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          case 502:
            setAlertMessage("Server Error!");
            setShow(true);
            break;
          default:
            break;
        }
      });
  },[formValues]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: COLUMNS,
      data: employeeList,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
        ];
      });
    }
  );
  
  return (
    <div className="ViewEmployeeByDepartmentReport">

      {/* <Navbar/> */}
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-3">Jupiter (Pvt) Limited</h1>
        <h1 class="text-center mx-0 mb-3 p-0">Employees of {department} Department</h1>
        <h1 class="text-center mx-0 mb-3 p-0">Report</h1>
        
        <div class="d-flex">
          <div class="mr-auto">Generated by: {currentUsername}</div>
          <div class="">On: {currentDate}</div>
        </div>
        <br></br>

        <Table
          responsive
          striped
          bordered
          hover
          className="Employee_details_table table-striped shadow-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  if (parameterList.includes(column.id))
                    return (
                      <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    )
                  else
                    return (null)
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    if (parameterList.includes(cell.column.id)){
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );                        
                    }
                    else
                      return null
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>

      <Link to="/reports/createEmployeeAndSupervisorReport"><button className="btn btn-outline-primary my" >Back</button></Link>

    </div>
  )
}

export default EmployeeAndSupervisorReport;