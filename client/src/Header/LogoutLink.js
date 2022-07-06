import React from "react";
import {Nav} from 'react-bootstrap';

export function LogoutLink() {
    if (sessionStorage.getItem('paygrade') !== null){
        return (<Nav.Link href="/logout">Logout</Nav.Link>)
    }
  }