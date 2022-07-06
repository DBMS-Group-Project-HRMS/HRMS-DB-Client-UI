import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./ManagerHome.css";
import React, { Component } from "react";
import ManagerHomeTable from "./ManagerHomeTable";
import { Link } from "react-router-dom";

class ManagerHome extends Component {
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
        <div className="Container-fluid shadow bg-manager">
        <h1 className="text-center mt-3 mb-0">Manager Home</h1>
          <br></br>
          <Link to="/reports"><button className="btn btn-outline-primary mx-3" >Reports</button></Link>
          <ManagerHomeTable/>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
            {/* <ViewRequest />  */}
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ManagerHome;