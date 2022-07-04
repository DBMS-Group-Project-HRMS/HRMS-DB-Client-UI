import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { EditUser } from "./EditUser";
import './ViewUser.css'

export function ViewUser() {
    const { user_id } =useParams();
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");



    useEffect(() => {
      let token = sessionStorage.getItem("token");
        Axios.get("http://localhost:3001/manager/view_user/" + user_id, { headers:{Authorization : `Bearer ${token}`}})
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

      <div className="container mt-5">
          <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
              {alertMessage}
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-md-7">
              <div class="card p-3 py-4">
                <div class="text-center">
                  <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" class="rounded-circle"/>
                </div>

              <br/>
                <div class="text-center mt-3">
                  <p class="bg-secondary p-1 px-4 rounded text-white">USER TYPE</p>
                  <h5 class="mt-2 mb-0">{userDetails.firstname} {userDetails.lastname}</h5>
                  <h6>ABOUT</h6>

                  <div class="px-4 mt-1">
                    <p class="fonts">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                  </div>

                  <div class="buttons">
                    <Button class="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target="#editUser">Edit Details</Button>
                    <Button class="btn btn-primary px-4 ms-3">Back</Button>
                  </div>
                </div>
              </div>
            </div>
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