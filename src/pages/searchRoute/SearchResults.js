import React, {Component} from 'react';
import './SearchResults.scss'
import {Avatar, Icon} from "antd";
import axios from "axios";
import {API_BASE_URL} from "../../constants";

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            results: [],
        };
    }

    componentDidMount() {
        const {fromId, toId} = this.props;

        axios.get(API_BASE_URL + '/ride/search/', {
            params: {
                fromID: fromId,
                toID: toId
            }
        }).then(res => {
            console.log(res);
            const results = res.data;
            this.setState({
                results: results,
            }, () => {
                this.setState({
                    loading: false,
                });
            })
        }).catch(err => {
            console.log(err);
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
                return (
                    <div key={i} className="wrap-card">
                        <div className="card-details">
                            <div className="card-route">
                                <p><Icon type="environment" />{result.fromm}</p>
                                <p><Icon type="environment" />{result.to}</p>
                            </div>
                            <div className="price-card">
                                <p>{result.price} Сум</p>
                                <div className="card-date">
                                    <p>Дата:{result.departure_date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-user">
                            <Avatar className="card-avatar" size={60}
                                // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    icon="user"/>
                            <div>
                                <p>Default</p>
                            </div>
                        </div>

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
        return (
            <div className="wrap-results">
                <Cards/>
            </div>
        );
    }
}

export default SearchResults;