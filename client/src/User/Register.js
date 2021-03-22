import React, {useState} from 'react';
import axios from 'axios'
import $ from 'jquery'

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nik, setNik] = useState('');
  const [telp, setTelp] = useState('');
  const [name, setName] = useState('');
  const subLog = (e) => {
    e.preventDefault();
    axios.post('http://localhost:1337/register', {username, password, nik, name, telp}).then(({data}) => {
      // console.log(data)
      if (data.success === false) {
        $('form').append('<h1>Something Is Wrong Please Try Again<h1/>')
      } else {
        $('form').append('<h1>Success!<h1/>').then(window.location.assign('/login'))
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (<form onSubmit={subLog}>
    <label>Name</label>
    <input className="form-control" type="text" name="name" value={name} onChange={(e) => {
        setName(e.target.value)
      }}/>
    <label>NIK</label>
    <input className="form-control" type="text" name="nik" value={nik} onChange={(e) => {
        setNik(e.target.value)
      }}/>
    <label>Username</label>
    <input className="form-control" type="text" name="username" value={username} onChange={(e) => {
        setUsername(e.target.value)
      }}/>
    <label>Password</label>
    <input className="form-control" type="password" name="password" value={password} onChange={(e) => {
        setPassword(e.target.value)
      }}/>
    <label>Telephone</label>
    <input className="form-control" type="text" name="telp" value={telp} onChange={(e) => {
        setTelp(e.target.value)
      }}/>
    <button type="submit" className="btn btn-danger">Register</button>
  </form>)
}
