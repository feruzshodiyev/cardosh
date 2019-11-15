import React, {Component} from 'react';
import {List, Avatar, Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import {Switch, Route, NavLink} from "react-router-dom";
import axios from 'axios';
import moment from 'moment'
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
            showCollapse: {show: false, id: null}
        }
    }

    componentDidMount() {

        axios.get(API_BASE_URL + "/own/ride/list/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
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
        const now = moment();
        const format = "YYYY-MM-DDTHH:mm:s";


        data.map(item => {
            const dDate = item.departure_date;
            const dTime = item.departure_time;
            const momentObj = moment(dDate + dTime, format);

            console.log(item);
            if (now > momentObj) {
                this.setState({
                    history: this.state.history.concat(item)
                })
            } else {
                this.setState({
                    active: this.state.active.concat(item)
                })
            }

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

    render() {

        const Active = () => {
            const active = this.state.active;
            return (
                <div>
                    <h1>Active</h1>
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
                                        <div className="list-date"><p>{item.departure_date}</p>
                                            <p>{item.departure_time}</p></div>

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
                    <h1>History</h1>
                    <List
                        loading={this.state.loading}
                        itemLayout="horizontal"
                        dataSource={history}
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
                                            <p>{item.departure_date}</p>
                                            <p>{item.departure_time}</p></div>

                                        <p>{item.description}</p>
                                        <Button onClick={() => this.handleListBtnClick(item.id)} className="btn-list"
                                                type="primary" shape="round">Предложения</Button>

                                        <Collapse
                                            theme={{collapse: 'foo', content: 'bar'}}
                                            isOpened={this.state.showCollapse.show && this.state.showCollapse.id === item.id}>
                                            {this.state.showCollapse.show && this.state.showCollapse.id === item.id ?
                                                <DriverRequests
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
                            <Menu.Item key="2"><NavLink to={`/my-rides/${userId}/history`}>История
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