import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "../../styles/login.css";
import Footer from "../footer/footer";

export function Login() {
    return(
                 
        <div>
          <div className="login">
            <h2 > Human Resource Management System </h2>
            <div className="row">
              <div className="col-6">
                <Form>
                  <Input type="text" className="text" name="username"/>
                  <span>username</span>

                  <br/>
                  <br/>

                  <Input type="password" className="text" name="password"/>
                  <span>password</span>

                  <br/>
                
                  <Input type="checkbox" id="checkbox-1-1" className="custom-checkbox" />
                  <label for="checkbox-1-1">Keep me Signed in</label>
                  
                  <button className="signin">
                    Sign In
                  </button>
                </Form>
              </div>
              <div className="col-6">
                <img src="assets/images/vector-1.png" alt="login vector"/>
              </div>
              <div className="col-6">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="col-6">
                <a href="#">Back to Home</a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
    )
}