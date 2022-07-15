import { Modal, ModalHeader, ModalBody} from "reactstrap";
import "./HRHome.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

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
          <br/>

          <div class="center">
            <div class="btn-group-vertical">
              <Link to="/register" className="mb-3"><button className="btn btn-outline-primary" >User Register</button></Link>
              <Link to="/hr/view_paygrades" className="mb-3"><button className="btn btn-outline-primary" >View Paygrades</button></Link>
              <Link to="/hr/view_jobTitles" className="mb-3"><button className="btn btn-outline-primary" >View Job Titles</button></Link>
              <Link to="/supervisorAllocation" className="mb-3"><button className="btn btn-outline-primary" >Supervisor Allocation</button></Link>
              <Link to="/hr/view_employees" className="mb-3"><button className="btn btn-outline-primary" >Employee List</button></Link>            
            </div>            
          </div>

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