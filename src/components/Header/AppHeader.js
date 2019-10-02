import React, {Component} from 'react';
import {Layout, Menu, Icon, Avatar, Dropdown, Drawer} from 'antd';

import {Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';


import './AppHeader.scss';
import {ACCESS_TOKEN} from "../../constants";

const Header = Layout.Header;
const MenuItem = Menu.Item;
class AppHeader extends Component {

    constructor(props) {
        super(props);

        this.state={
            prevScrollpos: window.pageYOffset,
            visible: false,
            drawerVisible: false,
            drawerVisible2: false

        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll )

    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll=()=>{
        const {prevScrollpos} = this.state;

        const currentScrollPos = window.pageYOffset;

        const visible = prevScrollpos !== currentScrollPos;

        this.setState({
            visible: visible
        });

    };







    handleLogout=()=>{
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
                    <Link to={`/profile/${userId}/general`}>Profile</Link>
                </Menu.Item>
                <Menu.Item key="0">
                    <Link to="#">История поездки</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" onClick={this.handleLogout}><Icon type="logout" />Выйти</Menu.Item>
            </Menu>
        );

        const drawerVisible = this.state.drawerVisible;
        const drawerVisible2 = this.state.drawerVisible2;

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
                            <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Оставить заявку</Link>
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
                            <Dropdown overlay={menu} trigger={['click']}>
                                <div>
                                    <p>{this.props.name}</p>
                                    <Avatar icon="user" style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}} size="large"/>

                                </div>
                            </Dropdown>
                        </MenuItem> : ''}


                    </Menu>

                    <div className="head-mob">
                    <div className="menu-mobile" onClick={drawerVisible ? this.onCloseDrawer:this.showDrawer}><Icon  type="menu" /></div>
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
                                <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Оставить заявку</Link>
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

                        {this.props.isOnHomePage? (this.state.visible ? <div className="logo-header"/>: "") :<div className="logo-header"/> }


                        {this.props.isAuthenticated ? <div key="user" className="mob-avatar">
                            <div onClick={this.showDrawer2}>
                                <Avatar icon="user" style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}} size="large"/>
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

AppHeader.propTypes={
isOnHomePage: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
    userId: PropTypes.number,
};



export default withRouter(AppHeader);