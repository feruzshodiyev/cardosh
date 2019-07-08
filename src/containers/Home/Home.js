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