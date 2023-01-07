import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";
import './ViewUser.css'

export function EditUser(props) {
  const navigate = useNavigate();

  const initialValues = props.userDetails;
  const [formValues, setformValues] = useState(initialValues);
  const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [depSelect, setDepSelect] = useState([]);
  const [MsSelect, setMsSelect] = useState([]);
  const [EtSelect, setEtSelect] = useState([]);
  const [PgSelect, setPgSelect] = useState([]);
  const [EsSelect, setEsSelect] = useState([]);

  useEffect( ()=> {
    Axios.get("https://hrms-client-server.onrender.com/getHRMSdetails").then((response)=>{
      //setUserslist(response.data);
      const selectDetails = response.data;
      setDepSelect([...selectDetails[0]]);
      setMsSelect([...selectDetails[1]]);
      setEtSelect([...selectDetails[2]]);
      setPgSelect([...selectDetails[3]]);
      setEsSelect([...selectDetails[4]]);
    });
  },[]);

  useEffect(() => { setformValues(initialValues)}, [initialValues] );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
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
        Axios.post('https://hrms-client-server.onrender.com/manager/edit_user/' + formValues.id, data, { headers:{Authorization : `Bearer ${token}`}}).then( (response)=>{
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

          <div className="container bg-viewuser">
            <div style={{ visibility: show ? "visible" : "hidden" }} className={alertType} role="alert">
              {alertMessage}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
              <label className="label" >Firstname</label>
              <input name="firstname" type="text" className="form-control"  value={formValues.firstname} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Lastname</label>
              <input name="lastname" type="text" className="form-control" value={formValues.lastname} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Birthday</label>
              <input name="birthday" type="date" className="form-control"  value={formValues.birthday} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
                  <label className="label" >Email</label>
                  <input name="email" type="email" className="form-control"  value={formValues.email} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Salary</label>
              <input name="salary" type="text" className="form-control"  value={formValues.salary} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Joined_date</label>
              <input name="Joined_date" type="date" className="form-control"  value={formValues.Joined_date} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >nic_number</label>
              <input name="nic_number" type="text" className="form-control"  value={formValues.nic_number} onChange={handleChange} required/>
              </div>

              <div className="form-row">
                  <div className="form-group col-6">
                  <label className="label" >phone_number1</label>
                  <input name="phone1" type="text" className="form-control"  value={formValues.phone1} onChange={handleChange} required/>
                  </div>
                  <div className="form-group col-6">
                  <label className="label" >phone_number2</label>
                  <input name="phone2" type="text" className="form-control"  value={formValues.phone2} onChange={handleChange} required/>
                  </div>
              </div>

              <div className="form-group mb-3">
              <label className="label" >Department</label>
              <select name="dept_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.dept_id}>
              {depSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              </div>

              <div className="form-group mb-3">
              <label className="label" >Marital Status</label>
              <select name="marital_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.marital_id}>
              {MsSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              </div>

              <div className="form-group mb-3">
              <label className="label" >Employee Type</label>
              <select name="emptype_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.emptype_id}>
              {EtSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              </div>

              <div className="form-group mb-3">
              <label className="label" >Employee status</label>
              <select name="empstatus_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.empstatus_id}>
              {EsSelect.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              </div>

              <br></br><br></br><br></br>

              <h3>Address</h3>

              <div className="form-group mb-3">
              <label className="label" >Line 1</label>
              <input name="line1" type="text" className="form-control"  value={formValues.line1} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Line 2</label>
              <input name="line2" type="text" className="form-control"  value={formValues.line2} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >city</label>
              <input name="city" type="text" className="form-control"  value={formValues.city} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >District</label>
              <input name="district" type="text" className="form-control"  value={formValues.district} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
              <label className="label" >Postal code</label>
              <input name="postal_code" type="text" className="form-control"  value={formValues.postal_code} onChange={handleChange} required/>
              </div>

              <br></br><br></br><br></br>

              <h3>Emergency Contact Number Details</h3>

              <div className="form-group mb-3">
                <label className="label" >Name</label>
                <input name="name" type="text" className="form-control"  value={formValues.name} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
                <label className="label" >Phone Number</label>
                <input name="phone_number" type="text" className="form-control"  value={formValues.phone_number} onChange={handleChange} required/>
              </div>
              <div className="form-group mb-3">
                <label className="label" >Relation</label>
                <input name="relationship" type="text" className="form-control"  value={formValues.relationship} onChange={handleChange} required/>
              </div>

              <div className="form-group">
                <button type="submit" className="form-control btn btn-info rounded submit px-3"  data-bs-dismiss="modal">
                    Save
                </button>
              </div>
            </form>
          </div>

  );
}
