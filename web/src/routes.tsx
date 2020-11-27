import React from "react";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Movies from './pages/Movies'
import Login from './pages/Login'
import Premieres from "./pages/Movies/Premieres";
import Movie from "./pages/Movie";
import Home from "./pages/Home";

const Routes = () => {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/movies' component={Movies}/>
            <Route path='/movies/:id' component={Movie}/>
            <Route exact path='/premieres' component={Premieres}/>
          </Switch>
        </BrowserRouter>
    )
}

export default Routes