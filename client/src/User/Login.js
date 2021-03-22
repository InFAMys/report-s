import React, {useState} from 'react';
import axios from 'axios'
import $ from 'jquery'
import './style/style.css'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const subLog = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/login', {username, password}).then(({data}) => {
      // console.log(data)
      if (data.success === false) {
        $('form').append('<center><h3 className="inv">Invalid Credentials<h3/></center>')
      } else {
        sessionStorage.setItem('token', JSON.stringify(data.token))
        window.location.assign('/')
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (<div className="bg-dark text-light">
    <form onSubmit={subLog}>
      <div className="user-form">
        <label>Username</label>
        <input className="form-control" type="text" name="username" value={username} onChange={(e) => {
            setUsername(e.target.value)
          }} required/>
      </div>
      <div className="pw-form">
        <label>Password</label>
        <input className="form-control" type="password" name="password" value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} required/>
      </div>
      <center><button type="submit" className="btn btn-danger b-form">Login</button></center>
    </form>
  </div>)
}
