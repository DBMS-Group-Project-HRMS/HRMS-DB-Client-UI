import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./ViewPaygrades.css"

export function EditPaygrade(props) {
  const paygrade = props.paygrade;
  const myname = props.myname;

  const [formValues, setformValues] = useState({});
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect( ()=> {
    setformValues(paygrade)
    console.log("in model:",paygrade)

  }, [paygrade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
        let token = sessionStorage.getItem("token");
        Axios.post('https://hrms-client-server.onrender.com/hr/edit_paygrade/', formValues, { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
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
    }
    setIsSubmit(false);
  }, [isSubmit, formValues]);

  return (

<div className="container background-viewpay">
  <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
      {alertMessage}
  </div>

  <form onSubmit={handleSubmit}>
    <div className="form-group mb-3">
      <label className="label" >Paygrade</label>
     <p className="form-control"> {formValues.paygrade}</p>
    </div>

    <div className="form-group mb-3">
      <label className="label" >Salary</label>
      <input name="salary" type="number" className="form-control"  value={formValues.salary} onChange={handleChange} required/>
    </div>

    <div className="form-group mb-3">
      <label className="label" >Nuber of Leaves</label>
      <input name="num_leaves" type="number" className="form-control"  value={formValues.num_leaves} onChange={handleChange} required/>
    </div>

    <div>
      <button className="btn btn-primary" type="submit">Save</button>
    </div>
  </form>
</div>

  );
}