import React, {Component} from 'react';
import "./SignUp.scss";

import {Button, Icon, Form, Input, notification} from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';

import {HashRouter as Router, Link, Route, Redirect} from 'react-router-dom'
import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from "../../../constants";
import PropTypes from 'prop-types';
import {login} from "../../../utils/ApiUtils";

import FacebookLogin from 'react-facebook-login';

import GoogleLogin from 'react-google-login';
import PhoneNum from "./PhoneNum";


class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmailValid: false,
            isEmailExists: false,
            emailConnectErr: false,
            isFirstNameFilled: false,
            isLastNameFilled: false,
            isDobFilled: false,
            isPasswordValid: false,
            isRegSuccess: false,
            isRegError: false,
            btnLoading: false,
            fields: {
                'first_name': "",
                'last_name': "",
                'email': "",
                "dob": null,
                "gender": 1,
                'password': "",
                'phone_number': ''
            },
            loginFields: {
                'email': "",
                'password': ""
            }
        };


    }

    startBtnLoading = () => {
        this.setState({
            btnLoading: true,
        })
    };

    stopBtnLoading = () => {
        this.setState({
            btnLoading: false,
        })
    };

    handleEmailChange = (e) => {

        this.setState({
            isEmailExists: false
        });

        if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.startBtnLoading();

            const target = e.target;
            const name = target.name;
            const value = target.value;

            axios.get(API_BASE_URL + "/user/email/check/", {
                params: {
                    email: value
                }
            }).then(res => {
                console.log(res.data.message);
                if (res.data.message) {
                    this.setState({
                        isEmailExists: true,
                    }, () => {
                        this.stopBtnLoading();
                    })
                } else {
                    this.setState(prevState => ({
                        isEmailValid: true,
                        fields: {
                            ...prevState.fields,
                            [name]: value
                        },
                        loginFields: {
                            ...prevState.loginFields,
                            [name]: value
                        }
                    }), () => {
                        this.stopBtnLoading();
                    });
                }
            }).catch(err => {
                this.setState({
                    emailConnectErr: true,
                });
                console.log(err)
            });
        } else {
            this.setState({
                isEmailValid: false,
            })
        }

    };
    handleFirstNameChange = (e) => {
        if (e.target.value.length >= 3) {
            const target = e.target;
            const name = target.name;
            const value = target.value;
            this.setState(prevState => ({
                isFirstNameFilled: true,
                fields: {
                    ...prevState.fields,
                    [name]: value
                }
            }));
        } else {
            this.setState({
                isFirstNameFilled: false,
            })
        }
    };

    handleLastNameChange = (e) => {
        if (e.target.value.length >= 3) {
            const target = e.target;
            const name = target.name;
            const value = target.value;
            this.setState(prevState => ({
                isLastNameFilled: true,
                fields: {
                    ...prevState.fields,
                    [name]: value
                }
            }));
        } else {
            this.setState({
                isLastNameFilled: false,
            })
        }
    };

    handlePasswordChange = (e) => {
        if (e.target.value.length >= 6) {
            const target = e.target;
            const name = target.name;
            const value = target.value;
            this.setState(prevState => ({
                isPasswordValid: true,
                fields: {
                    ...prevState.fields,
                    [name]: value
                },
                loginFields: {
                    ...prevState.loginFields,
                    [name]: value
                }
            }));
        } else {
            this.setState({
                isPasswordValid: false,
            })
        }


    };

    onPasswordButtonClick = () => {

        this.props.onRegWait();

        console.log("State values: ", this.state.fields);

        axios.post(API_BASE_URL + '/user/create/', this.state.fields
        ).then(response => {

            this.setState({
                isRegSuccess: true
            });
            this.handleSubmitFromSignUp();
        }).catch(error => {
            this.setState({
                isRegError: true,
            });
            this.props.onRegSuccess();
            console.log("this is error", error);
            window.location.reload();

        });

    };

    handleDateInputChange = (e) => {
        console.log(e.target.value);
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState => ({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                [name]: value
            }
        }));
    };

    handleMaleButtonClick = () => {
        this.setState(prevState => ({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                "gender": 1
            }
        }));
    };
    handleFemaleButtonClick = () => {
        this.setState(prevState => ({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                "gender": 2
            }
        }));
    };
    getPhoneNum=(val)=>{
        console.log("val "+val);
        this.setState(prevState => ({
            fields:{
                ...prevState.fields,
                'phone_number': val
            }
        }))
    };


