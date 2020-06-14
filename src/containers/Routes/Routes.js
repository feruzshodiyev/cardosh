import React, {Component} from 'react'
import './Routes.scss'
import axios from 'axios'
import {API_BASE_URL} from "../../constants";
import {Icon} from "antd";
import {Link} from "react-router-dom";


class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    fromm: "Qarshi",
                    to: "Toshkent",
                    fromID: "ChIJweSoRDmmTj8RnVA3IKxpQ2k",
                    toID: "ChIJw-l5wwyLrjgRmMulSjsyqaU"
                },
                {
                    fromm: "Ташкент",
                    to: "Коканд",
                    fromID: "ChIJw-l5wwyLrjgRmMulSjsyqaU",
                    toID: "ChIJfz4cLuvuujgRCCmExTxybYE"
                },
                {
                    fromm: "Ташкент",
                    to: "Самарканд",
                    fromID: "ChIJw-l5wwyLrjgRmMulSjsyqaU",
                    toID: "ChIJ930HYBkZTT8RVy8_0dk2dkg"
                }
            ]
        }
    }


    componentDidMount() {
        axios.get(API_BASE_URL + "/popular/").then(res => {
            console.log("popular: ", res);

            if (res.data.length > 2) {
                this.setState({
                    data: res.data
                })
            }

        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        const data = this.state.data;
        const item1 = data[0];
        const item2 = data[1];
        const item3 = data[2];
        const isSearchPage = this.props.isSearchPage;

        return (
            <div className='wrapper-routes'>

                <div className='article-routes'>
                    <h2 className={isSearchPage ? 'title-text2' : 'title-text'}>Куда вы хотите поехать?</h2>
                    <div className='popular-routes'>Популярные маршруты</div>
                    <div className='routes'>

                        <Link to={`/search/results/${item1.fromm}/${item1.to}/${item1.fromID}/${item1.toID}`}>
                            <div className={isSearchPage ?'route-link2':'route-link'}>
                                <div className={isSearchPage ? "route-text2":"route-text"}>
                                    {item1.fromm}
                                    <hr/>
                                    {item1.to}
                                </div>
                                <div className={isSearchPage ? "route-price2":"route-price"}>
                                    <Icon style={{fontSize: 'large'}} type="double-right"/>
                                </div>
                            </div>
                        </Link>

                        <Link to={`/search/results/${item2.fromm}/${item2.to}/${item2.fromID}/${item2.toID}`}>
                            <div className={isSearchPage ?'route-link2':'route-link'}>
                                <div className={isSearchPage ? "route-text2":"route-text"}>
                                    {item2.fromm}
                                    <hr/>
                                    {item2.to}
                                </div>
                                <div className={isSearchPage ? "route-price2":"route-price"}>
                                    <Icon style={{fontSize: 'large'}} type="double-right"/>
                                </div>
                            </div>
                        </Link>

                        <Link to={`/search/results/${item3.fromm}/${item3.to}/${item3.fromID}/${item3.toID}`}>
                            <div className={isSearchPage ?'route-link2':'route-link'}>
                                <div className={isSearchPage ? "route-text2":"route-text"}>
                                    {item3.fromm}
                                    <hr/>
                                    {item3.to}
                                </div>
                                <div className={isSearchPage ? "route-price2":"route-price"}>
                                    <Icon style={{fontSize: 'large'}} type="double-right"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Routes
