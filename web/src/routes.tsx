import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home'
import Movies from './pages/Movies'
import Login from './pages/Login'

const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/movies' component={Movies}/>
          </Switch>
        </BrowserRouter>
    )
}

export default Routes