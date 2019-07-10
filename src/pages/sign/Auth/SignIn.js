import React, { Component } from 'react'
import {Form, Input, Button, notification, Icon} from 'antd'
import {Link} from 'react-router-dom'
import "./SignIn.scss"
import {ACCESS_TOKEN, API_BASE_URL} from "../../../constants";
import {login} from "../../../utils/ApiUtils";

const FormItem = Form.Item;


class SignIn extends Component {




    render() {
        const AntLoginForm = Form.create()(LoginForm);
        return (
            <div className="signin-wrapper">
                <h1 className="register-title">Адрес эл. почты и пароль?</h1>
                <AntLoginForm onLogin={this.props.onLogin}/>
            </div>
        );
    }
}


class LoginForm extends Component{


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values)=>{
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(JSON.stringify(loginRequest))
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.access);
                        this.props.onLogin();
                        console.log(response.access, localStorage.getItem(ACCESS_TOKEN))
                    }).catch(error => {
                    if (error.status ===401) {
                        notification.error({
                            message: 'Cardosh login',
                            description:"Ваш электронный адрес или пароль неверны. Пожалуйста, попробуйте еще раз!"
                        })
                    }else {
                        notification.error({
                            message: 'Cardosh login',
                            description: error.message || 'Сожалею! Что-то пошло не так. Пожалуйста, попробуйте еще раз!'
                        })
                    }
                });
            }
        })
    };



    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your email address!'}]
                    })(
                        <Input type="text" className="input-data" placeholder="Эл.почта"/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input password!'}]
                    })(
                        <Input type="password" className="input-data" placeholder="Пароль"/>
                    )}

                </FormItem>

                <FormItem>
                    <Button htmlType='submit' className="btn-form" type="default">Войти</Button>
                </FormItem>
            </Form>
        );

    }
}





export default SignIn;