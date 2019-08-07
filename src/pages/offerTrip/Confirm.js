import React, {Component} from 'react';
import {Input, Select} from "antd";
import './Confirm.scss'

const {Option} = Select;

class Confirm extends Component {

    handleNumChange = e => {
        console.log(e.target.value);
    };

    render() {
        const SelectBefore = (
            <Select defaultValue="90" style={{width: 80}}>
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
                        <Input className="input-confirm" addonBefore={SelectBefore} autoFocus={true}
                               onChange={value=>this.handleNumChange(value)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirm;