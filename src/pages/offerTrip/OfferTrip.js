import React, {Component} from 'react';
import './OfferTrip.scss'
import {Checkbox, Input, DatePicker, TimePicker, Button, Steps, Icon, InputNumber } from 'antd';
import moment from 'moment';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import { withScriptjs } from "react-google-maps";
import { createBrowserHistory } from 'history';
import Map from './Map';

const history = createBrowserHistory();
const location = history.location;
const { TextArea } = Input;

history.listen((location) => {
    console.log('location', location);
});

const {Step} = Steps;

const steps = [
"First", "Second", "Last"
];
class OfferTrip extends Component {
    constructor(props){
        super(props);
        this.state={
            offerTripFields: {
                'fromm': "",
                'to': "",
                'departure_date': "",
                'departure_time': "",
                'price': 5000,
                'seats': 3
            },
            time: null,
            date: null,
            origin: {},
            hasOrigin: false,
            destination: {},
            hasDestination: false,
            current: 0,
        }
    }



    handleSelectFrom=(description, place_id)=>{
        this.setState(prevState=>({
            offerTripFields: {
                ...prevState.offerTripFields,
                'fromm':  description
            }
        }));

        geocodeByPlaceId(place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
                // console.log('Successfully got latitude and longitude', { lat, lng })
                this.setState({
                    origin: { lat, lng },
                    hasOrigin: true
                })
            );


        console.log(description, place_id);

    };

    handleSelectTo=(description, place_id)=>{

        this.setState(prevState=>({
            offerTripFields: {
                ...prevState.offerTripFields,
                'to' :  description
            },

        }));
        geocodeByPlaceId(place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) =>
                // console.log('Successfully got latitude and longitude', { lat, lng })
                this.setState({
                    destination: { lat, lng },
                    hasDestination: true
                })
            );
        console.log(this.state.offerTripFields);
        console.log(description, place_id)};

    handleDate=(date, dateString)=>{
        this.setState(prevState=>({
            offerTripFields: {
                ...prevState.offerTripFields,
                'departure_date' :  dateString
            },
            date
        }));

    };

    handleTime=(time, timeString)=>{
        this.setState(prevState=>({
            offerTripFields: {
                ...prevState.offerTripFields,
                'departure_time' :  timeString
            },
            time
        }));
    };

    handleClick=()=>{
        console.log(this.state.offerTripFields);

    };

    disabledDate=(current)=> {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    };

    onPriceChange =(value)=> {
        this.setState(prevState=>({
            offerTripFields: {
                ...prevState.offerTripFields,
                'price':  value
            }
        }));
    };


    render(){
        const FirstStep = () =>{
            return(
                <div className="form-flex">
                    <div className="plll">
                        <div className='from-to'>
                            <h1>Откуда вы выезжаете?</h1>
                            <GooglePlacesAutocomplete
                                placeholder='Ташкент'
                                initialValue={this.state.offerTripFields.fromm}
                                onSelect={({ description, place_id }) =>(this.handleSelectFrom(description, place_id))}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ['uz'],
                                    },
                                }}
                            />
                            <h1>Куда вы едете?</h1>
                            <GooglePlacesAutocomplete
                                placeholder='Шахрисабз'
                                initialValue={this.state.offerTripFields.to}
                                onSelect={({description, place_id}) => (this.handleSelectTo(description, place_id))}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                        country: ['uz'],
                                    }
                                }}
                            />

                        </div>
                        <div className='date-time'>
                            <div>
                                <h2>Дата и время</h2>
                            </div>
                            <div>
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    format='DD.MM.YYYY'
                                    placeholder='Дата'
                                    value={this.state.date}
                                    onChange={this.handleDate}/>

                                <TimePicker
                                    format='HH:mm'
                                    placeholder='Время'
                                    value={this.state.time}
                                    onChange={this.handleTime}/>
                            </div>
                            <br/>
                            <div className="submit-btn">
                                <Button type="primary" disabled={false} onClick={this.handleClick}><Link to='/offerTrip/second'>Продолжить</Link></Button>
                            </div>
                        </div>
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
        const SecondStep = () =>{

            return (
                <div className="form-flex">
                    <div className="plll">
                        <div className="price-wrap">
                            <div>
                                <h2>Цена с пассажира</h2>
                            </div>
                            <div className="direction">
                                <p><Icon type="down-circle"/> {this.state.offerTripFields.fromm}</p>
                                <p><Icon type="environment"/> {this.state.offerTripFields.to}</p>
                            </div>
                            <div className="price">
                                <div>
                                    <InputNumber
                                        size="large"
                                        min={0} max={300000}
                                        step={5000}
                                        value={this.state.offerTripFields.price}
                                        autoFocus={true}
                                        onBlur={this.onPriceChange}
                                    />
                                    <div className="currency">
                                        <p>Сум</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="seats">
                            <div>
                                <p>Свободных мест:</p>
                            </div>
                            <div id="inp">
                                <InputNumber
                                    min={1} max={7}
                                    defaultValue={3}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="extra-info">
                            <div>
                                <h2>Подробнее о поездке</h2>
                            </div>
                            <div>
                                <p>Предоставьте пассажирам больше информации о поездке.</p>
                                <TextArea
                                    // onFocusCapture={}
                                    placeholder="Укажите, например:
                - место отправления и прибытия;
                - возможность взять багаж;
                - количество пассажиров;
                - правила поведение в вашем автомобиле."
                                    rows={4}/>
                            </div>
                            <div><p>
                                <Icon type="exclamation-circle" /> Не указывайте здесь ваши контактные данные. Потенциальные пассажиры получат ваш номер телефона.
                            </p></div>
                        </div>

                        <div className="wrap-back-forward">
                        <div><Button type="primary"><Icon type="double-left" />Назад</Button></div>
                        <div id="forward"><Button type="primary">Продлжить<Icon type="double-right" /></Button></div>
                        </div>
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
                            <Route exact path='/offerTrip' render={() => <FirstStep/>}/>
                            <Route path='/offerTrip/second'
                                   render={() => this.state.hasOrigin && this.state.hasDestination ? <SecondStep/> :
                                       <Redirect to="/offerTrip"/>}/>
                        </div>
                    </div>

                </div>
            </Router>
        );
    }
}




export default OfferTrip