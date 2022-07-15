import "./HRHome.css";
import React, { Component } from "react";
import HRHomeTable from "./HRHomeTable";

class ViewEmployeeList extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);

    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.state = {
      isModalOpen: false,
      check: false,
      selectAll: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  toggleSelectAll() {
    this.setState({
      selectAll: !this.state.selectAll,
    });
  }


  render() {

    return (
      <React.Fragment>
        <div className="Container-fluid shadow background-HR">
          <h1 className="text-center mt-3 mb-0">Employees</h1>
            <br/>
            <HRHomeTable/>
        </div>
      </React.Fragment>
    );
  }

}

export default ViewEmployeeList;