//auth
    handleSubmitFromSignUp = () => {

        const loginRequest = Object.assign({}, this.state.loginFields);
        login(JSON.stringify(loginRequest))
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.access);
                this.props.onLogin();
                console.log(response.access, localStorage.getItem(ACCESS_TOKEN))
                this.props.onRegSuccess();
                window.location.reload();
            }).catch(error => {
            if (error.status === 401) {
                notification.error({
                    message: 'Cardosh login',
                    description: "Ваш электронный адрес или пароль неверны. Пожалуйста, попробуйте еще раз!"
                })
            } else {
                notification.error({
                    message: 'Cardosh login',
                    description: error.message || 'Сожалею! Что-то пошло не так. Пожалуйста, попробуйте еще раз!'
                })
            }
        });

    };

    // Social authentication
    responseFacebook = (response) => {
        console.log(response);
    };

    responseGoogle = (response) => {
        console.log(response);
    };


    render() {

        if (this.state.isRegSuccess) {
            return <Redirect to='/register/success'/>;
        }

        if (this.state.isRegError) {
            return <Redirect to='/register/error'/>;
        }


        return (

            <Router>
                <div className="wrapper-reg">
                    <Route exact path='/register' render={() => <Reg
                        responseFacebook={this.responseFacebook}
                        responseGoogle={this.responseGoogle}
                    />}/>
                    <Route path='/register/mail' render={() => <MailForm
                        handleOnChange={this.handleEmailChange}
                        emailIsValid={this.state.isEmailValid}
                        loading={this.state.btnLoading}
                        emailExists={this.state.isEmailExists}
                        connectionError={this.state.emailConnectErr}
                    />}
                    />
                    <Route path='/register/phone' render={()=><PhoneNum
                        getNum={this.getPhoneNum}
                    />}
                    />
                    <Route path='/register/name' render={() => <NameForm
                        handleOnFirstNameChange={this.handleFirstNameChange}
                        handleOnLastNameChange={this.handleLastNameChange}
                        isFirstNameFilled={this.state.isFirstNameFilled}
                        isLastNameFilled={this.state.isLastNameFilled}
                    />}
                    />
                    <Route path='/register/password' render={() => <PasswordForm
                        handleOnChangePassword={this.handlePasswordChange}
                        isPasswordValid={this.state.isPasswordValid}
                        onButtonClick={this.onPasswordButtonClick}

                    />}/>
                    <Route path='/register/gender' render={() => <GenderForm
                        onMaleClick={this.handleMaleButtonClick}
                        onFemaleClick={this.handleFemaleButtonClick}
                    />}/>
                    <Route path='/register/dob' render={() => <BirthForm
                        handleOnChange={this.handleDateInputChange}
                        isDobFilled={this.state.isDobFilled}
                    />}/>

                    <Route path='/register/success' component={() => <SuccessRegister/>}/>

                    <Route path='/register/error' component={() => <ErrorRegister/>}/>
                </div>
            </Router>
        );
    }
}

const MailForm = (props) => {
    const {handleOnChange, emailIsValid, loading, emailExists, connectionError} = props;

    return (

        <div>

            <h1 className="register-title">Введите ваше эл. почту</h1>
            <Form className='login-form'>

                <Input
                    onChange={(e) => handleOnChange(e)}
                    name="email"
                    className='input-data'
                    placeholder=" Эл. почта"/>

                {loading ? <Icon className="icon-loading" type="loading"/> : ""}
                {emailExists ? <p style={{color: "red", fontWeight: "bold", fontSize: "large"}}>Этот e-mail уже
                    зарегистрирован!</p> : ""}
                {connectionError ? <p style={{color: "red", fontWeight: "bold", fontSize: "large"}}>Произошло ошибка!</p>:""}
                {emailIsValid ? <Button className='btn-form'>
                    <Link to='/register/phone'>Далее</Link>
                </Button> : ""}



            </Form>
        </div>
    );
};


