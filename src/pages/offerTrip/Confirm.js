import React, {Component} from 'react';
import {Button, Input, Select} from "antd";
import './Confirm.scss'

const {Option} = Select;

class Confirm extends Component {
    constructor(props){
        super(props);
        this.state = {
            valPhone: '',
            selectVal: '90',
            readyPhoneNum: ''
        };
    }

    handleNumChange = e => {
        const re = /^[0-9\b]+$/;
        if ((e.target.value === '' || re.test(e.target.value))&&e.target.value.length<=7) {
            this.setState({
                valPhone: e.target.value,
            });
            if (e.target.value.length===7){
                this.setState({
                    readyPhoneNum:"+998"+this.state.selectVal+e.target.value
                },() =>this.props.getNum(this.state.readyPhoneNum))
            }
        }
    };

    handleConfirm=()=>{
      this.props.onConfirm();
    };

    handleSelectChange=value=>{
        console.log(value);
        this.setState({
            selectVal: value,
        });
        if (this.state.valPhone.length===7){
            this.setState({
                readyPhoneNum:"+998"+value+this.state.valPhone
            },() =>this.props.getNum(this.state.readyPhoneNum));
        }

    };

    render() {
        const SelectBefore = (
            <Select onChange={this.handleSelectChange} value={this.state.selectVal} style={{width: 80}}>
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
                <h1>Подтверждите ваш номер!</h1>
                <div>
                    <div><p>+998</p></div>
                    <div>
                        <Input
                            type="text"
                            className="input-confirm"
                            addonBefore={SelectBefore}
                            autoFocus={true}
                            value={this.state.valPhone}
                            onChange={this.handleNumChange}/>
                    </div>
                </div>
                <div><Button onClick={this.handleConfirm}>Confirm</Button></div>
            </div>
        );
    }
}

export default Confirm;