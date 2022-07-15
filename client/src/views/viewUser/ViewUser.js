import React, { useState, useEffect, useRef } from "react";
import Axios from 'axios';
import { useNavigate, useParams, Link } from "react-router-dom";
import { EditUser } from "./EditUser";
import './ViewUser.css'
import { CheckIf } from "./buttonComponent";


export function ViewUser() {
    const { user_id } =useParams();
    const [userDetails, setUserDetails] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [isSupervisorSet, setisSupervisorSet] = useState(false);
    const [supervisorDetails, setSupervisor] = useState({});


    useEffect(() => {
      let token = sessionStorage.getItem("token");
        Axios.get("http://localhost:3001/manager/view_user/" + user_id, { headers:{Authorization : `Bearer ${token}`}})
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

    useEffect(() => {
      let token = sessionStorage.getItem("token");
        Axios.get("http://localhost:3001/manager/get_supervisor/" + user_id, { headers:{Authorization : `Bearer ${token}`}})
      .then((supervisor) => {
        if (supervisor.data.data.length !== 0){
          setSupervisor(supervisor.data.data[0]);
          setisSupervisorSet(true);
        }
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
    },[user_id]);


    // SupervisorList.map(function(allocation){
    //   if(allocation.Emp_Id==4){
    //     setSupervisor(allocation.Sup_Id);
    //   }
    // });

    // console.log("supervisor: ",supervisor)

    
    return (

      <div className="container mt-5">
        <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
            {alertMessage}
        </div>
        <div className="row d-flex mb-5 justify-content-center">
          <div className="col-md-12">
            <div className="card p-3 py-4 bg-viewuser">
              <div className="text-center">
                <label className="label" >Employee Id:</label>
                <h5 className="bg-primary p-1 px-4 rounded text-white">{userDetails.empId}</h5>
                <label className="label" >Name:</label>
                <h5 className="mt-2 mb-0">{userDetails.firstname} {userDetails.lastname}</h5>
              </div>

            <br/>
              <div className="text-center mt-3">
                <label className="label" >User Type:</label>
                <p className="bg-secondary p-1 px-4 rounded text-white">{userDetails.type}</p>
                <h5>{userDetails.dept_name} Department</h5>

                <div className="px-4 mt-1">
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

                  <hr></hr>
                  
                  { isSupervisorSet
                    ? <div>
                        <h6> Supervisor </h6>
                        { sessionStorage.getItem("paygrade") === "level 1" || sessionStorage.getItem("paygrade") === "level 2"
                          ? <p>{supervisorDetails.firstname} {supervisorDetails.lastname}</p>
                          : <Link to={`/manager/view_user/${supervisorDetails.user_Id}`}>{supervisorDetails.firstname} {supervisorDetails.lastname}</Link>
                        }
                        
                      </div>
                    : <h6>No Supervisor Allocated</h6>
                  }

                </div>
                <br/><br/>
                <CheckIf/>
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