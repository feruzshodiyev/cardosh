import React, {Component} from 'react';
import Home from "../containers/Home/Home";
import Routes from "../containers/Routes/Routes";
import Advantages from "../containers/Advantages/Advantages";
import Reasons from "../containers/Reasons/Reasons";
import Plx from 'react-plx';

const parallaxData = [
    {
        start: "self",
        startOffset: "0",
        end: "self",
        endOffset: "30vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 0,
                endValue: -30,
                property: "translateY",
                unit: "vh"
            },
            // {
            //     startValue: 0,
            //     endValue: 25,
            //     property: "translateX",
            //     unit: "vw"
            // }
        ]
    },
    {
        start: "self",
        startOffset: "40vh",
        end: "self",
        endOffset: "70vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: -30,
                endValue: 0,
                property: "translateY",
                unit: "vh"
            },
            // {
            //     startValue: 25,
            //     endValue: 0,
            //     property: "translateX",
            //     unit: "vw"
            // }
        ]
    }
];

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
                <Plx parallaxData={parallaxData} className='plx-advantages'>
                    <Advantages/>
                </Plx>
                <Reasons/>
            </div>
        );
    }
}


export default HomePage;