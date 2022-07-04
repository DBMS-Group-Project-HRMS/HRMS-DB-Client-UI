import { Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import "./HRHome.css";
import React, { Component } from "react";
import HRHomeTable from "./HRHomeTable";
import { Link } from "react-router-dom";
import { EditPaygrade } from "./EditPaygrade";

class HRHome extends Component {
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
        <h1 className="text-center mt-3 mb-0">HR Manager Home</h1>
          <br></br>
          <Link to="/register"><button className="btn btn-outline-primary my" >User Register</button></Link>
          <Link to="/hr/view_paygrades"><button className="btn btn-outline-primary mx-3" >View Paygrades</button></Link>
          <Link to="/hr/view_jobTitles"><button className="btn btn-outline-primary mx-3" >View Job Titles</button></Link>
          <HRHomeTable/>
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            <h3>Request</h3>
          </ModalHeader>
          <ModalBody>
            {/* <ViewRequest /> */} 
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default HRHome;