/* global google */
import React, {Component} from 'react';
import './OfferTrip.scss'
import {DatePicker, TimePicker, Button, Steps, Form, Icon, notification, Modal} from 'antd';
import moment from 'moment';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import {HashRouter as Router, Switch, Route, Redirect, withRouter, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Map from './Map';
import SecondStepForm from './Second'
import axios from 'axios'
import Confirm from "./Confirm";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";


// const history = createBrowserHistory();
// const location = history.location;
// history.listen((location) => {
//     console.log('location', location);
// });


// const {Step} = Steps;
//
// const steps = [
//     "First", "Second", "Last"
// ];

class OfferTrip extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            offerTripFields: {
                'customUser': null,
                'fromm': "",
                'to': "",
                'departure_date': "",
                'departure_time': "",
                'seats': 3,
                'price': 5000,
                'description': "default",
                'fromID': "",
                'toID': ""
                // 'phone_number': "",
            },
            origin: {},
            hasOrigin: false,
            destination: {},
            hasDestination: false,
            current: 0,
            loading: false,
            redirectSecond: false,
            distance: '',
            duration: '',
            redirectConfirm: false,
            modalVisible: false
        }
    }

    componentDidMount() {
        this._isMounted = true;

            setTimeout(function(){
                if (!this.props.isAuthenticated){
                this.setState({
                    modalVisible: true
                })
                }
                const user = Number.parseInt(this.props.currentId);
                this.setState(prevState => ({
                    offerTripFields: {
                        ...prevState.offerTripFields,
                        'customUser': user,
                    }
                }))
            }.bind(this),5000);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSelectFrom = (description, place_id) => {
        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'fromm': description,
                'fromID': place_id
            }
        }));

        geocodeByPlaceId(place_id)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) =>
                this.setState({
                    origin: {lat, lng},
                    hasOrigin: true
                })
            );



    };

    handleSelectTo = (description, place_id) => {

        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'to': description,
                'toID': place_id
            },

        }));
        geocodeByPlaceId(place_id)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) =>
                this.setState({
                    destination: {lat, lng},
                    hasDestination: true
                })
            );
    };


    handleClickDale = values => {
        this.setState({
            loading: true
        });


        const formattedDate =moment(values.date).format("YYYY-MM-DD")

        const formattedTime = moment(values.time).format("HH:mm");




        const service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
                origins: [new google.maps.LatLng(this.state.origin)],
                destinations: [new google.maps.LatLng(this.state.destination)],
                travelMode: window.google.maps.TravelMode.DRIVING,
                avoidHighways: false,
                avoidTolls: false,
            },
            (result, status) => {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    const distance = result.rows[0].elements[0].distance.text;
                    const duration = result.rows[0].elements[0].duration.text;
                    this.setState({
                        distance: distance,
                        duration: duration,
                    });
                    notification.success({
                        message: 'Успешно',
                        description: '',
                    });
                    this.setState({
                        loading: false,
                        redirectSecond: true,
                    })
                } else {
                    this.setState({
                        loading: false,
                        redirectSecond: true,
                    })
                }
            });

        this.setState( prevState=>({
        offerTripFields: {
            ...prevState.offerTripFields,
            'departure_date': formattedDate,
            'departure_time': formattedTime,
        }

        }));

    };


    handleSecondStepVal = (values) => {
        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'price': values.price,
                'seats': values.seats,
                'description': values.description
            },
            redirectConfirm: true
        }),()=>this.sendFields());
    };

    // getPhoneNum=(val)=>{
    //     console.log("val "+val);
    //     this.setState(prevState => ({
    //         offerTripFields:{
    //             ...prevState.offerTripFields,
    //             'phone_number': val
    //         }
    //     }))
    // };

    sendFields=()=>{
        console.log(this.state.offerTripFields);
        axios.post(API_BASE_URL+'/ride/create/', JSON.stringify(this.state.offerTripFields),{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+localStorage.getItem(ACCESS_TOKEN)
            }

        }).then(res=>{
            notification.success({
                message: "Успешно",
                description: "Ваша поездка успешно зарегистрирована!"
            });
            this.props.history.push("/")
        }).catch(err=>{

            notification.error({
                message: "Ошибка",
                description: "Произошла ошибка!"
            });
            if (err.status===401){
                this.setState({
                    modalVisible:true
                })
            }

        })
    };


    render() {

        const FirstStep = () => {
            return (
                <div className="form-flex">
                    <div className="plll">
                        <div className='from-to'>
                            <div>
                            <h3>Где бы вы хотели, чтобы вас забрали?</h3>
                            <GooglePlacesAutocomplete
                                inputClassName={this.state.offerTripFields.fromm===""?"input":"input input1"}
                                placeholder='Например: Ташкент'
                                initialValue={this.state.offerTripFields.fromm}
                                onSelect={({description, place_id}) => (this.handleSelectFrom(description, place_id))}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ['uz'],
                                    },
                                    types: ['(cities)']
                                }}
                            />
                            </div>

                            <div>
                            <h3>Где бы вы хотели, чтобы вас высадили?</h3>
                            <GooglePlacesAutocomplete
                                inputClassName={this.state.offerTripFields.to===""?"input":"input input1"}
                                placeholder='Например: Шахрисабз'
                                initialValue={this.state.offerTripFields.to}
                                onSelect={({description, place_id}) => (this.handleSelectTo(description, place_id))}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ['uz'],
                                    },
                                    types: ['(cities)']
                                }}
                            />
                            </div>
                        </div>
                        <DateAndTime
                            onClickDale={this.handleClickDale}
                            disabled={this.state.hasOrigin && this.state.hasDestination}
                            loading={this.state.loading}
                        />
                    </div>

                    <div className="route-map">
                        <div>
                            <Map
                                origin={this.state.origin}

                                destination={this.state.destination}
                                renderDirection={this.state.hasOrigin && this.state.hasDestination}
                            />
                        </div>
                    </div>
                    <Modal
                        visible={this.state.modalVisible}
                        title="Авторизуйтесь чтобы подать заявку!"
                        closable={false}
                        footer={null}
                      >

                        <div className="modal-content">
                            <h2><Link to="/register">Зарегистрироваться</Link></h2>
                            <br/>
                            <h2><Link to="/login">Войти в систему</Link></h2>
                        </div>
                    </Modal>
                </div>
            );

        };

        const SecondStep1 = () => {
            return (
                <div className="form-flex">
                    <div className="plll">
                        <SecondStepForm
                            origin={this.state.offerTripFields.fromm}
                            destination={this.state.offerTripFields.to}
                            distance={this.state.distance}
                            duration={this.state.duration}
                            departureDate={this.state.offerTripFields.departure_date}
                            departureTime={this.state.offerTripFields.departure_time}
                            onValuesSubmit={this.handleSecondStepVal}
                        />
                    </div>
                    <div className="route-map google-maps">
                        <div>
                            <Map
                                origin={this.state.origin}
                                destination={this.state.destination}
                                renderDirection={this.state.hasOrigin && this.state.hasDestination}
                            />
                        </div>
                    </div>

                </div>
            );
        };


        return (

                <div className="wrapper-offer">
                    <div className="form-group">
                        <h1 className="trip-header">Оставит заявку</h1>
                        <br/>
                        <div className='offer-form'>
                            <Switch>
                            <Route exact path='/offerTrip' render={() => this.state.redirectSecond ?
                                <Redirect to='/offerTrip/second'/> : <FirstStep/>}/>
                            <Route path='/offerTrip/second'
                                   render={() => this.state.hasOrigin && this.state.hasDestination ?
                                       // (this.state.redirectConfirm ?
                                //       {/*<Redirect to='/offerTrip/confirm'/> : */}
                                       <SecondStep1/>
                                       // )
                                       :
                                       <Redirect to="/offerTrip"/>}/>
                            {/*<Route path='/offerTrip/confirm' render={() =>*/}
                            {/*    this.state.redirectConfirm ?*/}
                            {/*    <Confirm*/}
                            {/*        onConfirm={this.sendFields}*/}
                            {/*    getNum={this.getPhoneNum}/>:<Redirect to="/offerTrip"/>}*/}
                            {/*/>*/}
                            </Switch>

                        </div>
                    </div>

                </div>
        );
    }
}

