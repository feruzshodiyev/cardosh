import React, {Component} from 'react'
import './Home.scss'
import {Button, Menu, Icon} from "antd"
import {Link} from "react-router-dom";

const MenuItem = Menu.Item;
class Home extends Component{

    constructor(props) {
        super(props);

        this.state={
            current: 'main',

        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };


    render(){
        return(
            <div className="homePage">
                {/*<Menu*/}
                {/*    onClick={this.handleClick}*/}
                {/*    selectedKeys={[this.state.current]}*/}
                {/*    className=" "*/}
                {/*    mode="horizontal"*/}
                {/*    style={{lineHeight: '63px'}}*/}
                {/*>*/}
                {/*    <MenuItem key="main">*/}
                {/*        <Link to="/">CARDOSH</Link>*/}
                {/*    </MenuItem>*/}

                {/*    <MenuItem key="search">*/}
                {/*        <Link to="/search"> <Icon type="search"*/}
                {/*                                  style={{fontSize: '16px'}}/>Найти</Link>*/}
                {/*    </MenuItem>*/}
                {/*    <MenuItem key="offerTrip">*/}
                {/*        <Link to="/offerTrip"><Icon type="plus-circle" style={{fontSize: '16px'}}/>Предложить*/}
                {/*            поездку</Link>*/}
                {/*    </MenuItem>*/}
                {/*    <MenuItem key="addUser">*/}
                {/*        <Link to="/register"><Icon type="user-add"*/}
                {/*                                   style={{fontSize: '16px'}}/> Регистрация</Link>*/}
                {/*    </MenuItem>*/}
                {/*    <MenuItem key="login">*/}
                {/*        <Link to="/login"> <Icon type="login"*/}
                {/*                                 style={{fontSize: '16px'}}/>Войти</Link>*/}
                {/*    </MenuItem>*/}

                {/*</Menu>*/}
                <div className='homeContent'>
                    <p>
                        <img src='app-logo-image' alt='App Logo'/>
                    </p>
                        <div className='button-group'>          
                            <Button type='default' className='search-ride-btn'>Найти поездку</Button>
                            <Button type='default' className='offer-ride-btn'>Предложить поездку</Button>                            
                        </div> 
                </div>   
            </div>
        )
    }
}
export default Home;