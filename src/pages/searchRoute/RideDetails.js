import React, {Component} from 'react';
import axios from 'axios'
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";
import {Alert, Avatar, Button, Icon, Modal, notification} from "antd";
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
            alertVisible: false,
            price: "",
            noCar: false,
            loadingSend: false

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
                user: res.data.passenger
            }, () => {
                this.setState({
                    loading: false
                });
                console.log(this.state.response)
            });


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

    handleClickOffer = () => {
        const currentId = this.props.currentId;
        const price = this.state.price;
        let formData = new FormData();
        formData.append("price", price);
        formData.append("passengerID", this.state.response.id);

        if (this.props.isAuthenticated) {

            if (!price) {
                this.setState({
                    alertVisible: true
                })
            } else {

                this.setState({
                    loadingSend: true
                });

                axios.get(API_BASE_URL + "/" + currentId + "/user/car/").then(res => {
                    console.log(res);
                    if (res.data.car !== null) {
                        console.log(formData.get("passengerID"));

                        axios.post(API_BASE_URL + "/request/make/", formData, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
                            }
                        }).then(res => {
                            this.goBack();
                            notification.success({
                                message: "Сохранен!"
                            });
                            console.log(res);
                            this.setState({
                                loadingSend: false
                            });
                        }).catch(err => {
                            notification.error({
                                message: "Произошло ошибка!"
                            });
                            console.log(err);
                            this.setState({
                                loadingSend: false
                            });
                        })
                    } else {
                        this.setState({
                            noCar: true
                        }, () =>
                            this.setState({
                                modalVisible: true,
                                loadingSend: false
                            }))

                    }
                }).catch(err => {

                });
            }

        } else {
            this.setState({
                modalVisible: true,
            })
        }
    };

    goBack = () => {
        this.props.history.goBack();
    };

    onChangePrice = e => {
        console.log(e.target.value);
        this.setState({
            price: e.target.value,
            alertVisible: false
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

        const date = this.state.response.active_until;


        const time1 = moment(date).format("HH:mm");


        const res = this.state.response;
        const user = this.state.user;

        const currentId = this.props.currentId;


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
                    <p><span>{user.first_name}</span> хочет забронировать <span>{res.peopleNumber}</span> место(а)!</p>
                </div>
                <div className="detail-price">
                    <div>
                        <p>Пожалуйста, введите цену!</p>
                        <NumberFormat
                            className="new-price"
                            thousandSeparator={true}
                            suffix={' Сум'}
                            onChange={this.onChangePrice}

                        />
                        {this.state.alertVisible ? (
                            <Alert
                                type="error"
                                style={{width: "300px", margin: "auto"}}
                                message="Пожалуйста, введите цену!"
                                banner
                            />
                        ) : null}
                    </div>
                </div>
                <div className="detail-info">
                    <h3><Icon type="info-circle"/> Дополнительно: </h3>
                    <p>{res.description}</p>
                </div>
                <hr/>
                <div className="user">
                    <Link to={`/search/user/${user.id}`}>
                        <div><h3>Пассажир: </h3></div>


                        <div>
                            {user.profile_image ?
                                <Avatar src={user.profile_image}
                                        style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                        size="large"/> :
                                <Avatar icon="user" style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                        size="large"/>}

                        </div>

                        <div>
                            <p>{user.first_name} <Icon type="right"/></p>
                        </div>
                    </Link>

                </div>


                <div>
                    {this.state.loadingSend ? <Icon className="loading-icon" type="loading"/> :
                        <Button onClick={this.handleClickOffer} className="btn-offer">Предложите свою поездку</Button>}

                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title={this.state.noCar ? "Автомобиль не добавлен!" : "Авторизуйтесь чтобы предложить свою поездку!"}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Отмена
                        </Button>
                    ]}>

                    {this.state.noCar ? <div className="modal-content">
                        <h2><Link to={`/profile/${currentId}/general`}>Мой профил</Link></h2>
                    </div> : <div className="modal-content">
                        <h2><Link to="/register">Зарегистрироваться</Link></h2>
                        <br/>
                        <h2><Link to="/login">Войти в систему</Link></h2>
                    </div>}

                </Modal>
            </div>
        );
    }
}

export default RideDetails;
