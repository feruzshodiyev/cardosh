import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Icon, Input, InputNumber} from "antd";
import './OfferTrip.scss'

const { TextArea } = Input;
class Second extends Component {
    constructor(props){
        super(props);
        this.state={

        }
}



    handleSubmitSecondStepFields = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onValuesSubmit(values);
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmitSecondStepFields}>

                        <div className="price-wrap">
                            <div>
                                <h2>Цена с пассажира</h2>
                            </div>
                            <div className="direction">
                                <div className="selected-routes">
                                <p><Icon type="down-circle"/>{this.props.origin} </p>
                                <p><Icon type="environment"/>{this.props.destination}</p>
                                </div>
                                <div className="route-info">
                                    <p>Отправление:--- {this.props.departureDate} <Icon type="clock-circle" /> {this.props.departureTime}  </p>
                                    <p>Расстоярие:---   {this.props.distance} </p>
                                    <p>Время в пути:--- {this.props.duration} </p>

                                </div>
                            </div>

                            <div className="price-seats">

                            <div className="price">
                                <div>
                                    <Form.Item label="Желаемая цена за место:">
                                    {getFieldDecorator('price',{
                                        initialValue: 5000
                                    })(
                                        <InputNumber
                                            min={0}
                                            max={200000}
                                            step={5000}
                                            autoFocus={true}
                                        />
                                    )}
                                    </Form.Item>
                                    <div className="currency">
                                        <p>Сум</p>
                                    </div>
                                </div>

                            </div>

                        <div className="seats">
                            <div id="inp">
                                <Form.Item label="Необходимое количество мест:">
                                {getFieldDecorator('seats',{
                                    initialValue: 1
                                })(
                                    <InputNumber
                                        min={1} max={4 }
                                    />
                                )}
                                </Form.Item>
                            </div>
                        </div>
                            </div>
                        </div>

                <hr/>
                        <div className="extra-info">
                            <div>
                                <h2>Подробнее о заявке</h2>
                            </div>
                            <div>
                                {/*<p>Предоставьте пассажирам больше информации о поездке.</p>*/}
                                <Form.Item label="Предоставьте попутчикам больше информации о заявке.">
                                {getFieldDecorator('description',{
                                    rules: [{required: true, message: 'Обязательное поле!'}],
                                })(
                                    <TextArea
                                        placeholder="Укажите, например:
                - место отправления и прибытия;
                - возможность взять багаж;
                "
                                        rows={4}/>
                                )}
                                </Form.Item>
                            </div>
                            <div><p>
                                <Icon type="exclamation-circle" /> Не указывайте здесь ваши контактные данные. Потенциальные попутчмки получат ваш номер телефона.
                            </p></div>
                        </div>

                        <div className="wrap-back-forward">
                            <div><Button type="primary"><Icon type="double-left" />Назад</Button></div>
                            <div id="forward"><Button type="primary" htmlType="submit">Закочить<Icon type="double-right" /></Button></div>
                        </div>
            </Form>
        );
    }
}

Second.propTypes = {
    onValuesSubmit: PropTypes.func,
};
const SecondStepForm = Form.create()(Second);
export default SecondStepForm;