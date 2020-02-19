import React, {Component} from 'react';
import {Menu, Icon, Form, Input, Button, Layout, Select, notification, Upload, message, Avatar} from 'antd';
import {Switch, Route, NavLink} from 'react-router-dom';
import './Profile.scss'
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";
import PropTypes from "prop-types";


const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            userId: 0,
            profile_image: null,
            loading: false,
            confirmLoading: false,
            emailConfirmText: <div><p>Подтвердите свою электронную почту, чтобы мы
                могли связаться с вами, если понадобится.</p>
                <Button onClick={this.handleEmailConfirm}><Icon type="check"/>Подтвердить электронную почту</Button>
            </div>

        };

    }


    componentDidMount() {
        const userId = this.props.match.params.id;
        this.setState({
            userId: userId
        });
        console.log(userId);
        axios.get(API_BASE_URL + `/user/detail/${userId}/`).then(res => {
            console.log(res);
            this.setState({
                user: res.data,
                profile_image: res.data.profile_image
            })
        }).catch(err => {
            console.log(err)
        })
    }

    afterUpload = () => {
        this.props.uploaded()
    };

    handleEmailConfirm = () => {
        this.setState({
            confirmLoading: true
        });
        axios.get(API_BASE_URL + "/verify_email/", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        }).then(res => {
            this.setState({
                confirmLoading: false,
                emailConfirmText: <p>
                    Почта отправлена!
                </p>
            });
            console.log(res)
        }).catch(err => {
            this.setState({
                confirmLoading: false,
                emailConfirmText: <p>
                    Почта не отправлена!
                </p>
            });
            console.log(err)
        })
    };


    render() {


        const General = () => {
            console.log('user', this.state.user);
            return (
                <div className="general">
                    <h2>Мои персональные данные</h2>
                    <hr/>
                    <div className="general-form">
                        <GenForm
                            user={this.state.user}
                            userId={this.state.userId}
                        />
                    </div>
                </div>
            );
        };

        const Car = () => {
            const car = this.state.user.car;
            return (
                <div className="general">
                    <h2> Мой автомобиль</h2>
                    <hr/>
                    <div className="general-form">
                        <CarForma
                            car={car}
                        />
                    </div>
                </div>
            )
        };


        const Verifications = () => {
            const {confirmLoading, emailConfirmText} = this.state;
            const email = this.state.user.email;
            return (
                <div>
                    <h2>Подтверждение</h2>
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

        const Verified = () => {
            const email = this.state.user.email;

            return (
                <div>
                    <h2>Подтверждение</h2>
                    <hr/>
                    <h2><Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a"/> Эл. почта подтверждена </h2>
                    <p>Ваша эл. почта: {email} </p>
                    <p>Вы подтвердили свою электронную почту, и теперь мы сможем связаться с вами, если понадобится.</p>
                </div>
            )
        };

        const userId = this.props.match.params.id;
        const email_confirmed = this.state.user.email_confirmed;

        return (
            <div className="profile-page">
                <Layout style={{minHeight: '700px'}}>
                    <Sider
                        breakpoint='xs'
                        collapsedWidth="0"
                        theme="light"
                        width={250}
                        defaultCollapsed={true}
                    >
                        <div className="logo"/>
                        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                                <NavLink to={`/profile/${userId}/general`}>
                                    <Icon type="user"/>
                                    <span className="nav-text"> Персональные данные </span>
                                </NavLink>

                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to={`/profile/${userId}/verifications`}>
                                    <Icon type="file-protect"/>
                                    <span className="nav-text"> Надежность пользователя </span>
                                </NavLink>

                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to={`/profile/${userId}/picture`}>
                                    <Icon type="file-image"/>
                                    <span className="nav-text">Фото профиля</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <NavLink to={`/profile/${userId}/car`}>
                                    <Icon type="car"/>
                                    <span className="nav-text"> Мой автомобиль</span>
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/*<Header style={{ background: '#fff', padding: 0 }} />*/}
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                                <Switch>
                                    <Route exact path="/profile/:id/general" render={() => <General/>}/>
                                    <Route path="/profile/:id/picture"
                                           render={() => <PicFrom
                                               userId={this.state.userId}
                                               profile_image={this.state.profile_image}
                                               afterUpload={this.afterUpload}/>}/>
                                    <Route path="/profile/:id/verifications"
                                           render={() => email_confirmed ? <Verified/> : <Verifications/>}/>
                                    <Route path="/profile/:id/car" render={() => <Car/>}/>

                                </Switch>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>CarDosh</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

class GeneralForm extends Component {


    handleSubmitGeneral = e => {
        const userId = this.props.userId;

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.put(API_BASE_URL + `/user/${userId}/update/`, values, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                    }
                }).then(res => {
                    console.log(res);
                    notification.success({
                        message: 'Данные успешно сохранены!'
                    })
                }).catch(err => {
                    notification.error({
                        message: 'Произошло ошибка!'
                    })
                })
            }
        })

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const user = this.props.user;
console.log('user: ',user)
        return (
            <Form
                hideRequiredMark={true}
                {...formItemLayout}
                onSubmit={this.handleSubmitGeneral}>


                <Form.Item className="form-item" label="Пол">
                    {getFieldDecorator('gender', {
                        initialValue: (user.gender === 1 ? "1" : "2"),
                    })(
                        <Select>
                            <Option value="1">Мужчина</Option>
                            <Option value="2">Женщина</Option>
                        </Select>
                    )}
                </Form.Item>


                <Form.Item className="form-item" label="Имя">
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


                <Form.Item className="form-item" label="Фамилия">
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
                <Form.Item className="form-item" label="Эл. почта">
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
                <Form.Item className="form-item" label="Моб. телефон:">
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

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>

            </Form>)

    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Вы можете загрузить только JPG / PNG файл!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Изображение должно быть меньше 2 МБ!');
    }
    return isJpgOrPng && isLt2M;
}

