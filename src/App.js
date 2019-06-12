import React, {Component} from 'react';
import './App.css';
import Footer from './containers/Footer/Footer'
import AppHeader from './components/Header/AppHeader'
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SearchRoute from "./pages/searchRoute/SearchRoute";
import OfferTrip from "./pages/offerTrip/OfferTrip";
import SignUp from "./pages/sign/SignUp";
import SignIn from "./pages/sign/SignIn";

class App extends Component {
    render(){
    return (

                <BrowserRouter>
                    <div>
                <AppHeader/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/search" component={SearchRoute}/>
                    <Route path="/offerTrip" component={OfferTrip}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/login" component={SignIn}/>
                </Switch>
                <Footer/>
                    </div>
                </BrowserRouter>

    );
}
}

export default App;
