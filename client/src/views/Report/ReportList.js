import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/navbar";
import { Link } from "react-router-dom";

class ReportList extends Component {

  constructor(props) {
    super(props);
    this.gotoCreateReport = this.gotoCreateReport.bind(this);
  }

  gotoCreateReport = (e) => {
    switch (e.target.id) {
      case "1":
        this.props.navigate("/reports/createEmployeeByDepartmentReport");
        return;
      case "2":
        this.props.navigate("/reports/createLeavesInPeriodByDepartmentReport");
        return;
      case "3":
        this.props.navigate("/reports/createEmployeeDetailsReport");
        return;
      case "4":
        this.props.navigate("/reports/averageSalarybyDepartmentReport");
        return;
      case "5":
        this.props.navigate("/reports/createEmployeeAndSupervisorReport");
        return;
      default:
        return null
    }
  }

  render() {

    return (
      <React.Fragment>

        <Navbar/>

        <div className="Container-fluid shadow ">
          <h1 class="text-center mt-3 mb-0">Choose Report</h1>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Employee by Department Report</h5>
              <p class="card-text mb-0">With supporting text below as a natural lead-in to additional content.</p>
              <div class="text-right">
                <button id="1" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Total Leaves in given Period by Department Report</h5>
              <p class="card-text mb-0">With supporting text below as a natural lead-in to additional content.</p>
              <div class="text-right">
                <button id="2" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Employee Reports</h5>
              <p class="card-text mb-0">Employee reports grouped by job title, department, pay grade etc.</p>
              <div class="text-right">
                <button id="3" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Average Salary by Department Report</h5>
              <p class="card-text mb-0">Average employee salary and number of employees of each Department Report</p>
              <div class="text-right">
                <button id="4" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Employee and Supervisor Report</h5>
              <p class="card-text mb-0">Employees and their respective Supervisors and optional details Report.</p>
              <div class="text-right">
                <button id="5" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
        
        </div>

        <Link to="/"><button className="btn btn-outline-primary my" >Back Home</button></Link>

      </React.Fragment>
    );
  }
}

export function ReportListWithRouter(props) {
  const navigate = useNavigate();
  return (<ReportList navigate={navigate}></ReportList>)
}

export default ReportList;