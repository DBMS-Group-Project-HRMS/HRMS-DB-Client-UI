import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

export function ViewUsersList() {
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");



    useEffect(() => {
        Axios.get("http://localhost:3001/manager/get_users_list")
      .then((userList) => {
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

    console.log(userDetails);
    return (
    <div className="container">
         <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
            {alertMessage}
         </div>
         <div className="container">
            <ul>
            {userDetails.map(({ id, firstname, lastname }) => (
                <li key={id}>
                    <Link to={`/manager/view_user/${id}`}>{firstname} {lastname}</Link>
                </li>
            ))}
            </ul>
         </div>
    </div>
);
}

// {
//     id: 1
//     firstname: 'sfjkks',
//     lastname: 'wrgwrg',
//     birthday: 2022-06-14T18:30:00.000Z,
//     email: 'wrgrwgrwgwrgt',
//     Joined_date: 2022-06-14T18:30:00.000Z,
//     nic_number: '16541371',
//     photo: null,
//     leave_count: 0,
//     name: 'grjbgjk',
//     status: 'contract-fulltime',
//     line1: '8364',
//     line2: 'gjfbgkhgkj',
//     city: 'wgjbkg',
//     district: 'grjhrejkghjkr',
//     postal_code: '1232',
//     type: 'HR Manager',
//     paygrade: 'level 3',
//     phone_number: '1234567890',
//     relationship: 'w,djfbjkwgf'
//   }