import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home';
import Display from './Pages/Display';
import User from './Pages/User';
import Register from './Pages/Register';
import Status from './Pages/Status';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Test from './components/Test';


function App() {


   

  return (
    <div className="App">
     
     <Router>
     <Switch>
      <Route exact path="/">
        <Home/>

      </Route>
      <Route  path="/user">
        <User/>

      </Route>
      <Route  path="/register">
        <Register/>

      </Route>
      <Route  path="/login">
        <Login/>

      </Route>
      <Route  path="/status">
        <Status/>

      </Route>
      <Route  path="/settings/:id">
        <Settings/>

      </Route>


     </Switch>
     </Router>
     
    </div>
  );
}

export default App;
