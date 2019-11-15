import React, {Component} from 'react';
import './SearchResults.scss'
import {Avatar, Icon, Result} from "antd";
import axios from "axios";
import {API_BASE_URL} from "../../constants";
import moment from "moment";
import localization from 'moment/locale/ru';
import {Link} from "react-router-dom";

moment.locale('ru', localization);

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            results: [],
            isError: false,
            emptyResult: false
        };
    }

    componentDidMount() {
        const fromId = this.props.match.params.fromId;
        const toId = this.props.match.params.toId;

        console.log("from: " + fromId);
        console.log("to: " + toId);
        axios.get(API_BASE_URL + '/ride/search/', {
            params: {
                fromID: fromId,
                toID: toId
            }
        }).then(res => {

            const results = res.data;

            if (results.length === 0) {
                this.setState({
                    emptyResult: true
                }, () => {
                    this.setState({
                        loading: false
                    });
                    console.log("no result" + results)
                })
            } else {
                console.log(results);
                this.setState({
                    results: results,
                }, () => {
                    this.setState({
                        loading: false,
                    });
                })
            }

        }).catch(err => {
            this.setState({
                loading: false,
            });
        })
    }

    componentWillUnmount() {

    }


    render() {
        const Cards = () => {

            const cards = this.state.results.map((result, i) => {

                const date1 = moment(result.departure_date);
                const givenDate = moment(result.departure_date).format("ll").split(' 20')[0];
                const givenDate1 = moment(result.departure_date).calendar().split(', ')[0];

                const date = (moment().diff(date1, 'days') >= 1) ? givenDate : givenDate1;

                return (

                    <div key={i} className="wrap-card">
                        <Link key={i} to={`/search/result/${result.id}`}>
                            <div className="card-details">
                                <div className="card-route">
                                    <p><Icon type="down-circle"/>{result.fromm}</p>
                                    <p><Icon type="arrow-right"/></p>
                                    <p><Icon type="environment"/>{result.to}</p>
                                </div>

                            </div>
                            <div className="card-user-date">
                                <div className="card-date">
                                    <p>Дата:{date}</p>
                                </div>
                                <div className="user-avatar-name">
                                    {result.passenger.profile_image ?
                                        <Avatar src={result.passenger.profile_image} size='large'/> :
                                        <Avatar className="card-avatar" size='large'
                                                icon="user"/>}

                                    <div>
                                        <p>{result.passenger.first_name}</p>
                                        <p><Icon type="double-right" /></p>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </div>

                );
            });

            return (
                <div>{cards}</div>
            )

        };

        const LoadingContent = () => {
            return (
                <div className="wrap-loading">

                    <div>
                        <Icon className="loading-icon" type="loading"/>
                    </div>
                </div>
            )
        };
        if (this.state.loading) {
            return <LoadingContent/>
        }
        const from = this.props.match.params.selectedPlaceFrom;
        const to = this.props.match.params.selectedPlaceTo;
        return (
            <div className="wrap-results">
                <div className="search-info">
                    <div>
                        <div className="search-from"><p>{from}</p></div>
                        <div className="icons8-map-pinpoint"/>
                        <div><p>{to}</p></div>
                    </div>
                </div>
                {this.state.emptyResult ?
                    <div className="no-result">
                        <Icon type="question-circle"/>
                        <h2>По этому маршруту ничего не найдено!</h2>
                    </div> : <Cards/>}

            </div>
        );
    }
}

export default SearchResults;