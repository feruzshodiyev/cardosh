import React, {Component} from 'react';
import {Button, Input, Select} from "antd";
import './PhoneNum.scss'
import {Link} from "react-router-dom";

const {Option} = Select;


class PhoneNum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valPhone: '',
            tmp: "",
            selectVal: '90',
            readyPhoneNum: '',
            showBtn: false
        };
    }


    handleNumChange = e => {
        const re = /^[0-9\b]+$/;
        const value = e.target.value;



        if ((value === '' || re.test(value)) && value.length <= 7) {

            this.setState({
                valPhone: e.target.value,
            });
            if (value.length === 7) {
                this.setState({
                    readyPhoneNum: "+998" + this.state.selectVal + value
                }, () => this.setState({
                    showBtn: true
                }))
            } else {
                this.setState({
                    showBtn: false
                })
            }
        }
    };

    handleConfirm = () => {
        this.props.getNum(this.state.readyPhoneNum)
    };

    handleSelectChange = value => {
        console.log(value);
        this.setState({
            selectVal: value,
        });
        if (this.state.valPhone.length === 7) {
            this.setState({
                readyPhoneNum: "+998" + value + this.state.valPhone
            }, () => this.setState({
                showBtn: true
            }));
        } else {
            this.setState({
                showBtn: false
            })
        }

    };

    render() {
        const SelectBefore = (
            <Select className="select" onChange={this.handleSelectChange} value={this.state.selectVal}
                    style={{width: 80}}>
                <Option value="90">90</Option>
                <Option value="91">91</Option>
                <Option value="93">93</Option>
                <Option value="94">94</Option>
                <Option value="97">97</Option>
                <Option value="98">98</Option>
                <Option value="99">99</Option>
            </Select>
        );
        return (
            <div className="wrap-confirm">
                <h1>Введите ваш номер телефона</h1>
                <div>
                    <div className="prefix"><p>+998</p></div>
                    <div>
                        <Input
                            type="text"
                            className="input-confirm"
                            addonBefore={SelectBefore}
                            autoFocus={true}
                            value={this.state.valPhone}
                            onChange={this.handleNumChange}
                        />
                    </div>
                </div>
                {this.state.showBtn ? <Button className="btn-phone" onClick={this.handleConfirm}><Link
                    to='/register/name'>Далее</Link></Button> : ""}
            </div>
        );
    }
}

export default PhoneNum;