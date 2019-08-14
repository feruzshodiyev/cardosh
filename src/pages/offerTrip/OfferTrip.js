/* global google */
import React, {Component} from 'react';
import './OfferTrip.scss'
import {DatePicker, TimePicker, Button, Steps, Form, Icon, notification} from 'antd';
import moment from 'moment';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import {HashRouter as Router, Route, Redirect, withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Map from './Map';
import SecondStepForm from './Second'
import axios from 'axios'
import Confirm from "./Confirm";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";


const history = createBrowserHistory();
const location = history.location;
history.listen((location) => {
    console.log('location', location);
});


const {Step} = Steps;

const steps = [
    "First", "Second", "Last"
];

class OfferTrip extends Component {
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
                'toID': "",
                'phone_number': "",
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
            redirectConfirm: false
        }
    }

    componentDidMount() {
        const user = Number.parseInt( localStorage.getItem('user'),10);
        console.log(user);
        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'customUser': user,
            }
        }),()=>console.log(this.state.offerTripFields))
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
                // console.log('Successfully got latitude and longitude', { lat, lng })
                this.setState({
                    destination: {lat, lng},
                    hasDestination: true
                })
            );
        console.log(this.state.offerTripFields);
        console.log(description, place_id)
    };


    handleClickDale = values => {
        this.setState({
            loading: true
        });


        const date = moment(values.date);
        const obj = date.toObject();
        const day = obj.date;
        const months = obj.months;
        const years = obj.years;
        const formattedDate = "" + years + "-" + months + "-" + day;
        const time = moment(values.time);
        const timeObj = time.toObject();
        const hours = timeObj.hours;
        const minutes = timeObj.minutes;
        const formattedTime = ""+hours+":"+minutes;


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
        }));
    };

    getPhoneNum=(val)=>{
        console.log("val "+val);
        this.setState(prevState => ({
            offerTripFields:{
                ...prevState.offerTripFields,
                'phone_number': val
            }
        }))
    };

    sendFields=()=>{
        console.log(this.state.offerTripFields);
        axios.post(API_BASE_URL+'/ride/create/', JSON.stringify(this.state.offerTripFields),{
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer '+ACCESS_TOKEN
            }

        }).then(res=>{
            notification.success({
                message: "Успешно",
                description: "Ваша поездка успешно зарегистрирована!"
            });
            history.push("/")
        }).catch(err=>{
            notification.error({
                message: "Ошибка",
                description: "Произошла ошибка!"
            });
            history.push("/")
        })
    };


    render() {

        const FirstStep = () => {
            return (
                <div className="form-flex">
                    <div className="plll">
                        <div className='from-to'>
                            <h1>Откуда вы выезжаете?</h1>
                            <GooglePlacesAutocomplete
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
                            <hr/>
                            <h1>Куда вы едете?</h1>
                            <GooglePlacesAutocomplete
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
                            <hr/>
                        </div>
                        <DateAndTime
                            onClickDale={this.handleClickDale}
                            disabled={this.state.hasOrigin && this.state.hasDestination}
                            loading={this.state.loading}
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
            <Router history={history}>
                <div className="wrapper-offer">
                    <div className="form-group">
                        <h1 className="trip-header">Предложить поездку</h1>
                        {/*<Steps current={this.state.current}>*/}
                        {/*    {*/}
                        {/*        steps.map(item => (<Step key={item} title={item}/>))*/}
                        {/*    }*/}

                        {/*</Steps>*/}
                        <br/>
                        <div className='offer-form'>

                            <Route exact path='/offerTrip' render={() => this.state.redirectSecond ?
                                <Redirect to='/offerTrip/second'/> : <FirstStep/>}/>
                            <Route path='/offerTrip/second'
                                   render={() => this.state.hasOrigin && this.state.hasDestination ? (this.state.redirectConfirm ?
                                       <Redirect to='/offerTrip/confirm'/> : <SecondStep1/>) :
                                       <Redirect to="/offerTrip"/>}/>
                            <Route path='/offerTrip/confirm' render={() =>
                                this.state.redirectConfirm ?
                                <Confirm
                                    onConfirm={this.sendFields}
                                getNum={this.getPhoneNum}/>:<Redirect to="/offerTrip"/>}
                            />

                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}


class DateAndTimeComponent extends Component {
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
        return current && current < moment().endOf('day');
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const {loading, disabled} = this.props;

        return (
            <Form onSubmit={this.handleClickSubmit}>
                <div className='date-time'>
                    <div>
                        <h2>Дата и время</h2>
                    </div>
                    <div className='date-time-inputs'>
                        <Form.Item label="DatePicker">
                            {getFieldDecorator('date', {
                                rules: [{required: true, message: 'Please input your date!'}],
                            })(
                                <DatePicker
                                    format='DD.MM.YYYY'
                                    placeholder='Дата'
                                    disabled={!disabled}
                                    disabledDate={this.disabledDate}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label="TimePicker">
                            {getFieldDecorator('time', {
                                rules: [{required: true, message: 'Please input your time!'}],
                            })(
                                <TimePicker
                                    disabled={!disabled}
                                    format='HH:mm'
                                    placeholder='Время'
                                />
                            )}
                        </Form.Item>

                    </div>
                    <br/>
                    <div className="submit-btn">
                        <Form.Item>

                            <Button
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


export default withRouter(OfferTrip);