let date = false;
let time = false;


class DateAndTimeComponent extends Component {
    componentDidMount() {
        date = false;
        time = false;
    }

    handleClickSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onClickDale(values);
            }
        });

    };
    disabledDate = (current) => {
        // Can not select days before today and today
        return current < moment().startOf('day');
    };
    handleDateChange=()=>{

return date=true;
    };

    handleTimeChange=()=>{
        return time = true;
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {loading, disabled} = this.props;


        return (
            <Form onSubmit={this.handleClickSubmit}>
                <div className='date-time'>
                    <div>
                        <h3>Дата и время</h3>
                    </div>
                    <div className='date-time-inputs'>
                        <Form.Item>
                            {getFieldDecorator('date', {
                                rules: [{required: true, message: 'Пожалуйста, введите дату!'}],
                            })(
                                <DatePicker
                                    className={date ? "date-picker date-filled":"date-picker"}
                                    onChange={this.handleDateChange}
                                    format='DD.MM.YYYY'
                                    placeholder='Дата'
                                    disabled={!disabled}
                                    disabledDate={this.disabledDate}
                                />
                            )}
                        </Form.Item>

                        <Form.Item>
                            {getFieldDecorator('time', {
                                rules: [{required: true, message: 'Пожалуйста, введите время!'}],
                            })(
                                <TimePicker
                                    className={time ? "time-picker time-filled":"time-picker"}
                                    onChange={this.handleTimeChange}
                                    disabled={!disabled}
                                    format='HH:mm'
                                    minuteStep={10}
                                    placeholder='Время'
                                />
                            )}
                        </Form.Item>

                    </div>
                    <br/>
                    <div className="submit-btn">
                        <Form.Item>

                            <Button
                                className={date&&time ? "button-fill":""}
                                disabled={!disabled}
                                type="primary"
                                htmlType="submit"
                            >
                                Продолжить
                                {loading ? <Icon type="loading"/> : <Icon type="double-right"/>}
                            </Button>

                        </Form.Item>
                    </div>
                </div>
            </Form>
        );
    }
}

const DateAndTime = Form.create()(DateAndTimeComponent);


export default OfferTrip;