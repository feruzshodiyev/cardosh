import React, {Component} from 'react';
import axios from 'axios'
import {API_BASE_URL} from "../../constants";
import {Avatar, Button, Icon, Input, Modal, Checkbox, InputNumber} from "antd";
import moment from "moment";
import localization from 'moment/locale/ru';
import './RideDetails.scss';
import {Link} from "react-router-dom";
import NumberFormat from 'react-number-format';

moment.locale('ru', localization);

class RideDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
            user: {},
            loading: false,
            modalVisible: false,
            modalLoading: false,
            setPrice: false,

        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        const id = this.props.match.params.id;

        axios.get(API_BASE_URL + `/${id}/ride-detail/`).then(res => {
            this.setState({
                response: res.data,
                user: res.data.customUser
            }, () => {
                this.setState({
                    loading: false
                })
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
        })
    }

    handleOk = () => {

    };

    handleCancel = () => {
        this.setState({
            modalVisible: false,
        })
    };

    handleChange = (e) => {
        this.setState({
            setPrice: e.target.checked,
        })
    };


    render() {

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

        const date = this.state.response.departure_date;
        const time = this.state.response.departure_time;

        const time1 = moment(time, "HH:mm").format("HH:mm");


        const res = this.state.response;
        const user = this.state.user;
        const setPrice = this.state.setPrice;


        return (
            <div className="wrap-ride">
                <h1>Заявка пасажира</h1>
                <div className="addresses">
                    <div>
                        <h1>{res.fromm}</h1>
                    </div>
                    <div><Icon type="arrow-right"/></div>
                    <div>
                        <h1>{res.to}</h1>
                    </div>
                </div>
                <div className="detail-date">
                    <h2>Отправление: <Icon type="calendar"/>
                        <span>{moment(date).format("llll").split("г.,")[0]}г.</span> <Icon
                            type="clock-circle"/> <span>{time1}</span></h2>
                </div>
                <div className="detail-seats">
                    <p><span>{user.first_name}</span> хочет забронировать <span>{res.seats}</span> место(а)!</p>
                </div>
                <div className="detail-price">
                    <p><span>{user.first_name}
                    </span> хочет заплатить <span>
                        <NumberFormat value={res.price}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={' сум '}/></span>
                        за место!</p>
                    <div>
                        <p>Если пассажир предлогает низкую цену, вы можете предложить свою цену!</p>
                        <Checkbox onChange={this.handleChange} className="price-checkbox">Предложить другую
                            цену</Checkbox>
                        <NumberFormat
                            className={setPrice ? "new-price" : "disabled-input"}
                            thousandSeparator={true}
                            suffix={' Сум'}

                        />
                    </div>
                </div>
                <div className="detail-info">
                    <h3><Icon type="info-circle"/> Дополнительно: </h3>
                    <p>{res.description}</p>
                </div>
                <hr/>
                <div className="user">
                    <Link to={`/search/user/${user.id}`}>
                    <div><h3>Ползовтель: </h3></div>


                    <div>
                        <Avatar icon="user" style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}} size="large"/>
                    </div>

                    <div>
                        <p>{user.first_name} <Icon type="right" /></p>
                    </div>
                    </Link>

                </div>


                <div>
                    <Button onc className="btn-offer">Предложите свою поездку</Button>
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title="Авторизуйтесь чтобы предложить свою поездку!"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Отмена
                        </Button>
                    ]}>

                    <div className="modal-content">
                        <h2><Link to="/register">Зарегистрироваться</Link></h2>
                        <br/>
                        <h2><Link to="/login">Войти в систему</Link></h2>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default RideDetails;