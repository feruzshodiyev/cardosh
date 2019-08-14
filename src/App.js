import React, {Component} from 'react';
import './App.scss';
import Footer from './containers/Footer/Footer';
import AppHeader from './components/Header/AppHeader';
import {Route, Switch, withRouter} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import SearchRoute from "./pages/searchRoute/SearchRoute";
import OfferTrip from "./pages/offerTrip/OfferTrip";
import SignUp from "./pages/sign/Register/SignUp";
import SignIn from "./pages/sign/Auth/SignIn";
import {notification} from 'antd';
import {getCurrentUser} from './utils/ApiUtils'
import {ACCESS_TOKEN} from "./constants";
import LoadingScreen from 'react-loading-screen'
import logo from "./images/logo.png";

class App extends Component {


    constructor(props) {
        super(props);
        this.state={
            isOnHomePage: true,
            currentUser: {},
            isAuthenticated: false,
            isLoading: true
        }
    }

//checkForCurrentPageOnLoad func is used for detecting current location on load page
    checkForCurrentPageOnLoad = () => {
        if (this.props.history.location.pathname === '/') {
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
        this.startLoading();
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

        if (localStorage.getItem(ACCESS_TOKEN)) {

            this.loadCurrentUser();
        }else {
            this.stopLoading();

        }


    }


    componentWillUnmount() {
        this.unlisten();
    }


    loadCurrentUser = () => {

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                });
                this.stopLoading();
                localStorage.setItem("user", this.state.currentUser.id);
            }).catch(error=>{
                if (localStorage.getItem(ACCESS_TOKEN)){
                    localStorage.clear();
                }
                this.stopLoading();
        }).then(this.stopLoading);

    };

handleLogin=()=>{
    this.stopLoading();
    notification.success({
        message: 'Cardosh App',
        description: "Вы успешно вошли в систему.",
    });
this.loadCurrentUser();
    this.props.history.push("/");
};

handleLoginFromSignUp=()=>{
    notification.success({
        message: 'Cardosh App',
        description: "Вы успешно вошли в систему.",
    });
    this.loadCurrentUser();

};

    startLoading=()=>{
        this.setState({
            isLoading: true,
        })
    };

    stopLoading=()=>{
        this.setState({
            isLoading: false,
        })
    };

    render(){
const currentId = this.state.currentUser.id;

        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor='#ffffff'
                spinnerColor='#ff6600'
                textColor='#ff6600'
                logoSrc={logo}
                text='Подождите!'
            >

            <div className="app-js">
                <AppHeader isOnHomePage={this.state.isOnHomePage} isAuthenticated={this.state.isAuthenticated}
                           name={this.state.currentUser.first_name}/>

                <Switch>
                    <Route exact path="/" render={() => <HomePage/>}/>
                    <Route path="/search" component={SearchRoute}/>
                    <Route path="/offerTrip" render={(props)=><OfferTrip
                        onWait={this.startLoading}
                        onResponse={this.stopLoading}
                        currentId={currentId}
                        {...props}
                    />}/>
                    <Route path="/register" render={(props)=><SignUp
                        onRegWait={this.startLoading}
                        onRegSuccess={this.stopLoading}
                        onLogin={this.handleLoginFromSignUp}
                        {...props}
                    />}/>
                    <Route path="/login" render={(props) => <SignIn onLogin={this.handleLogin} {...props}/>}/>
                </Switch>
                <Footer isOnHomePage={this.state.isOnHomePage}/>
            </div>
            </LoadingScreen>


        );
}
}

export default withRouter(App);
