import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


export function ViewUserRequest(props) {
  
  const navigate = useNavigate();

  const leave_id = props.id;
  const [formValues, setformValues] = useState([]);
  // const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isAccept, setIsAccept] = useState(null);

  useEffect( ()=> {
    let token = sessionStorage.getItem("token");
    Axios.get(`http://localhost:3001/supervisor/getLeaveData/${leave_id}`,{ headers:{Authorization : `Bearer ${token}`}}).then((response)=>{
        setformValues(response.data.data[0]);

    });
  },[]);


  const dateFormatter = (date) => {
    if ((date) != null) {
        return date.split("T")[0];
    }

    else {
        return date
    }
    
  };

  const handleAccept = (e) => {
    e.preventDefault();
    setIsAccept(true);
  };

  const handleReject = (e) => {
    e.preventDefault();
    setIsAccept(false);
  };


  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (isAccept) {
        Axios.post(`http://localhost:3001/supervisor/accept_leave/${formValues.id}`, [], { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
            setAlertType("alert alert-success");
            setAlertMessage(response.data.message);
            setShow(true);
          })
          .catch((err) => {
            setAlertType("alert alert-danger");
            setAlertMessage("");
            switch (err.response.request.status) {
              case 400:
                setAlertMessage(err.response.data.message);
                setShow(true);
                break;
              case 500:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              case 501:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              case 502:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              default:
                break;
            }
            })
    } else if (isAccept === false) {
        
        Axios.post(`http://localhost:3001/supervisor/reject_leave/${formValues.id}`, [], { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
            setAlertType("alert alert-success");
            setAlertMessage(response.data.message);
            setShow(true);
          })
          .catch((err) => {
            setAlertType("alert alert-danger");
            setAlertMessage("");
            switch (err.response.request.status) {
              case 400:
                setAlertMessage(err.response.data.message);
                setShow(true);
                break;
              case 500:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              case 501:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              case 502:
                setAlertMessage("Server Error!");
                setShow(true);
                break;
              default:
                break;
            }
            })
    }
    setIsAccept(null);
  }, [isAccept]);

  return (

        <div className="container">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
            </div>

            <form>
                <div className="form-group mb-3">
                    <label className="label" >Employee ID</label>
                    <input name="emp_ID" type="text" value={emp_ID} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Leave ID</label>
                    <input name="name" type="text" value={formValues.id} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >First Name</label>
                    <input name="name" type="text" value={formValues.firstname} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Last Name</label>
                    <input name="name" type="text" value={formValues.lastname} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Leave Type</label>
                    <input name="type" type="text" value={formValues.type} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Date</label>
                    <input name="date" type="text" value={dateFormatter(formValues.Date)} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Status</label>
                    <input name="status" type="text" value={formValues.status} readOnly/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Reason</label>
                    <input name="reason" type="text" value={formValues.reason} readOnly/>
                </div>

                <div className="form-group">
                    <button 
                    className="form-control btn btn-info rounded px-3"
                    onClick={handleAccept} >
                        Accept
                    </button>
                </div>

                <div className="form-group">
                    <button 
                    className="form-control btn btn-info rounded px-3" 
                    onClick={handleReject}>
                        Reject
                    </button>
                </div>

                <div className="form-group">
                    <button 
                    className="form-control btn btn-info rounded px-3"
                    onClick={"/supervisorHome"} >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
  );
}
