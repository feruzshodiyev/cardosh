import React, {Component} from 'react';
import {Breadcrumb, Layout, Menu} from "antd";
import {Switch, Route, NavLink} from 'react-router-dom';

import "./Requests.scss";

const { Header, Content, Footer } = Layout;
class Requests extends Component {




    render() {

        const Accepted =()=>{
            return(
                <div>
                    <h1>Accepted</h1>
                </div>
            )
        };


        const Requested =()=>{
            return(
                <div>
                    <h1>Requested</h1>
                </div>
            )
        };


        const Denied=()=>{
            return(
                <div>
                    <h1>Denied</h1>
                </div>
            )
        };



        const userId = this.props.match.params.id;
        return (
            <div className="my-ride-layout">
                <Layout>
                    <Breadcrumb style={{ margin: '10px auto', fontWeight: "bold" }}>
                        <Breadcrumb.Item>Предложенные поездки</Breadcrumb.Item>
                    </Breadcrumb>
                    <Header style={{backgroundColor: "transparent"}}>
                        <div className="logo-my-ride" />
                        <Menu
                            theme="light"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1"><NavLink to={`/requests/${userId}`}>Принятые предложения</NavLink></Menu.Item>
                            <Menu.Item key="2"><NavLink to={`/requests/${userId}/requested`}>Предложенные</NavLink></Menu.Item>
                            <Menu.Item key="3"><NavLink to={`/requests/${userId}/denied`}>Отказано</NavLink></Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 30px' }}>

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/requests/:id" render={()=><Accepted/>}/>
                                <Route path="/requests/:id/requested" render={()=><Requested/>}/>
                                <Route path="/requests/:id/denied" render={()=><Denied/>}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', padding: "30" }}>CarDosh</Footer>
                </Layout>
            </div>
        );
    }
}







export default Requests;