import React, { useState, useEffect } from "react";
import Axios from 'axios';
// import Navbar from "../../navbar/navbar";
import  { useLocation, Link } from 'react-router-dom';
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Table } from "reactstrap";

// const COLUMNS = [
//   { Header: "ID", accessor: "user_Id" },
//   { Header: "Firstname", accessor: "firstname" },
//   { Header: "Lastname", accessor: "lastname" },
//   { Header: "Email", accessor: "email" },
//   { Header: "Joined Date", accessor: "joined_date" },
//   { Header: "Employee Type", accessor: "emp_type" },
//   { Header: "Employee Status", accessor: "emp_status" },
//   { Header: "Paygrade", accessor: "paygrade" },
// ];

export function GroupedEmployeesReport() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [employeeCountList, setEmployeeCountList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

  const location = useLocation();

  const formValues = location.state.formValues;

  const user_id = sessionStorage.getItem("userId");
  const current = new Date();
  const currentDate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

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
    Axios.post("http://localhost:3001/report/create_grouped_employee_report", formValues, { headers:{Authorization : `Bearer ${token}`} })
      .then( (response)=>{
        setEmployeeCountList(response.data.data)
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

  console.log(employeeCountList);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable(
//     {
//       columns: COLUMNS,
//       data: employeeList,
//     },
//     useRowSelect,
//     useGlobalFilter,
//     (hooks) => {
//       hooks.visibleColumns.push((columns) => {
//         return [
//           ...columns,
//         ];
//       });
//     }
//   );
  
  return (
    <div className="ViewEmployeeByDepartmentReport">

      {/* <Navbar/> */}
      
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-3">Jupiter (Pvt) Limited</h1>
        {/* <h1 class="text-center mx-0 mb-3 p-0">Employees of {department} Department</h1> */}
        <h1 class="text-center mx-0 mb-3 p-0">Report</h1>
        
        <div class="d-flex">
          <div class="mr-auto">Generated by: {currentUsername}</div>
          <div class="">On: {currentDate}</div>
        </div>
        <br></br>

        {/* <Table
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
                      if(cell.column.id === "joined_date" && cell.row.values.joined_date) 
                        cell.row.values.joined_date = dateFormatter(cell.row.values.joined_date);
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
        </Table> */}

      </div>

      <Link to="/reports/createGroupedEmployeesReport"><button className="btn btn-outline-primary my" >Back</button></Link>

    </div>
  )
}

export default GroupedEmployeesReport;