import React, { useState, useEffect } from "react";
import './ViewUser.css'


export function CheckIf() {
    if (sessionStorage.getItem('paygrade') == 'level 3' || sessionStorage.getItem('paygrade') == 'level 4') {
      return ( 
          <div>                       
            <button class="btn btn-outline-primary px-4" data-bs-toggle="modal" data-bs-target="#editUser">Edit Details</button>
          </div> 
      )
    }
  }