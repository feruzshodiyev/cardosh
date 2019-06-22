import React, {Component} from 'react';
import Home from "../containers/Home/Home";
import Routes from "../containers/Routes/Routes";
import Advantages from "../containers/Advantages/Advantages";
import Reasons from "../containers/Reasons/Reasons";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }



    render() {
        return (
            <div className="wrapper">

                <Home />
                <Routes />
                <Advantages/>
                <Reasons/>
            </div>
        );
    }
}


export default HomePage;