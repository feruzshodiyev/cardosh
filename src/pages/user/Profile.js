import React, {Component} from 'react';
import {Menu, Icon, Form, Input, Button} from 'antd';
import {Switch, Route, NavLink} from 'react-router-dom';
import './Profile.scss'
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";
import PropTypes from "prop-types"



class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
            user:{},
            loading: false,
            confirmLoading: false,
            emailConfirmText: <div><p>Подтвердите свою электронную почту, чтобы мы
                могли связаться с вами, если понадобится.</p>
                <Button onClick={this.handleEmailConfirm}><Icon type="check" />Подтвердить электронную почту</Button></div>

        }
    }


    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log(userId);
        axios.get(API_BASE_URL+`/user/detail/${userId}/`).then(res=>{
            console.log(res)
            this.setState({
                user: res.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }



    handleSubmitGeneral = () => {

    };

    handleEmailConfirm = () =>{
        this.setState({
            confirmLoading: true
        });
        axios.get(API_BASE_URL+"/verify_email/",{
            headers:{
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res=>{
            this.setState({
                confirmLoading: false,
                emailConfirmText: <p>
                    Mail sent!
                </p>
            });
            console.log(res)
        }).catch(err=>{
            this.setState({
                confirmLoading: false,
                emailConfirmText: <p>
                    Mail didn't send!
                </p>
            });
            console.log(err)
        })
    };

    render() {
        const GeneralForm = (props) => {
            const {getFieldDecorator} = props.form;
            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };

            const user = this.state.user;
            return (
                <Form hideRequiredMark={true} {...formItemLayout} onSubmit={this.handleSubmitGeneral}>

                    <Form.Item label="Пол">
                        {getFieldDecorator('gender', {
                            initialValue:  (user.gender===1 ? "Мужчина":"Женщина"),
                        })(<Input disabled={true}/>)}
                    </Form.Item>
                    <Form.Item label="Имя">
                        {getFieldDecorator('first_name', {
                            initialValue: user.first_name,
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите ваше имя!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Фамилия">
                        {getFieldDecorator('last_name', {
                            initialValue: user.last_name,
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите вашу фамилию!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Эл. почта">
                        {getFieldDecorator('email', {
                            initialValue: user.email,
                            rules: [
                                {
                                    type: 'email',
                                    message: 'Введен неверный E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свой адрес электронной почты!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>
                    <Form.Item label="Моб. телефон:">
                        {getFieldDecorator('phone_number', {
                            initialValue: user.phone_number,
                            rules: [
                                {
                                    required: true,
                                    message: 'Пожалуйста, введите свой адрес электронной почты!',
                                },
                            ],
                        })(<Input/>)}
                    </Form.Item>

                </Form>)
        };

        const GenForm = Form.create()(GeneralForm);

        const General = () => {
            return (
                <div className="general">
                    <h2>Мои персональные данные</h2>
                    <hr/>
                    <GenForm/>
                </div>
            )
        };

        const Picture = () => {
            return (
                <div>
                    <p>Фото профиля</p>
                    <hr/>
                </div>
            )
        };
        const Verifications = () => {
            const {confirmLoading, emailConfirmText} = this.state;
            const email = this.state.user.email;
            return (
                <div>
                    <p>Подтверждение</p>
                    <hr/>
                    <p>Подтвердите ваш профиль, чтобы стать надежным пользователем и легко находить попутчиков!</p>
                    <div>
                        <h2><Icon type="exclamation-circle"/> Подтвердите свой адрес эл. почты</h2>
                        <p>Ваша эл. почта: {email}</p>
                        {confirmLoading ? <Icon type={"loading"}/> : <div>{emailConfirmText}</div>}

                    </div>
                </div>
            )
        };

        const Verified =()=>{
            const email = this.state.user.email;

            return(
                <div>
                    <p>Подтверждение</p>
                    <hr/>
                    <h2><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> Эл. почта подтверждена </h2>
                    <p>Ваша эл. почта: {email} </p>
                    <p>Вы подтвердили свою электронную почту, и теперь мы сможем связаться с вами, если понадобится.</p>
                </div>
            )
        };

        const userId = this.props.match.params.id;
        const email_confirmed = this.state.user.email_confirmed;

        return (
            <div className="profile-page">
                <div>
                    <div className="menu-wrap">
                        <Menu
                            style={{width: 256}}
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="1">
                                <NavLink to={`/profile/${userId}/general`}> Персональные данные</NavLink>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="2">
                                <NavLink to={`/profile/${userId}/picture`}>Фото профиля</NavLink>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="3">
                                <NavLink to={`/profile/${userId}/verifications`}> Надежность пользователя</NavLink>
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="4">
                                Мой автомобиль
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key="5">
                                Пароль
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="profile-info">
                        <Switch>
                            <Route exact path="/profile/:id/general" render={() => <General/>}/>
                            <Route path="/profile/:id/picture" render={() => <Picture/>}/>
                            <Route path="/profile/:id/verifications" render={() => email_confirmed ? <Verified/> : <Verifications/> }/>

                        </Switch>
                    </div>

                </div>
            </div>
        );
    }
}

Profile.propTypes={
    email_confirmed: PropTypes.bool,
};

export default Profile;