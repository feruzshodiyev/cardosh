import React, {Component} from 'react';
import './App.css';
import Footer from './containers/Footer/Footer';
import AppHeader from './components/Header/AppHeader';
import {Route, Switch, withRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SearchRoute from "./pages/searchRoute/SearchRoute";
import OfferTrip from "./pages/offerTrip/OfferTrip";
import SignUp from "./pages/sign/Register/SignUp";
import SignIn from "./pages/sign/Auth/SignIn";
import forTestApi from "./pages/forTestApi";
import {notification} from 'antd';

class App extends Component {


    constructor(props) {
        super(props);
        this.state={
            isOnHomePage: true
        }
    }

//checkForCurrentPageOnLoad func is used for detecting current location on load page
    checkForCurrentPageOnLoad = () => {
        if (this.props.history.location.pathname === '/') {
            console.log("home page");
            this.setState({
                isOnHomePage: true
            })
        } else {
            this.setState({
                isOnHomePage: false
            });
        }
    };


    componentDidMount() {
        this.checkForCurrentPageOnLoad();
        // this is used for detecting location on route path change
        this.unlisten = this.props.history.listen((location) => {
            if (location.pathname==="/") {
                this.setState({
                    isOnHomePage: true
                })
            }else {
                this.setState({
                    isOnHomePage: false
                })
            }


        });

    }


    componentWillUnmount() {
        this.unlisten();
    }

handleLogin=()=>{
    notification.success({
        message: 'Cardosh App',
        description: "Вы успешно вошли в систему.",
    });

    this.props.history.push("/");
};

    render(){

    return (


                    <div className="app-js">
                <AppHeader isOnHomePage={this.state.isOnHomePage}/>

                        <Switch>
                    <Route exact path="/" render={()=><HomePage/> }/>
                    <Route path="/search" component={SearchRoute}/>
                    <Route path="/offerTrip" component={OfferTrip}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/login" render={(props)=><SignIn onLogin={this.handleLogin} {...props}/>}/>
                    <Route path="/test" component={forTestApi}/>
                </Switch>
                <Footer isOnHomePage={this.state.isOnHomePage}/>
                    </div>


    );
}
}

export default withRouter(App);
