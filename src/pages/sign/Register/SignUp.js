import React, {Component} from 'react';
import "./SignUp.scss";

import {Button, Icon, Form, Input} from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';

import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import axios from "axios";

class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
            isEmailValid: false,
            isFirstNameFilled: false,
            isLastNameFilled: false,
            isDobFilled: false,
            isPasswordValid: false,
            fields: {
                'first_name': "",
                'last_name': "",
                'email': "",
                "dob": null,
                "gender": 1,
                'password': ""}
        };


    }

    handleEmailChange=(e)=>{
        // this.setState({email:e.target.email});

if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState(prevState=>({
        isEmailValid: true,
        fields: {
            ...prevState.fields,
            [name] : value
        }
    }));

}else {
    this.setState({
        isEmailValid: false,
    })
}

    };
 handleFirstNameChange=(e)=>{
     if (e.target.value.length >=3){
         const target = e.target;
         const name = target.name;
         const value = target.value;
         this.setState(prevState=>({
             isFirstNameFilled: true,
             fields: {
                 ...prevState.fields,
                 [name] : value
             }
         }));
     }else {
         this.setState({
             isFirstNameFilled: false,
         })
     }
 };

 handleLastNameChange=(e)=>{
     if (e.target.value.length >=3){
         const target = e.target;
         const name = target.name;
         const value = target.value;
         this.setState(prevState=>({
             isLastNameFilled: true,
             fields: {
                 ...prevState.fields,
                 [name] : value
             }
         }));
     }else {
         this.setState({
             isLastNameFilled: false,
         })
     }
 };

 handlePasswordChange=(e)=>{
     if (e.target.value.length >=6){
         const target = e.target;
         const name = target.name;
         const value = target.value;
         this.setState(prevState=>({
             isPasswordValid: true,
             fields: {
                 ...prevState.fields,
                 [name] : value
             }
         }));
     }else {
         this.setState({
             isPasswordValid: false,
         })
     }


 };

 onPasswordButtonClick=()=>{

     console.log("State values: ",this.state.fields);

     axios.post('http://api.cardosh.uz/v1/restapi/user/create/', this.state.fields

     ).then(response => {
console.log(response)
     }).catch(error => {
         console.log("this is error", error);
     });

 };

    handleDateInputChange=(e)=>{
console.log(e.target.value);
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState(prevState=>({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                [name] : value
            }
        }));
    };

    handleMaleButtonClick=()=>{
        this.setState(prevState=>({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                "gender" : 1
            }
        }));
    };
    handleFemaleButtonClick=()=>{
        this.setState(prevState=>({
            isDobFilled: true,
            fields: {
                ...prevState.fields,
                "gender" : 2
            }
        }));
    };







    render() {

        return (

            <Router>
                <div className="wrapper-reg">
                    <Route exact path='/register' render={() => <Reg/>}/>
                    <Route path='/register/mail' render={() => <MailForm
                        handleOnChange={this.handleEmailChange}
                        emailIsValid={this.state.isEmailValid}/>}
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

                </div>
            </Router>
        );
    }
}
const MailForm=(props)=>{
    const {handleOnChange, emailIsValid} = props;

    return (

        <div>

            <h1 className="register-title">Введите ваше эл. почту</h1>
            <Form className='login-form'>

                <Input
                    onChange={(e) => handleOnChange(e)}
                    name="email"
                    className='input-data'
                    placeholder=" Эл. почта"/>

                {emailIsValid ? <Button className='btn-form'>
                        <Link to='/register/name'>Далее</Link>
                    </Button> :
                    " "}


            </Form>
        </div>
    );
};


const Reg=()=>{
    return(
        <div>
            <h1 className='register-title'>Страница для регистрации</h1>
            <Form className="login-form">
                <ButtonGroup className="reg-btns-form">
                    <Button type="link">Войти через Facebook <Icon type='facebook'/></Button>
                    <Button type="link"><Link to='/register/mail'>Регистрация через эл. почту</Link></Button>
                </ButtonGroup>
            </Form>
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
                    <Button className='btn-form'><Link to='/register/dob'>Далее</Link></Button> :""}

            </Form>
        </div>
    );



};

const GenderForm=(props)=>{
    const {onMaleClick, onFemaleClick} =props;
    return(
        <div>
            <h1 className='register-title'>Вы </h1>
            <Form className='login-form'>
                <ButtonGroup className='gender-group'>
                    <Button className='btn-gender' onClick={onMaleClick} name="male"><Link to='/register/password'>Мужчина</Link></Button>
                    <Button className='btn-gender' onClick={onFemaleClick} name="female"><Link to='/register/password'>Женшина</Link></Button>
                </ButtonGroup>
            </Form>
        </div>
    );
};
const PasswordForm=(props)=>{

    const {handleOnChangePassword, isPasswordValid, onButtonClick} =props;

    return (

        <div>
            <h1 className='register-title'>Еще понадобиться пароль</h1>
            <Form className='login-form'>
                <Input className='input-data' type='password' placeholder='Пароль' name='password'
                       onChange={event => handleOnChangePassword(event)}/>
                {isPasswordValid ?
                    <Button onClick={onButtonClick} className='btn-form' type='default'><Link to='/register'>Далее</Link></Button> :
                    <p>Минимум 6 знаков!</p>}

            </Form>
        </div>
    );
};
const BirthForm=(props)=>{
    const {handleOnChange, isDobFilled} = props;
    return (
        <div>
            <h1 className='register-title'>Когда вы родились?</h1>
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

export default SignUp;