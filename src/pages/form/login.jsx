import React, { Component } from 'react';
import { Card, Form, Input, Button, Icon, Checkbox } from 'antd';

const FormItem = Form.Item;
class Login extends Component {
    render() {
        let { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title="内联登录栏">
                    <Form layout="inline">
                        <FormItem>
                            {
                                getFieldDecorator("user_name")(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="userName"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator("user_pwd")(
                                    <Input
                                        type="password"
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="userPwd"
                                    />
                                )
                            }
                        </FormItem>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                登录
                            </Button>
                            <Button htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录登录的行内表单" style={{ margin: "10px 0" }}>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: 300 }}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="https://3x.ant.design/components/form-cn/" style={{ float: "right" }}>
                                Forgot password
                            </a>
                            <Button style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="https://3x.ant.design/components/form-cn/">register now!</a>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.form);
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log('Received value of form: ', value);
            } else {
                console.log(value);
            }
        })
    }
}

export default Form.create()(Login);