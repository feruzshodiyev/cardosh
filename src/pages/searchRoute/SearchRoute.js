import React, {Component} from 'react';
import { Icon } from 'antd';
import "./SearchRoute.scss";
import { Link,  Route} from 'react-router-dom'


class SearchRoute extends Component {
    render() {
        return (
            <div className="wrapper-search">
               <Route exact paht="/search" component={FromTo}/>
            </div>
        );
    }
}


const FromTo = () => {
    return (
        <div className="wrap-from-to">

            <h1>Найти поездку</h1>
            <div className="relative">
            <Link to='#'>
                <div className="section">
                   <p className="text"><Icon type="environment"/>Откуда</p>
                </div>
            </Link>
            <br/>
            <Link to='#'>
                <div className="section">
                    <p   className="text"><Icon type="environment"/> Куда</p>
                </div>
            </Link>
            </div>
        </div>
    );
};




export default SearchRoute;