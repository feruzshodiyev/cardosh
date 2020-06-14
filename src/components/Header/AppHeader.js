import React, {Component} from 'react';
import {Layout, Menu, Icon, Avatar, Dropdown, Drawer, Badge} from 'antd';
import axios from "axios";

import {Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';


import './AppHeader.scss';
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";

const Header = Layout.Header;
const MenuItem = Menu.Item;

class AppHeader extends Component {
 interval=null;
    constructor(props) {
        super(props);

        this.state = {
            prevScrollpos: window.pageYOffset,
            visible: false,
            drawerVisible: false,
            drawerVisible2: false,
            newReq: 0,
            acceptedReq: 0

        }
    }

    componentDidMount() {
        this.interval=setInterval(()=>{
            this.getRequests();
            },60000);
        window.addEventListener('scroll', this.handleScroll)
        this.getRequests();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);

    }

    handleScroll = () => {
        const {prevScrollpos} = this.state;

        const currentScrollPos = window.pageYOffset;

        const visible = prevScrollpos !== currentScrollPos;

        this.setState({
            visible: visible
        });

    };

    getRequests = () => {

        // Get count of new requests
        axios.get("http://api.cardosh.uz/v1/notifications/new/requests/number/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            console.log(res);
            this.setState({
                newReq: res.data
            });
        }).catch(err => {
            console.log("New requests number error", err)
        });

        // Get count of accepted requests
        axios.get("http://api.cardosh.uz/v1/notifications/accepted/requests/number/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            console.log(res);
            this.setState({
                acceptedReq: res.data
            });
        }).catch(err => {
            console.log("Accepted requests number error", err)
        });



    };


    cleanNotifications = () =>{



        if (this.state.newReq>0){

            this.setState({
                newReq: 0
            });

        }

    };

    cleanNotifications2 = () =>{
        if (this.state.acceptedReq>0){

            this.setState({
                acceptedReq: 0
            });
            //
            // axios.put("http://api.cardosh.uz/v1/notifications/clean/requests/number/",{}, {
            //     headers: {
            //         "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            //     }
            // }).then(res=>{
            //     this.setState({
            //         acceptedReq: 0
            //     });
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })
        }
    };




    handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.reload();


    };

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };
    showDrawer2 = () => {
        this.setState({
            drawerVisible2: true,
        });
    };

    onCloseDrawer = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    onCloseDrawer2 = () => {
        this.setState({
            drawerVisible2: false,
        });
    };


    render() {
        const userId = this.props.userId;
        const menu = (
            <Menu>
                <Menu.Item key="1">
                    <Link to={`/profile/${userId}/general`}>Профиль</Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={this.cleanNotifications2}>
                    <Badge dot={this.state.acceptedReq>0}>
                    <Link to={`/requests/${userId}`}>Предложения</Link>
                    </Badge>
                </Menu.Item>
                <Menu.Item key="3" onClick={this.cleanNotifications}>
                    <Badge dot={this.state.newReq>0}>
                    <Link to={`/my-rides/${userId}`}>Мои заявки</Link>
                    </Badge>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="4" onClick={this.handleLogout}><Icon type="logout"/>Выйти</Menu.Item>
            </Menu>
        );

        const drawerVisible = this.state.drawerVisible;
        const drawerVisible2 = this.state.drawerVisible2;
        const {profile_image} = this.props;

        return (


            <Header
                className={this.props.isOnHomePage ? (this.state.visible ? ("app-header") : ("withoutHeader")) : ("app-header")}>
                <div className="container">

                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        style={{lineHeight: '63px'}}
                    >
                        <MenuItem key="main">
                            <Link to="/">CARDOSH</Link>
                        </MenuItem>

                        <MenuItem key="search">
                            <Link to="/search"> <Icon type="search"
                                                      style={{fontSize: '16px'}}/>Найти пасажира</Link>
                        </MenuItem>
                        <MenuItem key="offerTrip">
                            <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Оставить
                                заявку</Link>
                        </MenuItem>
                        {
                            !this.props.isAuthenticated ?
                                <MenuItem key="addUser">
                                    <Link to="/register"><Icon type="user-add"
                                                               style={{fontSize: '16px'}}/> Регистрация</Link>
                                </MenuItem>
                                : ''

                        }

                        {!this.props.isAuthenticated ? (<MenuItem key="login">
                            <Link to="/login"> <Icon type="login"
                                                     style={{fontSize: '16px'}}/>Войти</Link>
                        </MenuItem>) : ''}

                        {this.props.isAuthenticated ? <MenuItem key="user" className="avatar">
                            <Dropdown
                                placement="bottomCenter"
                                overlayStyle={{width: "200px"}}
                                overlay={menu}
                                trigger={['click']}>
                                <div>
                                    <p>{this.props.name}</p>
                                    {profile_image != null ? <Badge count={this.state.newReq+this.state.acceptedReq}>
                                            <Avatar
                                                size='large'
                                                src={"http://api.cardosh.uz" + profile_image}/>
                                        </Badge> :
                                        <Badge count={this.state.newReq+this.state.acceptedReq}>
                                            <Avatar
                                                icon="user"
                                                style={{
                                                    backgroundColor: "#ff6600",
                                                    verticalAlign: 'middle'
                                                }}
                                                size="large"/>
                                        </Badge>
                                    }

                                </div>
                            </Dropdown>
                        </MenuItem> : ''}


                    </Menu>

                    <div className="head-mob">
                        <div className="menu-mobile" onClick={drawerVisible ? this.onCloseDrawer : this.showDrawer}>
                            <Icon type="menu"/></div>
                        <Drawer
                            title="Меню"
                            placement="left"
                            closable={true}
                            onClose={this.onCloseDrawer}
                            visible={drawerVisible}
                        >
                            <Menu
                                mode="vertical"
                                onClick={this.onCloseDrawer}
                            >
                                <MenuItem key="main">
                                    <Link to="/">Главная</Link>
                                </MenuItem>

                                <MenuItem key="search">
                                    <Link to="/search"> <Icon type="search"
                                                              style={{fontSize: '16px'}}/>Найти пасажира</Link>
                                </MenuItem>
                                <MenuItem key="offerTrip">
                                    <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Оставить
                                        заявку</Link>
                                </MenuItem>
                                {
                                    !this.props.isAuthenticated ?
                                        <MenuItem key="addUser">
                                            <Link to="/register"><Icon type="user-add"
                                                                       style={{fontSize: '16px'}}/> Регистрация</Link>
                                        </MenuItem>
                                        : ''

                                }

                                {!this.props.isAuthenticated ? (<MenuItem key="login">
                                    <Link to="/login"> <Icon type="login"
                                                             style={{fontSize: '16px'}}/>Войти</Link>
                                </MenuItem>) : ''}
                            </Menu>
                        </Drawer>

                        {this.props.isOnHomePage ? (this.state.visible ? <div className="logo-header"/> : "") :
                            <div className="logo-header"/>}


                        {this.props.isAuthenticated ? <div key="user" className="mob-avatar">
                            <div onClick={this.showDrawer2}>
                                {profile_image != null ?
                                    <Badge count={this.state.newReq+this.state.acceptedReq}>
                                    <Avatar size='large'
                                            src={"http://api.cardosh.uz" + profile_image}/>
                                    </Badge>:
                                    <Badge count={this.state.newReq+this.state.acceptedReq}>
                                    <Avatar icon="user"
                                            style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                            size="large"/></Badge>}
                            </div>
                            <Drawer
                                title={this.props.name}
                                placement="right"
                                closable={true}
                                onClose={this.onCloseDrawer2}
                                visible={drawerVisible2}
                            >
                                {menu}
                            </Drawer>
                        </div> : ''}
                    </div>
                </div>
            </Header>

        );
    }
}

AppHeader.propTypes = {
    isOnHomePage: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
    userId: PropTypes.number,
};


export default withRouter(AppHeader);
