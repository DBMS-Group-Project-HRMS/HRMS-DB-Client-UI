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
        <div class="row d-flex mb-5 justify-content-center">
          <div class="col-md-12">
            <div class="card p-3 py-4 bg-viewuser">
              <div class="text-center">
                <label className="label" >Employee Id:</label>
                <h5 class="bg-primary p-1 px-4 rounded text-white">{userDetails.empId}</h5>
                <label className="label" >Name:</label>
                <h5 class="mt-2 mb-0">{userDetails.firstname} {userDetails.lastname}</h5>
              </div>

            <br/>
              <div class="text-center mt-3">
                <label className="label" >User Type:</label>
                <p class="bg-secondary p-1 px-4 rounded text-white">{userDetails.type}</p>
                <h5>{userDetails.dept_name} Department</h5>

                <div class="px-4 mt-1">
                  <h6 className="fonts">Employee Status: {userDetails.status}</h6><br/>
                  <label className="fonts">Mobile Number (Primary): {userDetails.phone1}</label><br/>
                  <label className="fonts">Mobile Number (Secondary): {userDetails.phone2}</label><br/>
                  <label className="fonts">Joined date: {userDetails.Joined_date}</label><br/>
                  <label className="fonts">Birthday: {userDetails.birthday}</label><br/>
                  <label className="fonts">E-mail: {userDetails.email}</label><br/>
                  <label className="fonts">Pay Grade: {userDetails.paygrade}</label><br/>
                  <label className="fonts">Salary: {userDetails.salary}</label><br/>
                  <label className="fonts">NIC Number: {userDetails.nic_number}</label><br/>
                  <label className="fonts">Leaves Count: {userDetails.leave_count}</label><br/>
                  <label className="fonts">Address: {userDetails.line1}, {userDetails.line2}, {userDetails.city}, {userDetails.district}</label><br/>
                  <label className="fonts">Marital Status: {userDetails.mar_status}</label><br/><br/>

                  <hr></hr>
                  <h6> Emergency Contact Details: </h6>

                  <label className="fonts">Name: {userDetails.name}</label><br/>
                  <label className="fonts">Relation: {userDetails.relationship}</label><br/>
                  <label className="fonts">Contact Number: {userDetails.phone_number}</label><br/>
                </div>
                <br/><br/>
                <div>
                  <button class="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target="#editUser">Edit Details</button>
                </div>
                <br/>
                <br/>
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