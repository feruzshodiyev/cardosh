import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';

import {Link, withRouter} from 'react-router-dom';


import './AppHeader.scss';

const Header = Layout.Header;
const MenuItem = Menu.Item;
class AppHeader extends Component {



    render() {



        return (

            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">CARDOSH</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        style={{ lineHeight: '63px' }}
                    >
                        <MenuItem key="search">
                            <Link to="/search"> <Icon type="search" style={{ fontSize: '16px', color: '#08c' }}/>Найти</Link>
                        </MenuItem>
                        <MenuItem key="offerTrip">
                            <Link to="/offerTrip"><Icon type="plus-circle" style={{ fontSize: '16px', color: '#08c' }}/>Предложить поездку</Link>
                        </MenuItem>
                        <MenuItem key="addUser">
                            <Link  to="/register"><Icon type="user-add" style={{ fontSize: '16px', color: '#08c' }}/> Регистрация</Link>
                        </MenuItem>
                        <MenuItem key="login">
                            <Link to="/login"> <Icon type="login" style={{ fontSize: '16px', color: '#08c' }} />Войти</Link>
                        </MenuItem>

                    </Menu>
                </div>
            </Header>

        );
    }
}





export default withRouter(AppHeader);