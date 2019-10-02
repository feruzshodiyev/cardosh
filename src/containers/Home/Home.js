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

                            <Button onClick={this.handleClick} type='default' className='search-ride-btn'><Link to="/search">Найти
                                пасажира </Link></Button>


                            <Button type='default' className='offer-ride-btn'><Link to="/offerTrip">Оставить заявку</Link></Button>

                    </div>
                </div>
            </div>
        );
    }
}
export default Home;