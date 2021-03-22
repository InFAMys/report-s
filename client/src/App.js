import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './User/Login.js'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (<BrowserRouter>
    <Switch>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <h1>This Is APP</h1>
      </Route>
    </Switch>

  </BrowserRouter>);
}

export default App;
