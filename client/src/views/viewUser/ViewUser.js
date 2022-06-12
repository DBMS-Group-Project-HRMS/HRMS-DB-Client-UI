import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export function ViewUser() {
    const { user_id } =useParams();
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");



    useEffect(() => {
        Axios.get("http://localhost:3001/manager/view_user/" + user_id)
      .then((getUserDetails) => {
        setUserDetails(getUserDetails.data.data);
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
  }, [user_id]);

    
    return (
    <div className="container">
         <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
            {alertMessage}
         </div>
         <div className="container">
            <p>Name: {userDetails.firstname} {userDetails.lastname}</p>
         </div>
    </div>
);
}

// {
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