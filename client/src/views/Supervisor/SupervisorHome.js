import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./SupervisorHome.css";
import React, { Component } from "react";
import SupervisorHomeTable from "./SupervisorHomeTable";
import NavbarComponent from "../../navbar/navbar";

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


  render() {

    return (
      <React.Fragment>
        <NavbarComponent/>
        <div className="Container-fluid shadow ">
          <h2>Supervisor Home</h2>
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
      </React.Fragment>
    );
  }
}

export default SupervisorHome;