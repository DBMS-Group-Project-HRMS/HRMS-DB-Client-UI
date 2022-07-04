import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";


export function ViewUserRequest() {
  
  const navigate = useNavigate();
  const { emp_ID } =useParams();
  const [formValues, setformValues] = useState([]);
  const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect( ()=> {
    Axios.get(`http://localhost:3001/supervisor/getLeaveData/${emp_ID}`).then((response)=>{
      setformValues(response.data.data);
    });
  },[]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const dateFormatter = (date) => {
    return date.split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(formValues);
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit) {
        setData(formValues);
        let token = sessionStorage.getItem("token");
        Axios.post('http://localhost:3001/manager/edit_user/' + formValues.id, data, { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
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
  }, [isSubmit, formValues, data]);

  return (

        <div className="container">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
                {alertMessage}
            </div>

            <form>
                <div className="form-group mb-3">
                    <label className="label" >Employee ID</label>
                    <input name="emp_ID" type="text" value={emp_ID}/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Name</label>
                    <input name="name" type="text" value={formValues.firstname}/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Leave Type</label>
                    <input name="type" type="text" value={formValues.type}/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Date</label>
                    <input name="date" type="text" value={dateFormatter(formValues.date)}/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Status</label>
                    <input name="status" type="text" value={formValues.status}/>
                </div>

                <div className="form-group mb-3">
                    <label className="label" >Reason</label>
                    <input name="reason" type="text" value={formValues.reason}/>
                </div>

                <div className="form-group">
                    <button 
                    className="form-control btn btn-info rounded px-3"
                    onClick={handleSubmit} >
                        Accept
                    </button>
                </div>

                <div className="form-group">
                    <button 
                    className="form-control btn btn-info rounded px-3" 
                    onClick={handleSubmit}>
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
