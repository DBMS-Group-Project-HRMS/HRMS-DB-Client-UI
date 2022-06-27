import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "../../styles/login.css";
import Footer from "../footer/footer";
import { login } from "./loginUtils";
import { Link } from "react-router-dom";


export function Login() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const initialValues = { username: "", password: "" };
  const [formValues, setformValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    setUserName(formValues.username);
    setPassword(formValues.password);
  }, [isSubmit, formValues]);

  useEffect(() => {
    if (isSubmit){
      login({ username, password })
      .then((level) => {
        //const level = sessionStorage.getItem("paygrade");
        if (level == 'level 1'){
          navigate('/employeeHome');
        } else if(level == 'level 2'){
          navigate('/supervisorHome');
        } else if (level == 'level 3'){
          navigate('/managerHome');
        } else if (level == 'level 4'){
          navigate('/hrHome');
        } else {
          console.log("Invalid paygrade", level);
        }
      })
      .catch((err) => {
        switch (err.request.status) {
          case 400:
              setAlertMessage(err.response.data.message);
            setShow(true);
            break;
          case 401:
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
    }, [isSubmit, username, password]);

    return(
      <div>
        <div className="col-6">
        </div>
          <div className="loginBody"> 
            <div className='login'>
                <h2 > Human Resource Management System </h2>
                <div className="row">
                  <div>
                    <Form onSubmit={handleSubmit}>
                      <Input type="text"  value={formValues.username} onChange={handleChange} className="text" name="username"/>
                      <span>username</span>

                      <br/>
                      <br/>

                      <Input type="password" value={formValues.password} onChange={handleChange} className="text" name="password"/>
                      <span>password</span>

                      <br/>
                      
                      <button className="signin">
                        Sign In
                      </button>
                    </Form>
                  </div>
                  <div>
                    <a href="#">Forgot Password?</a>
                  </div>
                </div>
              </div>
              // <Footer />
            </div>
          </div>
    )
}