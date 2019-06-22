import React, { Component } from 'react'
import {Form, Input, Button} from 'antd'
import "./SignIn.scss"

class SignIn extends Component {
    render() {
        return (
            <div className="signin-wrapper">
                <h1 className="register-title">Адрес эл. почты и пароль?</h1>
                <Form className="login-form">
                    <Input type="text" className="input-data" placeholder="Эл.почта"/>
                    <Input type="password" className="input-data" placeholder="Пароль"/>
                    <div>
                        <Button className="btn-form" type="default">Войти</Button>
                    </div>
                </Form>
            </div>
        )
    }
}
export default SignIn;