import React, {Component} from 'react';
import './App.scss';
import Footer from './containers/Footer/Footer';
import AppHeader from './components/Header/AppHeader';
import {HashRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
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
import Profile from "./pages/user/Profile"
import MyRides from "./pages/user/MyRides";
import Requests from "./pages/user/Requests";


class App extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
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
        this._isMounted = true;
        this.startLoading();
        this.checkForCurrentPageOnLoad();
        // this is used for detecting location on route path change
        this.unlisten = this.props.history.listen((location) => {
            if (location.pathname === "/") {
                this.setState({
                    isOnHomePage: true
                })
            } else {
                this.setState({
                    isOnHomePage: false
                })
            }


        });

        if (localStorage.getItem(ACCESS_TOKEN)) {

            this.loadCurrentUser();
        } else {
            this.stopLoading();

        }


    }


    componentWillUnmount() {
        this.unlisten();
        this._isMounted = false;
    }


    loadCurrentUser = () => {

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                },()=> this.stopLoading());
            }).catch(error => {
            if (localStorage.getItem(ACCESS_TOKEN) && (error.status === 400 || error.status === 401)) {
                localStorage.clear();
            }
            this.stopLoading();
        }).then(this.stopLoading);

    };

    handleLogin = () => {
        this.stopLoading();
        notification.success({
            message: 'Cardosh App',
            description: "Вы успешно вошли в систему.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    };

    handleLoginFromSignUp = () => {
        notification.success({
            message: 'Cardosh App',
            description: "Вы успешно вошли в систему.",
        });
        this.loadCurrentUser();

    };

    startLoading = () => {
        this.setState({
            isLoading: true,
        })
    };

    stopLoading = () => {
        this.setState({
            isLoading: false,
        })
    };

    render() {
        const userId = this.state.currentUser.id;
        const isAuthenticated = this.state.isAuthenticated
        return (
            <LoadingScreen
                loading={this.state.isLoading}
                bgColor='#ffffff'
                spinnerColor='#ff6600'
                textColor='#ff6600'
                logoSrc={logo}
                text='Подождите!'
            >

                <div id={this.state.isOnHomePage ? "background" : 'background1'}/>

                <div className={this.state.isOnHomePage ? "app-js" : "backGr"}>
                    <AppHeader isOnHomePage={this.state.isOnHomePage} isAuthenticated={this.state.isAuthenticated}
                               userId={userId}
                               name={this.state.currentUser.first_name}
                               profile_image={this.state.currentUser.profile_image}/>

                    <Switch>
                        <Route exact path="/" render={() => <HomePage/>}/>
                        <Route path="/search" render={(props) => <SearchRoute
                            isAuthenticated={isAuthenticated}
                            currentId={userId}
                            {...props}
                        />}/>
                        <Route path="/offerTrip" render={(props) => <OfferTrip
                            currentId={userId}
                            isAuthenticated={isAuthenticated}
                            {...props}
                        />}/>
                        <Route path="/register" render={(props) => <SignUp
                            onRegWait={this.startLoading}
                            onRegSuccess={this.stopLoading}
                            onLogin={this.handleLoginFromSignUp}
                            {...props}
                        />}/>
                        <Route path="/login" render={(props) => <SignIn onLogin={this.handleLogin} {...props}/>}/>
                        {isAuthenticated ? <Route path="/profile/:id" render={(props) => <Profile
                            uploaded={this.loadCurrentUser}
                            {...props}/>}/> : <Redirect to="/"/>}

                        {isAuthenticated ? <Route path="/my-rides/:id" render={(props) => <MyRides

                            {...props}/>}/> : <Redirect to="/"/>}

                            {isAuthenticated ? <Route path="/requests/:id" render={(props) => <Requests

                            {...props}/>}/> : <Redirect to="/"/>}

                    </Switch>
                    <Footer isOnHomePage={this.state.isOnHomePage}/>
                </div>
            </LoadingScreen>


        );
    }
}

export default withRouter(App);
