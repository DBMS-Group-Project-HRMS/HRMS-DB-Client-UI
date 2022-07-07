import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";

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
        this.props.navigate("/reports/createGroupedEmployeesReport");
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

        <div className="Container-fluid shadow background-Report">
          <h1 class="text-center mt-3 mb-5">Choose Report</h1>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Employee by Department Report</h5>
              <p class="card-text mb-0">Report containing the employees of the selected department along with details of your choice.</p>
              <div align="right">
                <button id="1" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Total Leaves in given Period by Department Report</h5>
              <p class="card-text mb-0">Total number of leaves that the employees have taken in the given period in each department.</p>
              <div align="right">
                <button id="2" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Grouped Employee Counts Report</h5>
              <p class="card-text mb-0">Employee count reports grouped by job title, department, pay grade etc. Shows the number of employees in each category in the selected grouping.</p>
              <div align="right">
                <button id="3" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Average Salary by Department Report</h5>
              <p class="card-text mb-0">Report containing the average employee salary and the number of employees in each department.</p>
              <div align="right">
                <button id="4" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
          <div class="card mx-auto rounded-3 border-0 shadow my-3">
            <div class="card-body">
              <h5 class="card-title">Employee and Supervisor Report</h5>
              <p class="card-text mb-0">Report containing employees and their respective supervisors along with optional details of your choice.</p>
              <div align="right">
                <button id="5" class="btn btn-primary" onClick={this.gotoCreateReport} >Create Report</button>
              </div>
            </div>
          </div>
        
        </div>

      </React.Fragment>
    );
  }
}

export function ReportListWithRouter(props) {
  const navigate = useNavigate();
  return (<ReportList navigate={navigate}></ReportList>)
}

export default ReportList;