import React, {Component} from 'react'
import './Home.scss'
import {Button} from "antd";
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";

class Home extends Component{

    constructor(props) {
        super(props);

        this.state={

        }
    }

    handleClick = () => {
    };


    render(){
        return(
            <div className="homePage">

                <div className='homeContent'>
                    <p>
                        <img src='app-logo-image' alt='App Logo'/>
                    </p>
                        <div className='button-group'>          
                            <Button onClick={this.handleClick} type='default' className='search-ride-btn'>Найти поездку</Button>
                            <Button type='default' className='offer-ride-btn'>Предложить поездку</Button>                            
                        </div> 
                </div>   
            </div>
        )
    }
}
export default Home;