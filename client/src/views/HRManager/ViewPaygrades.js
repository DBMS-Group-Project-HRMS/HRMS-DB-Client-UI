import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { EditPaygrade } from "./EditPaygrade";
import "./ViewPaygrades.css"

export function ViewPaygrades() {
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);

  const [paygradeDetails, setPayGradeDetails] = useState([]);

  useEffect(()=>{
    console.log("paygradeDetails",paygradeDetails);
  },[paygradeDetails])

  useEffect( ()=> {
    let token = sessionStorage.getItem("token");
    Axios.get("https://hrms-client-server.onrender.com/hr/getPayGrades", { headers:{Authorization : `Bearer ${token}`}}).then((response)=>{
      const details = response.data;
      setPayGradeDetails(details);
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
<div className="background-viewpay">
<div className="container ">
  <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
      {alertMessage}
  </div>

    <div>
      <table className="table my-5" id="myTable">
        <thead>
            <tr>
            <th scope="col">Paygrade</th>
            <th scope="col">Salary</th>
            <th scope="col">No. of Leaves</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
          {paygradeDetails.map(({ ID, paygrade, salary, num_leaves }) => (
              <tr key={ID}>
              <td scope="row">{paygrade}</td>
              <td>{salary}</td>
              <td>{num_leaves}</td>
              <td><button className="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target={'#editPaygrade' + ID}>Edit Details</button></td>
              </tr>   
          ))}
        </tbody>
      </table>
    </div>

    {paygradeDetails.map((paygrade) => (
    <div className="modal fade" id={'editPaygrade' + paygrade.ID} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Edit Paygrade Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <EditPaygrade paygrade={paygrade} />
          </div>
          <div className="modal-footer">
          </div>
        </div>
      </div>
    </div>
    ))}

</div>
</div>

  );
}