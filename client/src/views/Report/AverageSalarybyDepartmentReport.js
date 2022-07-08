import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import { Table } from "reactstrap";

const COLUMNS = [
  { Header: "Department", accessor: "department" },
  { Header: "Total Employee Number", accessor: "total_employees" },
  { Header: "Average Salary", accessor: "avg_salary" },
];

export function AverageSalarybyDepartmentReport() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [averageSalaryList, setAverageSalaryList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [alertType, setAlertType] = useState("");

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
    Axios.get("http://localhost:3001/report/create_average_salary_of_departments_report", { headers:{Authorization : `Bearer ${token}`} })
      .then( (response)=>{
        setAverageSalaryList(response.data.data);
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
  },[]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: COLUMNS,
      data: averageSalaryList,
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
      
      <div className="Container-fluid shadow bg-white">
        <h1 class="text-center mt-3 mb-3">Jupiter (Pvt) Limited</h1>
        <h1 class="text-center mx-0 mb-3 p-0">Average Salary and Employee Count of Departments</h1>
        <h1 class="text-center mx-0 mb-5 p-0">Report</h1>

        <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
          {alertMessage}
        </div>

        <div className="row mb-3">
          <div className="col-6">
            Generated by: {currentUsername}
          </div>

          <div className="col-6">
            <div className="text-end">On: {currentDate}</div>
          </div>
        </div>

        <Table
          responsive
          striped
          bordered
          hover
          className="Mytable table-striped shadow-sm"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>

      </div>

    </div>
  );
}
