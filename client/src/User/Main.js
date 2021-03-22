import React from 'react';
// import axios from 'axios'
// import $ from 'jquery'
import Login from './Login.js';

export default function Main() {
  return (<div>
    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Login">
      Login
    </button>
    <div className="modal fade" id="Login" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark text-light">
            <h2 className="modal-title bg-dark text-light" id="loginModal">Login</h2>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body bg-dark text-light">
            <Login/>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
