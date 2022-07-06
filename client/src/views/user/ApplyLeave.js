import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./ApplyLeave.css";

export function ApplyLeave() {

    const [formValues, setformValues] = useState({});
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [leaveTypes, setLeaveTypes] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]:value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    }

    useEffect( ()=> {
      Axios.get("http://localhost:3001/getleavetypes").then((response)=>{
        //setUserslist(response.data);
        const selectDetails = response.data;
        setLeaveTypes([...selectDetails[0]]);
      });
    },[]);

    useEffect(() => {
        if (isSubmit) {
          let token = sessionStorage.getItem("token");
          Axios.post('http://localhost:3001/user/apply_leave', 
          formValues, { headers:{Authorization : `Bearer ${token}`}}
          ).then( (response)=>{
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
            });
            setIsSubmit(false);
        }
      },[isSubmit,formValues]);

    return (
        <div className="container leave mb-3 mt-3">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
            </div>
            <h1 className="text-center mt-5 mb-0">Apply for a Leave</h1>
            <form onSubmit={handleSubmit}>
              
                <div className="form-group mb-3">
                    <label className="label" >Absent Date</label>
                    <input type="date" className="form-control"  name="leave_date" value={formValues.leave_date} onChange={handleChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="label" >Reason</label>
                    <textarea className="form-control" name="reason" rows="5" onChange={handleChange} value={formValues.reason}></textarea>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Leave Type:</label><br/>
                    <select className="custom-select custom-select-lg mb-3" name="type" id="type" value={formValues.type} onChange={handleChange} required>
                    <option >Open this select menu</option>
                    {leaveTypes.map(category => <option key={category.ID} value={category.ID}>{category.type}</option>)}
                    </select>
                </div>

                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-outline-primary mx-3" >
                    Submit
                  </button>
                </div>
            </form>
        </div>
    );
}