import React, {Component} from 'react';
import {Avatar, Badge, Breadcrumb, Button, Col, Icon, Layout, List, Menu, Modal, notification, Row} from "antd";
import {Switch, Route, NavLink} from 'react-router-dom';
import axios from "axios";
import moment from 'moment';


import "./Requests.scss";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";


const {Header, Content, Footer} = Layout;

class Requests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            acceptedModal:{visible: false, id: null}
        }
    }


    showAcceptedModal=(id, viewed)=>{
        this.setState({
            acceptedModal:{visible: true, id: id}
        });

        if (!viewed){
            axios.put(`http://api.cardosh.uz/v1/notifications/clean/${id}/accepted/request/`, {}, {
                headers: {
                    "Authorization" : "Bearer "+localStorage.getItem(ACCESS_TOKEN)
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
        }

    };
    closeAcceptedModal=()=>{
        this.setState({
            acceptedModal:{visible: false, id: null}
        })
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
        axios.get(API_BASE_URL + "/accepted/list/driver/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            console.log(res);
            this.setState({
                data: res.data,
                loading: false
            })
        }).catch(err => {
            notification.error({
                message: "Ошибка подключения!"
            });
            this.setState({
                loading: false
            });
        })
    }

    render() {

        const Accepted = () => {
            return (
                <div>
                    <h1>Принятые</h1>
                    <List
                        loading={this.state.loading}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={item.passengerID.passenger.profile_image ?
                                        <Avatar src={"http://api.cardosh.uz" + item.passengerID.passenger.profile_image}
                                                size="large"/> :
                                        <Avatar icon="user"
                                                style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}}
                                                size="large"/>}
                                    title={<div>
                                        <p style={{
                                            fontWeight: "bold",
                                            color: "ff6600",
                                            margin: "3px"
                                        }}><span>Пассажир: </span>{item.passengerID.passenger.first_name}</p>
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

                                        <p>
                                            <span
                                            style={{fontWeight: "bolder",}}>Подрбнее о заявке: </span>
                                            {item.passengerID.description}
                                        </p>

                                    </div>}
                                />

                               <Badge dot={!item.dealed_viewed}>
                                <Button type="primary" onClick={()=>this.showAcceptedModal(item.id, item.dealed_viewed)}>Посмотреть</Button>
                               </Badge>
                                <Modal
                                    title="Информация о поездке и пассажирах"
                                    visible={this.state.acceptedModal.visible&&this.state.acceptedModal.id===item.id}
                                    onCancel={this.closeAcceptedModal}
                                    footer={null}

                                >
                                    <div className="modal-content-req">
                                        <div className="modal-avatar-user">
                                            <div>{item.passengerID.passenger.profile_image ?
                                                <Avatar className="avatar-req" size="large"
                                                        src={"http://api.cardosh.uz" +item.passengerID.passenger.profile_image}/> :
                                                <Avatar className="avatar-req" shape="circle" size="large"
                                                        icon="user"/>}</div>
                                            <div><h2>{item.passengerID.passenger.first_name + "   " + item.passengerID.passenger.last_name}</h2>
                                            </div>
                                        </div>

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
                                            <Col span={12}>
                                                <p><span style={{fontWeight: "bolder"}}>Количество пассажиров: </span>{item.passengerID.peopleNumber}</p>
                                            </Col>
                                            <Col span={12}>
                                                <p><span
                                                    style={{fontWeight: "bolder"}}>Тел: </span>{item.passengerID.passenger.phone_number}
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

                                        <Row>
                                            <Col span={12}>
                                                <p><span style={{fontWeight: "bolder"}}>Цена: </span>{item.price}</p>
                                            </Col>
                                            <Col span={12}>

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


        // const Requested = () => {
        //     return (
        //         <div>
        //             <h1>Requested</h1>
        //         </div>
        //     )
        // };
        //
        //
        // const Denied = () => {
        //     return (
        //         <div>
        //             <h1>Denied</h1>
        //         </div>
        //     )
        // };


        const userId = this.props.match.params.id;
        return (
            <div className="my-ride-layout">
                <Layout>
                    <Breadcrumb style={{margin: '10px auto', fontWeight: "bold"}}>
                        <Breadcrumb.Item>Предложенные поездки</Breadcrumb.Item>
                    </Breadcrumb>
                    <Header style={{backgroundColor: "transparent"}}>
                        <div className="logo-my-ride"/>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1"><NavLink to={`/requests/${userId}`}>Принятые
                                предложения</NavLink></Menu.Item>
                            {/*<Menu.Item key="2"><NavLink*/}
                            {/*    to={`/requests/${userId}/requested`}>Предложенные</NavLink></Menu.Item>*/}
                            {/*<Menu.Item key="3"><NavLink to={`/requests/${userId}/denied`}>Отказано</NavLink></Menu.Item>*/}
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 30px'}}>

                        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                            <Switch>
                                <Route exact path="/requests/:id" render={() => <Accepted/>}/>
                                {/*<Route path="/requests/:id/requested" render={() => <Requested/>}/>*/}
                                {/*<Route path="/requests/:id/denied" render={()=><Denied/>}/>*/}
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center', padding: "30"}}>CarDosh</Footer>
                </Layout>
            </div>
        );
    }
}


export default Requests;