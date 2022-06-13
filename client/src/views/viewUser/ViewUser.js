import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { EditUser } from "./EditUser";

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
        console.log(getUserDetails.data.data);
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editUser">
              Edit
            </button>
         </div>
         <div className="modal fade" id="editUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Edit User Details</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <EditUser userDetails={userDetails}/>
                </div>
                <div className="modal-footer">
                </div>
              </div>
            </div>
          </div>
    </div>
);
}

// {
//   id: 36,
//   empId: 33,
//   firstname: 'sgsg',
//   lastname: 'sgdh',
//   birthday: '2022-06-16',
//   email: 'shtdhtd@gmail.com',
//   salary: 12414,
//   Joined_date: '2022-06-15',
//   nic_number: '131435',
//   photo: null,
//   leave_count: 0,
//   name: 'fsgsg',
//   status: 'contract-fulltime',
//   line1: 'asgsrg',
//   line2: 'shtd',
//   city: 'djhtdj',
//   district: 'tdjsdt',
//   postal_code: '2344',
//   type: 'Software Engineer',
//   paygrade: 'level 2',
//   phone_number: '1234567890',
//   relationship: 'srhs'
// }