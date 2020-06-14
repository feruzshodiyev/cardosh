import React, {Component} from 'react';
import {Button, Icon, Modal} from 'antd';
import "./SearchRoute.scss";
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import ChoosePlace from "./ChoosePlace";
import axios from 'axios';
import {API_BASE_URL} from "../../constants";
import SearchResults from "./SearchResults";
import PropTypes from 'prop-types';
import RideDetails from "./RideDetails";
import UserInfo from "./UserInfo";
import Routes from "../../containers/Routes/Routes";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";


class SearchRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlaceFrom: "",
            selectedPlaceTo: "",
            fromId: "",
            toId: "",
            results: [],
            loading: false
        };
    }

    handleSelectFrom = (description, place_id) => {

        this.setState({

            selectedPlaceFrom: description,
            fromId: place_id
        });
        this.props.history.push("/search")
    };

    handleSelectTo = (description, place_id) => {
        this.setState({
            selectedPlaceTo: description,
            toId: place_id
        });
        this.props.history.push("/search")
    };


    render() {
        const isAuthenticated = this.props.isAuthenticated;
        const currentId = this.props.currentId;
        return (

            <div className="wrapper-search">
                <Switch>
                    <Route exact path="/search" render={() => <FromTo
                        onSelectFrom={this.handleSelectFrom}
                        onSelectTo={this.handleSelectTo}
                        selectedFrom={this.state.selectedPlaceFrom}
                        selectedTo={this.state.selectedPlaceTo}
                        fromId={this.state.fromId}
                        toId={this.state.toId}
                        disabled={this.state.selectedPlaceTo && this.state.selectedPlaceFrom}
                    />}/>
                    {/*<Route path="/search/from" render={()=><ChoosePlace*/}
                    {/*isFromPage={true}*/}
                    {/*onSelectFrom={this.handleSelectFrom}*/}
                    {/*/>}/>*/}
                    {/*<Route path="/search/to" render={()=><ChoosePlace*/}
                    {/*isFromPage={false}*/}
                    {/*onSelectTo={this.handleSelectTo}*/}
                    {/*/>}/>*/}
                    <Route path="/search/results/:selectedPlaceFrom/:selectedPlaceTo/:fromId/:toId"
                           render={(props) => <SearchResults
                               {...props}
                           />}/>
                    <Route path="/search/result/:id" render={(props) => <RideDetails
                        isAuthenticated={isAuthenticated}
                        currentId={currentId}
                        {...props}/>}/>

                    <Route path="/search/user/:id" render={(props) => <UserInfo
                        isAuthenticated={isAuthenticated}
                        {...props}/>}/>
                </Switch>
            </div>

        );
    }
}


const FromTo = (props) => {
    const {selectedFrom, selectedTo, disabled, fromId, toId, onSelectFrom, onSelectTo} = props;
    return (
        <div className="wrap-from-to">

            <h1>Найти пассажира</h1>
            {/*<div className="relative">*/}
            {/*    <div className="wrap-section">*/}
            {/*<Link to='/search/from'>*/}
            {/*    <div className={selectedFrom===''?"section":"section-active"}>*/}
            {/*        {selectedFrom===''?*/}
            {/*            <p className="text"><Icon type="environment"/>Откуда</p> :*/}
            {/*            <p className="text">{selectedFrom}</p>}*/}

            {/*    </div>*/}
            {/*</Link>*/}
            {/*    </div>*/}
            {/*<br/>*/}
            {/*<div className="wrap-section">*/}
            {/*<Link to='/search/to'>*/}
            {/*    <div className={selectedTo===''?"section":"section-active"}>*/}
            {/*        {selectedTo===''?*/}
            {/*            <p className="text"><Icon type="environment"/> Куда</p> :*/}
            {/*            <p className="text">{selectedTo}</p>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*</Link>*/}
            {/*</div>*/}
            {/*</div>*/}


            <div className='from-to'>
                <div>
                    {/*<h2><Icon type="environment"/>Откуда</h2>*/}
                    <GooglePlacesAutocomplete
                        inputClassName={selectedFrom === "" ? "input" : "input input1"}
                        placeholder='Откуда'
                        initialValue={selectedFrom}
                        onSelect={({description, place_id}) => (onSelectFrom(description, place_id))}
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ['uz'],
                            },
                            types: ['(cities)']
                        }}
                    />
                </div>

                <div>
                    {/*<h2><Icon type="environment"/> Куда</h2>*/}
                    <GooglePlacesAutocomplete
                        inputClassName={selectedTo === "" ? "input" : "input input1"}
                        placeholder='Куда'
                        initialValue={selectedTo}
                        onSelect={({description, place_id}) => (onSelectTo(description, place_id))}
                        autocompletionRequest={{
                            componentRestrictions: {
                                country: ['uz'],
                            },
                            types: ['(cities)']
                        }}
                    />
                </div>
            </div>

            <div className="btn-search">
                <Link to={`/search/results/${selectedFrom}/${selectedTo}/${fromId}/${toId}`}>
                    <Button className="btttn" disabled={!disabled} type="primary">Найти</Button>
                </Link>
            </div>

            <Routes isSearchPage={true}/>
        </div>
    );

};


SearchRoute.propTypes = {
    onWait: PropTypes.func,
    onResponse: PropTypes.func
};


export default withRouter(SearchRoute);