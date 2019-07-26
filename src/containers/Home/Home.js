import React, {Component} from 'react'
import './Home.scss'
import {Button} from "antd";
import Plx from 'react-plx';

class Home extends Component{

    constructor(props) {
        super(props);

        this.state={

        }
    }

    handleClick = () => {
    };



    render(){
        const parallaxData = [
            {
                start: 0,
                end: 300,
                properties: [
                    {
                        startValue: 1,
                        endValue: -1,
                        property: 'scale',
                    },
                    {
                        startValue: 1,
                        endValue: 0,
                        property: "opacity",
                        unit: ""
                    }
                ],
            },
        ];
        return(
            <div className="homePage">

                <Plx
                    parallaxData={ parallaxData } animateWhenNotInViewport={true}>

                <div className='homeContent'>
                    <p>
                        <img src='app-logo-image' alt='App Logo'/>
                    </p>
                        <div className='button-group'>          
                            <Button onClick={this.handleClick} type='default' className='search-ride-btn'>Найти поездку</Button>
                            <Button type='default' className='offer-ride-btn'>Предложить поездку</Button>                            
                        </div> 
                </div>
                </Plx>
            </div>
        )
    }
}
export default Home;