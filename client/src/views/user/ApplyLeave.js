import React, { useState, useEffect } from "react";
import Axios from 'axios';

export function ApplyLeave(props) {

    const [formValues, setformValues] = useState({});
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [show, setShow] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValues({ ...formValues, [name]:value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    }

    useEffect(() => {
        if (isSubmit) {
          console.log(formValues);
          let token = sessionStorage.getItem("token");
          console.log("Applying for a leave");
          Axios.post('http://localhost:3001/user/apply_leave', 
          { headers:{Authorization : `Bearer ${token}`}},
          formValues).then( (response)=>{
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
        <div className="container">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label className="label" >Joined_date</label>
                    <input type="date" className="form-control"  name="leave_date" value={formValues.leave_date} onChange={handleChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="label" >Reason</label>
                    <textarea className="form-control" name="reason" rows="5" onChange={handleChange} value={formValues.reason}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="form-control btn btn-info rounded submit px-3" >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}