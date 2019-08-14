import React, {Component} from 'react'
import './Home.scss'
import {Button, Icon} from "antd";
import {Link} from "react-router-dom";

class Home extends Component{

    constructor(props) {
        super(props);

        this.state={

        }
    }

    handleClick = () => {
    };



    render(){
        return (
            <div className="homePage">


                <div className='homeContent'>

                    <div className='logo'/>


                    <div className='button-group'>
                        {/*<Link to="/search">*/}
                            <Button onClick={this.handleClick} type='default' className='search-ride-btn'>Найти
                                поездку</Button>
                    {/*</Link>*/}
                    {/*    <Link to="/offerTrip">*/}
                            <Button type='default' className='offer-ride-btn'>Предложить
                            поездку</Button>
                        {/*</Link>*/}
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;