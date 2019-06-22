import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';

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

    }








    render() {


        return (


            <Header className={this.props.isOnHomePage ? (this.state.visible ? ("app-header") : ("withoutHeader")):("app-header")}>
                <div className="container">

                    <Menu
                        onClick={this.handleClick}
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
                        <MenuItem key="addUser">
                            <Link to="/register"><Icon type="user-add"
                                                       style={{fontSize: '16px'}}/> Регистрация</Link>
                        </MenuItem>
                        <MenuItem key="login">
                            <Link to="/login"> <Icon type="login"
                                                     style={{fontSize: '16px'}}/>Войти</Link>
                        </MenuItem>

                    </Menu>
                </div>
            </Header>

        );
    }
}

AppHeader.propTypes={
isOnHomePage: PropTypes.bool,
};



export default withRouter(AppHeader);