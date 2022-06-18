import React, { useState,useEffect } from "react";
import Axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import { SetSupervisor } from "./setSupervisor";
import "./button.css";

export function Supervisor(){
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");

    useEffect(() => {
      let token = sessionStorage.getItem("token");
        Axios.get("http://localhost:3001/manager/get_users_list", { headers:{Authorization : `Bearer ${token}`}})
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
            <ul className="list-group">
            {userDetails.map(({  empId, firstname, lastname }) => (
                <li key={empId} className="list-group-item d-flex justify-content-between align-items-center">
                    {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#supervisorSet">{firstname} {lastname}</button> */}
                    {/* <Link to={`/manager/view_user/${id}`}>{firstname} {lastname}</Link>
                    <a class="btn-one" data-bs-toggle="modal" data-bs-target="#supervisorSet">{firstname} {lastname}</a> */}

                    <SetSupervisor userID={empId} fname={firstname} lname={lastname} allU={userDetails}  />
                    <span class="badge badge-success badge-pill" >Allocated</span>
                </li>
            ))}
            </ul>
         </div>
    </div>
);
}