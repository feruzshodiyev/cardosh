import React, {Component} from 'react';
import {List, Avatar, Layout, Menu, Breadcrumb, Icon, Button, Modal, Row, Col} from 'antd';
import {Switch, Route, NavLink} from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import {Collapse} from "react-collapse"


import "./MyRides.scss";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";
import DriverRequests from "./DriverRequests";

const {Header, Content, Footer} = Layout;

class MyRides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: [],
            history: [],
            loading: true,
            historyLoading: true,
            showCollapse: {show: false, id: null},
            historyModal: {visible: false, id:null}

        }
    }

    componentDidMount() {

        axios.get(API_BASE_URL + "/own/ride/list/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            console.log(res)
            this.sortData(res.data);
            this.setState({
                loading: false
            })
        }).catch(err => {
            console.log(err);
            this.setState({
                loading: false
            })
        })
    }


    sortData = (data) => {

                this.setState({
                    active: data
                })

    };

    handleListBtnClick = (id) => {
        if (id === this.state.showCollapse.id) {
            this.setState({
                showCollapse: {show: false, id: null}
            })
        } else {
            this.setState({
                showCollapse: {show: true, id: id}
            })
        }

    };

    getAcceptedList = () => {
        axios.get(API_BASE_URL + "/accepted/list/passenger/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            this.setState({
                history: res.data,
                historyLoading: false,
            });
            console.log(res);
        }).catch(err => {
            this.setState({
                historyLoading: false,
            });
            console.log(err);
        })
    };

    showHistroyModal = (id) => {
        this.setState({
            historyModal:{visible: true, id:id}
        })
    };

    closeModalHistory = () => {
        this.setState({
            historyModal:{visible: false,id: null}
        })
    };

    render() {

        const Active = () => {
            const active = this.state.active;

            return (
                <div>
                    <List
                        loading={this.state.loading}
                        itemLayout="horizontal"
                        dataSource={active}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.passenger.profile_image ?
                                        <Avatar src={"http://api.cardosh.uz" + item.passenger.profile_image}
                                                size="large"/> :
                                        <Avatar icon="user"
                                                style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                                size="large"/>}
                                    title={<div>
                                        <p style={{
                                            fontWeight: "bold",
                                            color: "ff6600",
                                            margin: "3px"
                                        }}>{item.passenger.first_name}</p>
                                        <div>
                                            <p>{item.fromm} <Icon style={{margin: "10px", color: "#00ff99"}}
                                                                  type="double-right"/> {item.to}</p>
                                        </div>
                                    </div>}
                                    description={<div>
                                        <div className="list-date">
                                            <h3><Icon type="calendar"/>
                                                <span>{moment(item.active_until).format("llll").split("г.,")[0]}г.</span>
                                                <Icon
                                                    type="clock-circle"/>
                                                <span>{moment(item.active_until).format("HH:mm")}</span>
                                            </h3>
                                        </div>

                                        <p>{item.description}</p>
                                        <Button onClick={() => this.handleListBtnClick(item.id)} className="btn-list"
                                                type="primary" shape="round">Предложения</Button>
                                        <Collapse
                                            isOpened={this.state.showCollapse.show && this.state.showCollapse.id === item.id}>
                                            {this.state.showCollapse.show && this.state.showCollapse.id === item.id ?
                                                <DriverRequests
                                                    key={item.id}
                                                    rideId={item.id}/> : ""}
                                        </Collapse>

                                    </div>}
                                />


                            </List.Item>
                        )}
                    />
                </div>
            )
        };

        const History = () => {
            const history = this.state.history;
            return (
                <div>
                    <h1>История</h1>
                    <List
                        loading={this.state.historyLoading}
                        itemLayout="horizontal"
                        dataSource={history}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.driverID.profile_image ?
                                        <Avatar src={"http://api.cardosh.uz" + item.driverID.profile_image}
                                                size="large"/> :
                                        <Avatar icon="user"
                                                style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                                size="large"/>}
                                    title={<div>
                                        <p style={{
                                            fontWeight: "bold",
                                            color: "ff6600",
                                            margin: "3px"
                                        }}><span>Водитель: </span>{item.driverID.first_name}</p>
                                        <div>
                                            <p>{item.passengerID.fromm} <Icon style={{margin: "10px", color: "#00ff99"}}
                                                                              type="double-right"/> {item.passengerID.to}
                                            </p>
                                        </div>
                                    </div>}
                                    description={<div>
                                        <div className="list-date">
                                            <h3><Icon type="calendar"/>
                                                <span>{moment(item.passengerID.active_until).format("llll").split("г.,")[0]}г.</span>
                                                <Icon
                                                    type="clock-circle"/>
                                                <span>{moment(item.passengerID.active_until).format("HH:mm")}</span>
                                            </h3>
                                        </div>
                                        <p><span
                                            style={{fontWeight: "bolder",}}>Подрбнее о заявке: </span>{item.passengerID.description}
                                        </p>
                                    </div>}
                                />
                                <Button type="primary" onClick={()=>this.showHistroyModal(item.id)}>Посмотреть</Button>
                                <Modal
                                    title="Информация о поездке и водителе"
                                    visible={this.state.historyModal.visible&&this.state.historyModal.id===item.id}
                                    onCancel={this.closeModalHistory}
                                    footer={null}

                                >
                                    <div className="modal-content-req">
                                        <div className="modal-avatar-user">
                                            <div>{item.driverID.profile_image ?
                                                <Avatar className="avatar-req" size="large"
                                                        src={item.driverID.profile_image}/> :
                                                <Avatar className="avatar-req" shape="circle" size="large"
                                                        icon="user"/>}</div>
                                            <div><h2>{item.driverID.first_name + "   " + item.driverID.last_name}</h2>
                                            </div>
                                        </div>

                                        <Row>
                                            <Col span={12}>
                                                <p><span style={{fontWeight: "bolder"}}>Цена: </span>{item.price}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Тел: </span>{item.driverID.phone_number}
                                                </p>
                                            </Col>
                                        </Row>
                                        <h2 style={{textAlign: "center"}}>Автомобиль</h2>
                                        <Row>
                                            <Col span={12}>
                                                <p><span style={{fontWeight: "bolder"}}>Марка: </span>{item.driverID.car.brand}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p><span style={{fontWeight: "bolder"}}>Модел: </span>{item.driverID.car.car_model}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Цвет: </span>{item.driverID.car.color}
                                                </p>

                                            </Col>
                                            <Col span={12}>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Гос. номер: </span>{item.driverID.car.gov_number}
                                                </p>
                                            </Col>
                                        </Row>
                                        <h2 style={{textAlign: "center"}}>Детали заявки</h2>
                                        <div style={{width: "fit-content", margin: "auto"}}>
                                            <h3>{item.passengerID.fromm} <Icon style={{margin: "10px", color: "#00ff99"}}
                                                                              type="double-right"/> {item.passengerID.to}
                                            </h3>
                                        </div>

                                        <Row>
                                            <Col span={12}>
                                                <p>
                                                    <span
                                                    style={{fontWeight: "bolder"}}>Дата: </span>
                                                    <span>{moment(item.passengerID.active_until).format("llll").split("г.,")[0]}г.</span>
                                                </p>
                                            </Col>
                                            <Col span={12}>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Время: </span>
                                                    <span>{moment(item.passengerID.active_until).format("HH:mm")}</span>
                                                </p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Подробнее: </span>{item.passengerID.description}
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </Modal>

                            </List.Item>
                        )}
                    />
                </div>
            )
        };


        const userId = this.props.match.params.id;
        return (
            <div className="my-ride-layout">
                <Layout>
                    <Breadcrumb style={{margin: '10px auto', fontWeight: "bold"}}>
                        <Breadcrumb.Item>Мои заяви</Breadcrumb.Item>
                    </Breadcrumb>
                    <Header style={{backgroundColor: "transparent"}}>
                        <div className="logo-my-ride"/>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1"><NavLink to={`/my-rides/${userId}`}>Активные заявки</NavLink></Menu.Item>
                            <Menu.Item onClick={this.getAcceptedList} key="2"><NavLink
                                to={`/my-rides/${userId}/history`}>История
                                поездки</NavLink></Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="content-main" style={{padding: '0 30px'}}>

                        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                            <Route exact path="/my-rides/:id" render={() => <Active/>}/>
                            <Route path="/my-rides/:id/history" render={() => <History/>}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center', padding: "30"}}>CarDosh</Footer>
                </Layout>
            </div>

        );
    }
}


export default MyRides;