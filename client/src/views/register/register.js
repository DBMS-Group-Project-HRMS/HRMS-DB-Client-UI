import React, { useState } from "react";
import Axios from 'axios';
import "./register.css";
import { Link } from "react-router-dom";
//import SubHeader from "../../components/subHeader/subHeader";
import { useNavigate } from "react-router-dom";


export function Register() {
  const navigate = useNavigate();
  const [errmsg, setErr] = useState("");

  const [firstname, setfirstname] = useState(""); 
  const [lastname, setlastname] = useState(""); 
  const [birthday, setbirthday] = useState(""); 
  const [email, setemail] = useState(""); 
  const [salary, setsalary] = useState(""); 
  const [joined_date, setjoined_date] = useState(""); 
  const [nic_numbber, setnic_numbber] = useState(""); 
  const [department, setdepartment] = useState(""); 
  const [marital_status, setmarital_status] = useState("");
  const [line1, setline1] = useState("");
  const [line2, setline2] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [postal_code, setpostal_code] = useState("");
  const [emp_type, setemp_type] = useState("");
  const [paygrade, setpaygrade] = useState("");
  const [emp_status, setemp_status] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [con_password, setCon_password] = useState("");
  const [EM_name, setEM_name] = useState("");
  const [EM_phoneN, setEM_phoneN] = useState("");
  const [EM_relation, setEM_relation] = useState("");
  const [phoneN1, setphoneN1] = useState("");
  const [phoneN2, setphoneN2] = useState("");
  



  const register =()=>{
    console.log("registering a user");
    console.log("department: ",department);
    console.log("joined_date",joined_date);
    Axios.post('http://localhost:3001/hr/register',{
        firstname: firstname,
        lastname: lastname,
        birthday: birthday,
        email: email,
        salary: salary,
        joined_date: joined_date,
        nic_number:nic_numbber,
        department:department,
        marital_status:marital_status,
        line1:line1,
        line2:line2,
        city:city,
        district:district,
        postal_code:postal_code,
        emp_type:emp_type,
        paygrade:paygrade,
        emp_status:emp_status,
        username:username,
        password:password,
        EM_name:EM_name,
        EM_phoneN:EM_phoneN,
        EM_relation:EM_relation,
        phoneN1:phoneN1,
        phoneN2:phoneN2
      }).then( (response)=>{
        console.log(response);
      });
  };

  return (

<div className="container">
  <div className="row justify-content-center">
      <div className="col col-md-12 text-center mb-5">
        {/* <SubHeader /> */}
      </div>
  </div>
    <div className="row justify-content-center ">
        <div className="col-md-12 col-lg-10">
          <div className="wrap d-md-flex">
          <div className="img imgLog"></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100"><h3 className="mb-4 center">Registration</h3> </div>
                </div>
                  <form action="#" className="signin-form">
                    <div className="error">
                      <p className="text-danger">{errmsg}</p>
                    </div>


                    <div className="form-group mb-3">
                      <label className="label" >Firstname</label>
                      <input type="text" className="form-control"  value={firstname} onChange={(e) => {setfirstname(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Lastname</label>
                      <input type="text" className="form-control" value={lastname} onChange={(e) => {setlastname(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Birthday</label>
                      <input type="date" className="form-control"  value={birthday} onChange={(e) => {setbirthday(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" >Email</label>
                        <input type="email" className="form-control"  value={email} onChange={(e) => {setemail(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Salary</label>
                      <input type="text" className="form-control"  value={salary} onChange={(e) => {setsalary(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Joined_date</label>
                      <input type="date" className="form-control"  value={joined_date} onChange={(e) => {setjoined_date(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >nic_number</label>
                      <input type="text" className="form-control"  value={nic_numbber} onChange={(e) => {setnic_numbber(e.target.value); }} required/>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-6">
                        <label className="label" >phone_number1</label>
                        <input type="text" className="form-control"  value={phoneN1} onChange={(e) => {setphoneN1(e.target.value); }} required/>
                        </div>
                        <div class="form-group col-6">
                        <label className="label" >phone_number2</label>
                        <input type="text" className="form-control"  value={phoneN2} onChange={(e) => {setphoneN2(e.target.value); }} required/>
                        </div>
                    </div>

                    <div className="form-group mb-3">
                    <label className="label" >Department</label>
                    <select class="custom-select custom-select-lg mb-3" onChange={(e) => {setdepartment(e.target.value); }} value={department}>
                    <option selected>Open this select menu</option>
                    <option value="2">Maintenance</option>
                    <option value="3">IT</option>
                    <option value="4">PR</option>
                    <option value="5">Marketing</option>
                    </select>
                    </div>

                    <div className="form-group mb-3">
                    <label className="label" >Marital Status</label>
                    <select class="custom-select custom-select-lg mb-3" onChange={(e) => {setmarital_status(e.target.value); }} value={marital_status}>
                    <option selected>Open this select menu</option>
                    <option value="1">Married</option>
                    <option value="2">Unmarried</option>
                    </select>
                    </div>

                    <div className="form-group mb-3">
                    <label className="label" >Employee Type</label>
                    <select class="custom-select custom-select-lg mb-3" onChange={(e) => {setemp_type(e.target.value); }} value={emp_type}>
                    <option selected>Open this select menu</option>
                    <option value="2">Accountant</option>
                    <option value="3">Software Engineer</option>
                    <option value="4">QA Engineer</option>
                    </select>
                    </div>

                    <div className="form-group mb-3">
                    <label className="label" >paygrade</label>
                    <select class="custom-select custom-select-lg mb-3" onChange={(e) => {setpaygrade(e.target.value); }} value={paygrade}>
                    <option selected>Open this select menu</option>
                    <option value="1">level 1</option>
                    <option value="2">level 2</option>
                    <option value="3">level 3</option>
                    <option value="4">level 4</option>
                    </select>
                    </div>

                    <div className="form-group mb-3">
                    <label className="label" >Employee status</label>
                    <select class="custom-select custom-select-lg mb-3" onChange={(e) => {setemp_status(e.target.value); }} value={emp_status}>
                    <option selected>Open this select menu</option>
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
                      <input type="text" className="form-control"  value={line1} onChange={(e) => {setline1(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Line 2</label>
                      <input type="text" className="form-control"  value={line2} onChange={(e) => {setline2(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >city</label>
                      <input type="text" className="form-control"  value={city} onChange={(e) => {setcity(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >District</label>
                      <input type="text" className="form-control"  value={district} onChange={(e) => {setdistrict(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Postal code</label>
                      <input type="text" className="form-control"  value={postal_code} onChange={(e) => {setpostal_code(e.target.value); }} required/>
                    </div>

                    <br></br><br></br><br></br>

                    <h3>Emergency Contact Number Details</h3>

                    <div className="form-group mb-3">
                      <label className="label" >Name</label>
                      <input type="text" className="form-control"  value={EM_name} onChange={(e) => {setEM_name(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Phone Number</label>
                      <input type="text" className="form-control"  value={EM_phoneN} onChange={(e) => {setEM_phoneN(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >Relation</label>
                      <input type="text" className="form-control"  value={EM_relation} onChange={(e) => {setEM_relation(e.target.value); }} required/>
                    </div>

                    <br></br><br></br><br></br>

                    <div className="form-group mb-3">
                      <label className="label" >username</label>
                      <input type="text" className="form-control"  value={username} onChange={(e) => {setusername(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >password</label>
                      <input type="password" className="form-control"  value={password} onChange={(e) => {setpassword(e.target.value); }} required/>
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" >confimation password</label>
                      <input type="password" className="form-control"  value={con_password} onChange={(e) => {setCon_password(e.target.value); }} required/>
                    </div>



                    <div className="form-group">
                      <button type="submit" onClick={register} className="form-control btn btn-info rounded submit px-3" >
                      Register
                      </button>
                    </div>
                </form>
             </div>
          </div>
        </div>
    </div>
</div>

  );
}
