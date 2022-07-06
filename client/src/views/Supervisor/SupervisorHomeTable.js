import React, { useEffect, useState } from "react";
import { useGlobalFilter, useRowSelect, useTable } from "react-table";
import {Link} from 'react-router-dom';
import { ViewUserRequest } from "./ViewUserRequest";

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
  { Header: "Employee ID", accessor: "emp_ID" },
  { Header: "Type", accessor: "type" },
  { Header: "Date", accessor: "Date" },
  { Header: "status", accessor: "status" },
  { Header: "reason", accessor: "reason" },
  { Header: "Action", accessor: "View" }
];



export default function SupervisorHomeTable() {
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
      const filteredLeaveList = leaves.data.data.filter((e)=>{return e.status == 'pending'});
      setLeaves(filteredLeaveList);
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

      <div className="modal fade" id="viewDetails" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">View Leave Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ViewUserRequest id='2'/>
            </div>
            <div className="modal-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}




