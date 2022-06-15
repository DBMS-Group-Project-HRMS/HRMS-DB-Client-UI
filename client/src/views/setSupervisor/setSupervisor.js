import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";
import "./button.css";

function getSearch() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searhResult");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

export function SetSupervisor(props){
    const uID = props.userID;
    const firstname = props.fname;
    const lastname = props.lname;
    const allUsers = props.allU;
    console.log("fname,lname",firstname,lastname)

    const filteredList = allUsers.filter(function(e){ return e.empId != uID});

    const assign = (e)=>{
        const Employee_ID = uID;
        const Supervisor_ID = e.currentTarget.dataset.id;
        const supervisorDetails = {Sup_ID:Supervisor_ID,Emp_ID:Employee_ID};
        console.log("empId,SupId: ",Employee_ID,Supervisor_ID);
        console.log("hello im assigning",e.currentTarget.dataset.id)

        Axios.post('http://localhost:3001/hr/setSupervisor', supervisorDetails).then( (response)=>{
          setAlertType("alert alert-success");
          setAlertMessage(response.data.message);
        })
        .catch((err) => {
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
          }
        });
    };

    return(
        <span>
            <button className="btn" data-bs-toggle="modal" data-bs-target={`#supervisorSet${uID}`}>{firstname} {lastname}</button>

            <div className="modal fade" id={`supervisorSet${uID}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Assign a Supervisor for {uID}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                    <div class="input-group rounded">
                    <input type="search" id="searhResult" class="form-control rounded" onKeyUp={getSearch} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    </div>

                    <table class="table" id="myTable">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Department</th>
                        <th scope="col">Paygrade</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>


                    {filteredList.map(({ empId, firstname, lastname,dept_name,paygrade }) => (
                        <tr  key={empId}>
                        <td scope="row">{firstname} {lastname}</td>
                        <td>{dept_name}</td>
                        <td>{paygrade}</td>
                        <td><button onClick={assign} data-id={empId} class="btn btn-info btn-sm">assign</button></td>
                        </tr>
                    ))}

                    </tbody>
                    </table>

                    </div>
                    <div className="modal-footer">
                    </div>
                </div>
                </div>
            </div>
        </span>

    );
}