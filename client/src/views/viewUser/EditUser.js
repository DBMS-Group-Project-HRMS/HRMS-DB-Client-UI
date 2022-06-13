import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";


export function EditUser(props) {
  const navigate = useNavigate();

  const initialValues = props.userDetails;
  const [formValues, setformValues] = useState(initialValues);
  const [data, setData] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [show, setShow] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("initial", initialValues);
  console.log("form", formValues);

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
        Axios.post('http://localhost:3001/manager/edit_user/' + formValues.id, data).then( (response)=>{
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
                  <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
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
                        <option value="2">Maintenance</option>
                        <option value="3">IT</option>
                        <option value="4">PR</option>
                        <option value="5">Marketing</option>
                        </select>
                        </div>

                        <div className="form-group mb-3">
                        <label className="label" >Marital Status</label>
                        <select name="marital_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.marital_id}>
                        <option value="1">Married</option>
                        <option value="2">Unmarried</option>
                        </select>
                        </div>

                        <div className="form-group mb-3">
                        <label className="label" >Employee Type</label>
                        <select name="emptype_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.emptype_id}>
                        <option value="3">Accountant</option>
                        <option value="4">Software Engineer</option>
                        <option value="5">QA Engineer</option>
                        </select>
                        </div>

                        <div className="form-group mb-3">
                        <label className="label" >paygrade</label>
                        <select name="paygrade_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.paygrade_id}>
                        <option value="1">level 1</option>
                        <option value="2">level 2</option>
                        <option value="3">level 3</option>
                        <option value="4">level 4</option>
                        </select>
                        </div>

                        <div className="form-group mb-3">
                        <label className="label" >Employee status</label>
                        <select name="empstatus_id" className="custom-select custom-select-lg mb-3" onChange={handleChange} value={formValues.empstatus_id}>
                        <option value="1">Intern-fulltime</option>
                        <option value="2">Intern-parttime</option>
                        <option value="3">Contract-fulltime</option>
                        <option value="4">Contract-parttime</option>
                        <option value="5">permanent</option>
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
                        <button type="submit" className="form-control btn btn-info rounded submit px-3" >
                            Save
                        </button>
                        </div>
                    </form>
             </div>

  );
}

//{
//     id: 36,
//     empId: 33,
//     firstname: 'sgsg',
//     lastname: 'sgdh',
//     birthday: '2022-06-16',
//     email: 'shtdhtd@gmail.com',
//     salary: 12414,
//     Joined_date: '2022-06-15',
//     nic_number: '131435',
//     photo: null,
//     leave_count: 0,
//     name: 'fsgsg',
//     status: 'contract-fulltime',
//     line1: 'asgsrg',
//     line2: 'shtd',
//     city: 'djhtdj',
//     district: 'tdjsdt',
//     postal_code: '2344',
//     type: 'Software Engineer',
//     paygrade: 'level 2',
//     phone_number: '1234567890',
//     relationship: 'srhs'
//   }