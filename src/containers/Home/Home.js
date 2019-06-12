import React, {Component} from 'react'
import './Home.scss'
import {Button} from "antd"

class Home extends Component{
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