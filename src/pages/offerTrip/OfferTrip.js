import React, {Component} from 'react';
import './OfferTrip.scss'
import {Checkbox,Input,DatePicker, TimePicker, Button,Icon} from 'antd'

class OfferTrip extends Component {
    render(){
        return (
            <div className="wrapper-offer">
                <div className="form-group">
                    <h1 className="trip-header">Предложить поездку</h1>
                    <form className='offer-form'>
                        <div className="form-flex">
                            <div className="plll">
                                <div className='from-to'>
                                    <label for="new_Offer_departurePlace_name">Откуда вы выезжаете?</label>
                                    <Input id="new Offer departurePlace name" prefix={<Icon type="up-circle"/>} placeholder="Например: Андижан, Узбекистан"/>
                                    <lablel for="new_Offer_arrivalPlace_name">Куда вы едете?</lablel>
                                    <Input id="new Offer arrivalPlace name" prefix={<Icon type="up-circle"/>} placeholder="Например: Хорезм, Узбекистан"/>
                                    <div>
                                        <h4>Промежуточные пункты</h4>
                                        <label for="interval-stops">Добавьте промежуточьные пункты- если вы предложите взять и высадить
                                            пассажиров по дороге, все места в машине будут заполнены.
                                        </label>
                                        <Input id='interval-stops'/>
                                    </div>
                                </div>
                                <div className='date-time'>
                                    <div>
                                        <h2>Дата и время</h2>
                                        <label>
                                            <Checkbox></Checkbox>
                                            Поездка в обе стороны
                                        </label>
                                        <label />
                                    </div>
                                    <div>
                                        <DatePicker/>
                                        <TimePicker/>
                                    </div>
                                    <div>
                                        <DatePicker/>
                                        <TimePicker/>
                                    </div>
                                    <div className="submit-btn">
                                        <Button>Продолжить</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="route-map google-maps" >
                                <h3>Маршрут</h3>

                            </div>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}


export default OfferTrip