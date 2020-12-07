import React from 'react';
import {BrowserRouter as Router , Route, Switch, Redirect} from "react-router-dom";
import SignIn from "./Components/Forms/SignIn/SignIn";
import SignUp from "./Components/Forms/SignUp/SignUp";
import ForgotPassword from "./Components/Forms/ForgotPassword/ForgotPassword";
import HomePage from "./Components/Home/Home";
import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
           <Redirect to="/signIn"/>
           <Switch>
               <Route  path="/signIn"><SignIn/></Route>
               <Route  path="/signUp"><SignUp/></Route>
               <Route path="/home"><HomePage/></Route>
               <Route path="/forgotPassword"><ForgotPassword/></Route>
           </Switch>
       </Router>
    </div>
  );
}

export default App;
