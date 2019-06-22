import React, {Component} from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    AutoComplete,
} from 'antd';
import axios from "axios"

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const ForTestApi = Form.create()(
class  extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://api.cardosh.uz/v1/restapi/user/create/', values, {
                    headers:{
                        'Content-Type': 'application/json',
                    },
                }).then(() => {
                    this.handleGet();
                });
            }


        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleGet=()=> {

        axios.get('http://api.cardosh.uz/v1/restapi/user/all/', {
            headers:{
                'content-type': 'application/json',
            },

        }).then((data) => {
console.log(data)
        })
    };

    componentDidMount() {
        this.handleGet();
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <div style={{"padding-top" : "100px"}}>
                <Form style={{"width" : "50%"}} {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="First name">
                        {getFieldDecorator('first_name', {
                            rules: [

                                {
                                    required: true,
                                    message: 'Please input your First name!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>  <Form.Item label="Last name">
                        {getFieldDecorator('last_name', {
                            rules: [

                                {required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>  <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [

                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>





                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>



                </Form>

            </div>
        );
    }
}
);




export default ForTestApi;