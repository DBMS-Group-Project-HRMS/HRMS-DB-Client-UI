import React, { useEffect, useState } from "react";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import {Link} from 'react-router-dom';


import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
} from "reactstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const COLUMNS = [
  { Header: "Leave Id", accessor: "emp_ID" },
  { Header: "Date", accessor: "Date" },
  { Header: "status", accessor: "status" },
  { Header: "reason", accessor: "reason" },
];


export default function EmployeeHomeTable() {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emp_ID, setEmpID] = useState("");

  const setShowToTrue = () => {
    setShow(true);
  };

  const setShowToFalse = () => {
    setShow(false);
  };

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };


  useEffect(() => {
    let token = sessionStorage.getItem("token");
      Axios.get("http://localhost:3001/supervisor/get_leave_requests", { headers:{Authorization : `Bearer ${token}`} })
    .then((leaves) => {
      setLeaves(leaves.data.data);
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
});


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: leaves,
    },
    useRowSelect,
    useGlobalFilter,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          ...columns,
        ]; //Above is a dependency for a manager. Check Role!
      });
    }
  );

  return (
    <>
      <React.Fragment>
        <br></br>
        <Alert isOpen={show} color="danger" toggle={setShowToFalse}>
          <p>{alertMessage}</p>
        </Alert>
        <br></br>
        <br></br>
        <div>
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
              {leaves.map(({ id, emp_ID, type , Date, status, reason}) => (
                    <tr>
                      <td key={id}>
                        {emp_ID}
                      </td>
                      <td key={id}>
                        {type}
                      </td>
                      <td key={id}>
                        {dateFormatter(Date)} 
                      </td>
                      <td key={id}>
                        {status} 
                      </td>
                      <td key={id}>
                        {reason}
                      </td>
                      <td key={id}>
                        <Button outline color="dark" data-bs-toggle="modal" data-bs-target="#viewDetails">
                          View
                        </Button>
                      </td>
                    </tr> 
                ))}
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    </>
  );
}




