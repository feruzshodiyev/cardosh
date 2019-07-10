import React, {Component} from 'react';
import {Layout, Menu, Icon, Avatar, Dropdown} from 'antd';

import {Link, withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';


import './AppHeader.scss';

const Header = Layout.Header;
const MenuItem = Menu.Item;
class AppHeader extends Component {

    constructor(props) {
        super(props);

        this.state={
            prevScrollpos: window.pageYOffset,
            visible: false,
            rotate: false

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



    rotateChange=()=>{
        this.setState({
            rotate: !   this.state.rotate
        })
    }





    render() {

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );

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
                                                      style={{fontSize: '16px'}}/>Найти</Link>
                        </MenuItem>
                        <MenuItem key="offerTrip">
                            <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Предложить
                                поездку</Link>
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
                            <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.rotateChange}>
                                <div>
                                    <p>{this.props.name}</p>
                                    <Avatar size={55}
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                                            <Icon rotate={this.state.rotate ? (180) : (0)} style={{ fontSize: '16px'}} type='down'/>
                                </div>
                            </Dropdown>
                        </MenuItem> : ''}


                    </Menu>
                </div>
            </Header>

        );
    }
}

AppHeader.propTypes={
isOnHomePage: PropTypes.bool,
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
};



export default withRouter(AppHeader);