import React, {useState} from 'react';
import axios from 'axios'
import $ from 'jquery'

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const subLog = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/login', {username, password}).then(({data}) => {
      // console.log(data)
      if (data.success === false) {
        $('form').append('<h1>Invalid Credentials<h1/>')
      } else {
        sessionStorage.setItem('token', JSON.stringify(data.token))
        window.location.assign('/')
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (<form onSubmit={subLog}>
    <label>Username</label>
    <input className="form-control" type="text" name="username" value={username} onChange={(e) => {
        setUsername(e.target.value)
      }}/>
    <label>Password</label>
    <input className="form-control" type="password" name="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}/>
    <button type="submit" className="btn btn-danger">Login</button>
  </form>)
}
