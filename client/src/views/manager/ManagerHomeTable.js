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
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Type", accessor: "type" },
  { Header: "Status", accessor: "status" },
  { Header: "Birthday", accessor: "birthday" },
  { Header: "Email", accessor: "email" },
  { Header: "Joined Date", accessor: "Joined_date" },
  { Header: "NIC", accessor: "nic_number" },
  { Header: "Leave Count", accessor: "leave_count" },
];


export default function ManagerHomeTable() {
  const navigate = useNavigate();
  const [users, setUserDetails] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
      Axios.get("http://localhost:3001/manager/get_users_list", { headers:{Authorization : `Bearer ${token}`} })
    .then((userList) => {
      console.log(userList.data.data)
      setUserDetails(userList.data.data);
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
      data: users,
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
              {users.map(({ id, firstname, lastname , type, status, birthday, email, Joined_date, nic_number, leave_count}) => (
                    <tr>
                      <td key={id}>
                        {id}
                      </td>
                      <td key={id}>
                        <Link to={`/manager/view_user/${id}`}>{firstname} {lastname}</Link>
                      </td>
                      <td key={id}>
                        {type}
                      </td>
                      <td key={id}>
                        {status}
                      </td>
                      <td key={id}>
                        {dateFormatter(birthday)} 
                      </td>
                      <td key={id}>
                        {email} 
                      </td>
                      <td key={id}>
                        {dateFormatter(Joined_date)}
                      </td>
                      <td key={id}>
                        {nic_number}
                      </td>
                      <td key={id}>
                        {leave_count}
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