import React, {Component} from 'react'
import './Home.scss'
import {Button} from "antd";

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

                    <div className='logo'/>



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