import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { AddTitle } from "./AddJobTitle";
import "./HRHome.css";

export function VieJobTitles() {
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);

  const [jobTitles, setjobTitles] = useState([]);

  useEffect( ()=> {
    let token = sessionStorage.getItem("token");
    Axios.get("https://hrms-client-server.onrender.com/hr/getJobTitles", { headers:{Authorization : `Bearer ${token}`}}).then((response)=>{
      const details = response.data;
      setjobTitles(details);
    }).catch((err) => {
      setAlertType("alert alert-danger");
      setAlertMessage("");
      switch (err.response.request.status) {
        case 400:
          setAlertMessage(err.response.data.message);
          setShow(true);
          break;
        case 500:
          setAlertMessage("Server Error!");
          setShow(true);
          break;
        case 501:
          setAlertMessage("Server Error!");
          setShow(true);
          break;
        case 502:
          setAlertMessage("Server Error!");
          setShow(true);
          break;
        default:
          break;
      };
    })
  },[]);

  return (

          <div className="container">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
            </div>

            <div className="Container-fluid shadow background-HR">
            <h1 className="text-center mt-3 mb-0">View Job Titles</h1>
              <br/>
              <div>
                {jobTitles.map(({ID, type}) => (
                    <div className="text-center">
                      <div className="d-inline-block" key={ID}> 
                        {type}
                      </div><br/><br/>
                    </div>
                ))}
              </div>


              <div className="text-center">  
                <button className="btn btn-outline-primary px-4 mb-3" data-bs-toggle="modal" data-bs-target="#addTitle">Add Job Title</button>
              </div>
              
            </div>
              <div className="modal fade" id="addTitle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Add New Job Title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <AddTitle/>
                      </div>
                      <div className="modal-footer">
                      </div>
                      </div>
                  </div>
                  </div>
              </div>

  );
}