const Reg = (props) => {
    const {responseFacebook, responseGoogle} = props;
    return (
        <div>
            <h1 className='register-title'>Страница для регистрации</h1>
            <div className="login-form">
                <ButtonGroup className="reg-btns-form">
                    <br/>
                    <br/>
                    {/*<FacebookLogin*/}
                    {/*    textButton="Регистрация через Facebook"*/}
                    {/*    appId="916694295343872" //APP ID*/}
                    {/*    fields="first_name, last_name, email, picture, birthday, gender"*/}
                    {/*    callback={responseFacebook}*/}
                    {/*    scope="public_profile, email, user_birthday, user_gender"*/}
                    {/*/>*/}
                    {/*<br/>*/}
                    {/*<br/>*/}
                    {/*<GoogleLogin*/}
                    {/*    clientId="823750689194-2n636shuiamk842p9ahehglrlkd3es22.apps.googleusercontent.com" //CLIENTID*/}
                    {/*    buttonText="Регистрация через Google"*/}
                    {/*    onSuccess={responseGoogle}*/}
                    {/*    onFailure={responseGoogle}*/}
                    {/*/>*/}
                    <br/>
                    <br/>
                    <Button type="link"><Link to='/register/mail'>Регистрация через эл. почту</Link></Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

const NameForm = (props) => {
    const {handleOnFirstNameChange, handleOnLastNameChange, isFirstNameFilled, isLastNameFilled} = props;
    return (
        <div>
            <h1 className='register-title'>Как вас зовут?</h1>
            <Form className="login-form">
                <Input
                    placeholder="Имя"
                    className='input-data'
                    name="first_name"
                    onChange={event => handleOnFirstNameChange(event)}
                />
                <Input
                    placeholder="Фамилия"
                    className='input-data'
                    name="last_name"
                    onChange={event => handleOnLastNameChange(event)}
                />
                {isFirstNameFilled && isLastNameFilled ?
                    <Button className='btn-form'><Link to='/register/dob'>Далее</Link></Button> : ""}

            </Form>
        </div>
    );


};

const GenderForm = (props) => {
    const {onMaleClick, onFemaleClick} = props;
    return (
        <div>
            <h1 className='register-title'>Вы </h1>
            <Form className='login-form'>
                <ButtonGroup className='gender-group'>
                    <Button className='btn-gender' onClick={onMaleClick} name="male"><Link
                        to='/register/password'>Мужчина</Link></Button>
                    <Button className='btn-gender' onClick={onFemaleClick} name="female"><Link
                        to='/register/password'>Женшина</Link></Button>
                </ButtonGroup>
            </Form>
        </div>
    );
};
const PasswordForm = (props) => {

    const {handleOnChangePassword, isPasswordValid, onButtonClick} = props;

    return (

        <div>
            <h1 className='register-title'>Еще понадобиться пароль</h1>
            <Form className='login-form'>
                <Input className='input-data' type='password' placeholder='Пароль' name='password'
                       onChange={event => handleOnChangePassword(event)}/>
                {isPasswordValid ?
                    <Button onClick={onButtonClick} className='btn-form' type='default'><Link
                        to='/register'>Далее</Link></Button> :
                    <p>Минимум 6 знаков!</p>}

            </Form>
        </div>
    );
};
const BirthForm = (props) => {
    const {handleOnChange, isDobFilled} = props;
    return (
        <div>
            <h1 className='register-title'>Дата рождения</h1>
            <Form className='login-form'>
                <Input type='date' className='input-data' placeholder='Дата рождение' name='dob'
                       onChange={event => handleOnChange(event)}/>
                {
                    isDobFilled ? <Button className='btn-form'><Link to='/register/gender'>Далее</Link></Button> : ""
                }

            </Form>
        </div>
    );

};

const SuccessRegister = () => {
    return (
        <div className="reg-success">
            <h1>Спасибо за регистрацию!</h1>
            <p>Теперь вам необходимо подтвердить вашу электронную почту!</p>

        </div>
    )
};

const ErrorRegister = () => {
    return (
        <div>
            <h1>Что то произошло ошибка!</h1>
            <p>Не подклчен с интернета или что то друго</p>
        </div>
    )
};

SignUp.propTypes = {
    onRegWait: PropTypes.func,
    onRegSuccess: PropTypes.func
};


export default SignUp;