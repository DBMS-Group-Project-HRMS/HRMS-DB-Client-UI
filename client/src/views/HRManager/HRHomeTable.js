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



export default function HRHomeTable() {
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
      Axios.get("https://hrms-client-server.onrender.com/manager/get_users_list", { headers:{Authorization : `Bearer ${token}`} })
    .then((userList) => {
      const filteredUsersList = userList.data.data.filter((e)=>{return e.type != 'HR Manager' && e.type != 'Admin'});
      setUserDetails(filteredUsersList);
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
        //   {
        //     id: "edit",
        //     Cell: ({ row }) => (
        //       <Button outline color="dark" >
        //         {/* onClick={<ViewUserRequest/>} */}
        //         View
        //       </Button>
        //     ),
        //   },  
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
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
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
                    <tr key={id}>
                      <td>
                        {id}
                      </td>
                      <td>
                        <Link to={`/manager/view_user/${id}`}>{firstname} {lastname}</Link>
                      </td>
                      <td>
                        {type}
                      </td>
                      <td>
                        {status}
                      </td>
                      <td>
                        {dateFormatter(birthday)} 
                      </td>
                      <td>
                        {email} 
                      </td>
                      <td>
                        {dateFormatter(Joined_date)}
                      </td>
                      <td>
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