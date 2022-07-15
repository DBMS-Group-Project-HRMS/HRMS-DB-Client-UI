import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./EmployeeHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import EmployeeHomeTable from "./EmployeeHomeTable";


class EmployeeHome extends Component {
  constructor(props) {
    super(props)
    this.user_id = sessionStorage.getItem('userId')
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
        <div className="Container-fluid bg-employee">
          <h1 className="text-center mt-3 mb-0">Employee Home</h1>
          <br></br>

          <div class="center">
            <div class="btn-group-vertical">
            <Link to={'/user/apply_leave'} className="mb-3"><Button outline color="dark" className="shadow-sm col-6">Apply Leave</Button></Link>
            <Link to={`/manager/view_user/${this.user_id}`} className="mb-3"><Button outline color="dark" className="shadow-sm col-6">View Profile</Button></Link>
            </div>            
          </div>

          <EmployeeHomeTable/>

        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EmployeeHome;