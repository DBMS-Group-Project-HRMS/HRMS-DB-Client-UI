import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import "../../styles/login.css";

export function Login() {
    return(
        <div className="login">
            <div className="">
                <div className="">
                <div className="position-absolute top-50 start-50 translate-middle">
                <h1 className="loginHeading">Human Resource Management System</h1>
                <br></br>
                <div className="row">
                  <Form> 
                    <FormGroup>
                      <Label htmlFor="username" size="lg">
                        Username
                      </Label>
                      <Input
                        type="text"
                        id="username"
                        name="username"
                        // value={formValues.username}
                        // onChange={handleChange}
                      />
                      <p
                        class="fst-italic fw-bolder"
                        style={{ color: "#f93154" }}
                      >
                        {/* {formErrors.username} */}
                      </p>
                    </FormGroup>


                    <FormGroup>
                      <Label htmlFor="password" size="lg">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        // value={formValues.password}
                        // onChange={handleChange}
                      />
                      <p
                        class="fst-italic fw-bolder"
                        style={{ color: "#f93154" }}>
                        {/* {formErrors.password} */}
                      </p>
                    </FormGroup>

                    <br></br>
                    <div className="d-grid gap-2">
                      <Button
                        size="lg"
                        type="submit"
                        value="submit"
                        color="primary">
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}