class Picture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: null,
            imageUrl1: null,
            loading: false,
            uploadSuccess: false,
            uploadError: false,
            fileList: [],
            showSubmitBtn: false
        }
    }

    componentDidMount() {
        const {profile_image} = this.props;
        this.setState({
            imageUrl1: profile_image
        })
    }


    handlePicSubmit = e => {
        this.setState({
            loading: true,
        });
        let formData = new FormData();
        formData.append("profile_image", this.state.fileList[0].originFileObj);
        const userId = this.props.userId;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('values: ', formData);
                axios.put(`${API_BASE_URL}/${userId}/profile_image/update/`, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    this.setState({
                        loading: false,
                        uploadSuccess: true,
                        showSubmitBtn: false
                    });
                    notification.success({
                        message: "Фотография профиля была успешно сохранена!"
                    });
                    this.props.afterUpload();
                    console.log(res);
                }).catch(err => {
                    this.setState({
                        loading: false,
                        uploadError: true
                    });

                    notification.error({
                        message: "Фотография профиля не была сохранена!"
                    });
                    console.log(err);
                })
            }
        })
    };


    resetPhoto = () => {
        this.setState({
            imageUrl: null,
            imageUrl1: null,
            fileList: [],
            showSubmitBtn: false
        })
    };

    handlePicChange = ({fileList}) => {
        const file = fileList[0];

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (isJpgOrPng && isLt2M) {
            getBase64(fileList[0].originFileObj, imageUrl => {
                    this.setState({
                        imageUrl,
                    });

                }
            );

            // if (!isLt2M) {
            //     const options = {
            //         maxSizeMB: 1,
            //         maxWidthOrHeight: 1920,
            //         useWebWorker: false
            //     };
            //     const blob = new Blob([file],{type:'image/png'});
            //
            //         imageCompression(blob, options).then(compressedFile=>{
            //             console.log('compressedFile instanceof Blob', compressedFile.instanceOf.Blob); // true
            //             console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            //         }).catch(error => {
            //             console.log(error.message);
            //         })
            // }
            this.setState({
                fileList,
                showSubmitBtn: true
            });
        }

    };

    render() {
        const {imageUrl, imageUrl1} = this.state;
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        const uploadButton = (
            <div>
                <Icon type={'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (

            <Form {...formItemLayout} onSubmit={this.handlePicSubmit}>
                <h2>Фото профиля</h2>
                <hr/>

                {imageUrl != null ?
                    <div style={{margin: "auto", width: "200px"}}><Avatar className="ready-avatar" size={200}
                                                                          src={imageUrl}/></div> :
                    imageUrl1 ?
                        <div style={{margin: "auto", width: "200px"}}><Avatar className="ready-avatar" size={200}
                                                                              src={imageUrl1}/></div> : ''}
                <Form.Item className="form-item-upload">
                    {getFieldDecorator('profile_image', {
                        valuePropName: 'file',
                        getValueFromEvent: this.normFile,
                        rules: [{required: true, message: 'Пожалуйста, загрузите файл!'}]
                    })(
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            action="/upload.do"
                            beforeUpload={beforeUpload}
                            showUploadList={false}
                            onChange={this.handlePicChange}
                        >
                            {imageUrl || imageUrl1 ? null : uploadButton}

                        </Upload>
                    )}
                </Form.Item>

                {this.state.loading ? <Icon className="upload-loading" type='loading'/> :
                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        {this.state.showSubmitBtn ? <Button type="primary" htmlType="submit">
                            Сохранить фото
                        </Button> : ''}

                        <Button className="btn-clear-photo" onClick={this.resetPhoto}>
                            Новое фото
                        </Button>
                    </Form.Item>}


            </Form>
        );
    }
}


class CarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCar: false,
            car: null
        }
    }

    componentDidMount() {
        const propsCar = this.props.car;
        if (propsCar) {
            this.setState({
                hasCar:true,
                car: propsCar
            })
        }
    }

    handleCarSubmit = e =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);

                if (this.state.hasCar){
                    axios.put(API_BASE_URL+"/manage/car/", values, {
                        headers:{
                            "Authorization" : "Bearer "+localStorage.getItem(ACCESS_TOKEN),
                            "Content-Type" : "application/json"
                        }
                    }).then(res=>{
                        notification.success({
                            message:"Данные автомобиля изменены!",
                        });
                    }).catch(err=>{
                        notification.error({
                            message:"Ошибка подключения!"
                        });
                        this.setState({
                            car: values,
                        },()=>this.setState({hasCar: true}))
                    })
                } else {
                    axios.post(API_BASE_URL+"/manage/car/", values, {
                        headers:{
                            "Authorization" : "Bearer "+localStorage.getItem(ACCESS_TOKEN),
                            "Content-Type" : "application/json"
                        }
                    }).then(res=>{

                        notification.success({
                            message:"Автомобиль добавлен!",
                        });
                        this.setState({
                            car: values,
                        },()=>this.setState({hasCar: true}))
                    }).catch(err=>{
                        notification.error({
                            message:"Ошибка подключения!"
                        });

                    })
                }

            }
        })
    };


    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const car = this.state.car;
        const hasCar = this.state.hasCar;
        return (
            <Form
                hideRequiredMark={true}
                {...formItemLayout}
                onSubmit={this.handleCarSubmit}
            >


                <Form.Item className="form-item" label="Марка">
                    {getFieldDecorator('brand', {
                        initialValue: `${hasCar? car.brand:""}`,
                        rules: [
                            {
                                required: true,
                                message: 'Пожалуйста, введите марку автомоболя!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>


                <Form.Item className="form-item" label="Модель">
                    {getFieldDecorator('car_model', {
                        initialValue: `${hasCar? car.car_model:""}`,
                        rules: [
                            {
                                required: true,
                                message: 'Пожалуйста, введите модель автомоболя!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item className="form-item" label="Цвет">
                    {getFieldDecorator('color', {
                        initialValue: `${hasCar? car.color:""}`,
                        rules: [
                            {
                                required: true,
                                message: 'Пожалуйста, введите цвет автомоболя!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item className="form-item" label="Гос. номер">
                    {getFieldDecorator('gov_number', {
                        initialValue: `${hasCar? car.gov_number:""}`,
                        rules: [
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой адрес электронной почты!',
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        xs: {span: 24, offset: 0},
                        sm: {span: 16, offset: 8},
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

const CarForma = Form.create()(CarForm);

const PicFrom = Form.create()(Picture);

const GenForm = Form.create()(GeneralForm);


Profile.propTypes = {
    email_confirmed: PropTypes.bool,
    uploaded: PropTypes.func
};

export default Profile;
