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
                                <div>
                                    <p>Отправление:   Завтра - 17:00</p>
                                    <p>Расстоярие:    100км</p>
                                    <p>Время в путиЖ  16 ч 20 м</p>

                                </div>
                                <div>
                                <p><Icon type="down-circle"/>{this.props.origin} </p>
                                <p><Icon type="environment"/>{this.props.destination}</p>
                                </div>
                            </div>
                            <div className="price">
                                <div>
                                    {getFieldDecorator('price',{
                                        initialValue: 5000
                                    })(
                                        <InputNumber
                                            size="large"
                                            min={0}
                                            max={200000}
                                            step={5000}
                                            autoFocus={true}
                                        />
                                    )}

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
                                {getFieldDecorator('seats',{
                                    initialValue: 3
                                })(
                                    <InputNumber
                                        min={1} max={7}
                                    />
                                )}

                            </div>
                        </div>
                        <hr/>
                        <div className="extra-info">
                            <div>
                                <h2>Подробнее о поездке</h2>
                            </div>
                            <div>
                                <p>Предоставьте пассажирам больше информации о поездке.</p>
                                {getFieldDecorator('extra_info')(
                                    <TextArea
                                        placeholder="Укажите, например:
                - место отправления и прибытия;
                - возможность взять багаж;
                - количество пассажиров;
                - правила поведение в вашем автомобиле."
                                        rows={4}/>
                                )}

                            </div>
                            <div><p>
                                <Icon type="exclamation-circle" /> Не указывайте здесь ваши контактные данные. Потенциальные пассажиры получат ваш номер телефона.
                            </p></div>
                        </div>

                        <div className="wrap-back-forward">
                            <div><Button type="primary"><Icon type="double-left" />Назад</Button></div>
                            <div id="forward"><Button type="primary" htmlType="submit">Продлжить<Icon type="double-right" /></Button></div>
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