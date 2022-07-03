import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./SupervisorHome.css";
import React, { Component } from "react";
import SupervisorHomeTable from "./SupervisorHomeTable";
import { Link } from "react-router-dom";
import { ViewUserRequest } from "./ViewUserRequest";


class SupervisorHome extends Component {

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

  userDetails = []

  render() {

    return (
      <React.Fragment>
        <div className="Container-fluid shadow ">
        <h1 class="text-center mt-3 mb-0">Supervisor Home</h1>
          <br></br>
        
          <SupervisorHomeTable/>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
            {/* <ViewRequest /> */}   //TODO
          </ModalBody>
        </Modal>

        <div className="modal fade" id="editUser" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Edit User Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* <ViewUserRequest userDetails={userDetails}/> */}
              </div>
              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default SupervisorHome;