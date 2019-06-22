import React, {Component} from 'react';
import './App.css';
import Footer from './containers/Footer/Footer'
import AppHeader from './components/Header/AppHeader'
import {Route, Switch, withRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SearchRoute from "./pages/searchRoute/SearchRoute";
import OfferTrip from "./pages/offerTrip/OfferTrip";
import SignUp from "./pages/sign/Register/SignUp";
import SignIn from "./pages/sign/Auth/SignIn";
import forTestApi from "./pages/forTestApi"

class App extends Component {


    constructor(props) {
        super(props);
        this.state={
            isOnHomePage: true
        }
    }



    componentWillMount() {
        this.unlisten = this.props.history.listen((location) => {
            if (location.pathname==="/") {
                console.log("home page");
                this.setState({
                    isOnHomePage: true
                })
            }else {
                this.setState({
                    isOnHomePage: false
                })
            }
            console.log("on route change "+location.pathname);

        });
    }
    componentWillUnmount() {
        this.unlisten();
    }

    render(){

    return (


                    <div className="app-js">
                <AppHeader isOnHomePage={this.state.isOnHomePage}/>

                        <Switch>
                    <Route exact path="/" render={()=><HomePage/> }/>
                    <Route path="/search" component={SearchRoute}/>
                    <Route path="/offerTrip" component={OfferTrip}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/login" component={SignIn}/>
                    <Route path="/test" component={forTestApi}/>
                </Switch>
                <Footer/>
                    </div>


    );
}
}

export default withRouter(App);
