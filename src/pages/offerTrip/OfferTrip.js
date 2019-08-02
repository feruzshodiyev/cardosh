/* global google */
import React, {Component} from 'react';
import './OfferTrip.scss'
import {DatePicker, TimePicker, Button, Steps, Form, Icon, notification} from 'antd';
import moment from 'moment';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import {BrowserRouter as Router, Link, Route, Redirect, withRouter, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Map from './Map';
import SecondStepForm from './Second'
import axios from 'axios'


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
                'fromm': "",
                'to': "",
                'departure_date': "",
                'departure_time': "",
                'price': 5000,
                'seats': 3,
                'extra_info': ""
            },
            origin: {},
            hasOrigin: false,
            destination: {},
            hasDestination: false,
            current: 0,
            loading: false,
            redirectSecond: false,
        }
    }


    handleSelectFrom = (description, place_id) => {
        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'fromm': description
            }
        }));

        geocodeByPlaceId(place_id)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) =>
                // console.log('Successfully got latitude and longitude', { lat, lng })
                this.setState({
                    origin: {lat, lng},
                    hasOrigin: true
                })
            );


        console.log(description, place_id);

    };

    handleSelectTo = (description, place_id) => {

        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'to': description
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
        const formattedDate = "" + day + "." + months + "." + years;

        console.log(formattedDate);

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
                    console.log('result from custom code: ' + result.rows[0].elements[0].distance.text);
                    notification.success({
                        message: 'Успешно',
                        description: '',
                    });
                    this.setState({
                        loading: false,
                        redirectSecond: true,
                    })
                } else {
                    console.error(`error fetching distance ${result}`);
                }
            });


    };


    handleSecondStepVal = (values) => {
        this.setState(prevState => ({
            offerTripFields: {
                ...prevState.offerTripFields,
                'price': values.price,
                'seats': values.seats,
                'extra_info': values.extra_info
            }
        }));
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
                                    }
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
                        <Steps current={this.state.current}>
                            {
                                steps.map(item => (<Step key={item} title={item}/>))
                            }

                        </Steps>
                        <br/>
                        <div className='offer-form'>

                            <Route exact path='/offerTrip' render={() => this.state.redirectSecond ?
                                <Redirect to='/offerTrip/second'/> : <FirstStep/>}/>
                            <Route path='/offerTrip/second'
                                   render={() => this.state.hasOrigin && this.state.hasDestination ? <SecondStep1/> :
                                       <Redirect to="/offerTrip"/>}/>

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
                            {/*<Link id="link" to='/offerTrip/second'>*/}
                            <Button
                                disabled={!disabled}
                                type="primary"
                                htmlType="submit"
                            >
                                Продолжить
                                {loading ? <Icon type="loading"/> : <Icon type="double-right"/>}
                            </Button>
                            {/*</Link>*/}
                        </Form.Item>
                    </div>
                </div>
            </Form>
        );
    }
}

const DateAndTime = Form.create()(DateAndTimeComponent);


export default withRouter(OfferTrip);