import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import React, { Component } from "react";
import Navbar from "../../navbar/navbar";
import { Link } from "react-router-dom";

export function CreateReport() {
  return (
    <div className="createReport">

      <Navbar/>
      
      {/* TODO: Fix the button */}
      <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Choose Report</h1>
        <div class="card mx-auto rounded-3 border-0 shadow my-3">
          <div class="card-body">
            <h5 class="card-title">Employee by Department Report</h5>
            <p class="card-text mb-0">With supporting text below as a natural lead-in to additional content.</p>
            <div class="text-right">
              <button class="btn btn-primary">Create Report</button>
            </div>
          </div>
        </div>
        <div class="card mx-auto rounded-3 border-0 shadow my-3">
          <div class="card-body">
            <h5 class="card-title">Total Leaves in given Period by Department Report</h5>
            <p class="card-text mb-0">With supporting text below as a natural lead-in to additional content.</p>
            <div class="text-right">
              <button class="btn btn-primary">Create Report</button>
            </div>
          </div>
        </div>
        <div class="card mx-auto rounded-3 border-0 shadow my-3">
          <div class="card-body">
            <h5 class="card-title">Employee Reports</h5>
            <p class="card-text mb-0">Employee reports grouped by job title, department, pay grade etc.</p>
            <div class="text-right">
              <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>
            </div>
          </div>
        </div>
        
    </div>
    <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>
    </div>
  );
}

export default CreateReport;