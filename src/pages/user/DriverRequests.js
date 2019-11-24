import React, {Component} from "react";
import axios from "axios/index";
import {API_BASE_URL} from "../../constants";
import {Avatar, Button, Col, List, Modal, notification, Row} from "antd";


class DriverRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            loading: true,
            showModal:{visible: false, id: null},
            confirmLoading: false,
            car: null,
            driver: null,
            req: null
        }
    }


    componentDidMount() {
        this.getReqList();
    }

    getReqList = () => {
        this.setState({
            loading: true,
        });
        const rideId = this.props.rideId;
        axios.get(`${API_BASE_URL}/${rideId}/request/list/`).then(res => {
            this.setState({
                requests: res.data,
                loading: false
            });
            console.log(res)
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        })
    };

    dealRide = (id) => {
        this.setState({
            confirmLoading: true,
        });
        axios.put(`${API_BASE_URL}/${id}/request/deal/`).then(res => {
            notification.success({
                message: "Вы приняли предложение!"
            });
            this.setState({
                showModal:{visible: false, id: null},
                confirmLoading: false,
            });
            this.getReqList();
        }).catch(err => {
            notification.error({
                message: "Произошло ошибка! "
            });
            this.setState({
                showModal:{visible: false, id: null},
                confirmLoading: false,
            });
            console.log(err)
        })
    };

    denyRide = (id) => {
        axios.put(`${API_BASE_URL}/${id}/request/deny/`).then(res => {
            notification.success({
                message: "Вы отказали предложение!"
            });
            console.log(res)
            this.getReqList()
        }).catch(err => {
            notification.error({
                message: "Произошло ошибка! "
            });
            console.log(err)
        })
    };

    showModal = (id) => {
        this.setState({
            showModal:{visible: true, id: id}
        });
    };


    handleClickCancel = (id) => {
        this.setState({
            showModal:{visible: false, id: null}
        });
    };

    render() {

        const MyModal = (props) => {

            const {showModal, confirmLoading} = this.state;
            const {item} = props;
            const {driverID} = item;
            const {car} = driverID;

            return (
                <Modal
                    title=""
                    visible={showModal.visible&&showModal.id===item.id}
                    onOk={()=>this.dealRide(item.id)}
                    onCancel={()=>this.handleClickCancel(item.id)}
                    footer={item.is_dealed ? null:[
                        <Button key="back" onClick={()=>this.handleClickCancel(item.id)}>
                            Закрить
                        </Button>,
                        <Button key="submit" type="primary" loading={confirmLoading} onClick={()=>this.dealRide(item.id)}>
                            Принять
                        </Button>,
                    ]}
                >
                    <div className="modal-content-req">
                        <div className="modal-avatar-user">
                            <div >{driverID.profile_image ?
                                <Avatar className="avatar-req" size="large" src={driverID.profile_image}/> :
                                <Avatar className="avatar-req" shape="circle" size="large" icon="user"/>}</div>
                            <div ><h2>{driverID.first_name + "   " + driverID.last_name}</h2></div>
                        </div>

                        <Row>
                            <Col span={12}>
                                <p><span style={{fontWeight: "bolder"}}>Цена: </span>{item.price}</p>
                            </Col>
                            <Col span={12}>
                                <p><span style={{fontWeight: "bolder"}}>Тел: </span>{driverID.phone_number}</p>
                            </Col>
                        </Row>
                        <h2 style={{textAlign: "center"}}>Автомобиль</h2>
                        <Row>
                            <Col span={12}>
                                <p>{"Модел: " + car.car_model}</p>
                            </Col>
                            <Col span={12}>
                                <p>{"Марка: " + car.brand}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <p>{"Цвет: " + car.color}</p>
                            </Col>
                            <Col span={12}>
                                <p>{"Гос. номер: " + car.gov_number}</p>
                            </Col>
                        </Row>
                    </div>
                </Modal>
            )
        };

        return (
            <div>
                <h2>Предложения к данной заявке </h2>
                <List
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.requests}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={item.driverID.profile_image ?
                                    <Avatar src={item.driverID.profile_image}/> :
                                    <Avatar icon="user"/>}
                                title={item.driverID.first_name + " " + item.driverID.last_name}
                                description={<div>
                                    <p>Предлагаемая сумма: {item.price}</p>
                                    {item.is_dealed ?<Button onClick={()=>this.showModal(item.id)}>Посмотреть</Button>:null}
                                </div>}
                            />
                            {item.is_dealed === null ? <Button onClick={()=>this.showModal(item.id)} type="danger"
                                                               shape="round">Показать</Button>:item.is_dealed ? <div>
                                <h3 style={{color: "#33cc33"}}>Принято!</h3>

                            </div>: <div><p>Отказано!</p></div>}

                            <MyModal
                                key={item.id}
                                item={item}
                            />

                        </List.Item>
                    )}
                />

            </div>
        );
    }

}


export default DriverRequests;