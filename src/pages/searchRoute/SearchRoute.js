import React, {Component} from 'react';
import { Icon } from 'antd';
import "./SearchRoute.scss";
import { Link,  Route,  BrowserRouter as Router, Switch, withRouter} from 'react-router-dom'
import ChoosePlace from "./ChoosePlace"



class SearchRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceFrom: '',
            selectedPlaceTo: ''
        };
    }

    handleSelectFrom = (description) => {
        this.setState({
            selectedPlaceFrom: description
        })
        this.props.history.push("/search")
    };

    handleSelectTo = (description) => {
        this.setState({
            selectedPlaceTo: description
        })
        this.props.history.push("/search")
    };





    render() {
        return (

            <div className="wrapper-search">
                <Switch>
               <Route exact path="/search" render={()=><FromTo
               selectedFrom={this.state.selectedPlaceFrom}
               selectedTo={this.state.selectedPlaceTo}
               />}/>
               <Route path="/search/from" render={()=><ChoosePlace
               isFromPage={true}
               onSelectFrom={this.handleSelectFrom}
               />}/>
               <Route path="/search/to" render={()=><ChoosePlace
               isFromPage={false}
               onSelectTo={this.handleSelectTo}
               />}/>
                </Switch>
            </div>

        );
    }
}


const  FromTo = (props) => {
    const {selectedFrom, selectedTo} = props;
    return (
        <div className="wrap-from-to">

            <h1>Найти поездку</h1>
            <div className="relative">
            <Link to='/search/from'>
                <div className="section">
                    {selectedFrom===''?
                        <p className="text"><Icon type="environment"/>Откуда</p> :
                        <p>{selectedFrom}</p>}

                </div>
            </Link>
            <br/>
            <Link to='/search/to'>
                <div className="section">
                    {selectedTo===''?
                        <p className="text"><Icon type="environment"/> Куда</p> :
                        <p>{selectedTo}</p>
                    }
                </div>
            </Link>
            </div>
        </div>
    );

};






export default withRouter(SearchRoute);