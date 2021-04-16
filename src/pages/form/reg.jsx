import React, { Component } from 'react';
import { Card, Button, Form, Input, Checkbox, Radio, Switch, InputNumber, Select, DatePicker, Upload, Icon, Modal } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class Reg extends Component {

    state = {
        value: 1,
        fileList: [],
        previewVisible: false,
        previewImage: '',
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        let { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12, },
        };
        return (
            <div>
                <Card title="注册表单">
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <FormItem label="用户名">
                            {
                                getFieldDecorator("user_name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入用户名"
                                        }
                                    ]
                                })(
                                    <Input />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码">
                            {
                                getFieldDecorator("user_pwd", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入密码"
                                        }
                                    ]
                                })(
                                    <Input type="password" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别">
                            {
                                getFieldDecorator("user_sex", {
                                    initialValue: 1
                                })(
                                    <Radio.Group onChange={this.onChange1} >
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚">
                            {
                                getFieldDecorator("marriage", {
                                    valuePropName: "checked",
                                })(
                                    <Switch onChange={this.onChange2} />
                                )
                            }
                        </FormItem>

                        <FormItem label="年龄">
                            {
                                getFieldDecorator("user_age", {
                                    initialValue: 18
                                })(
                                    <InputNumber min={18} max={25} onChange={this.onChange3} />
                                )
                            }
                        </FormItem>

                        <FormItem label="权限等级">
                            {
                                getFieldDecorator("permissions", {
                                    initialValue: 2
                                })(
                                    <Select onChange={this.handleChange} >
                                        <Option value={1}>VIP1</Option>
                                        <Option value={2}>VIP2</Option>
                                        <Option value={7}>VIP7</Option>
                                        <Option value={8}>VIP8</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="爱好">
                            {
                                getFieldDecorator("enjoy", {
                                    initialValue: [2, 5]
                                })(
                                    <Select mode="multiple" onChange={this.handleChange} >
                                        <Option value={1}>踢足球</Option>
                                        <Option value={2}>打乒乓球</Option>
                                        <Option value={3}>打羽毛球</Option>
                                        <Option value={4}>吃鸡</Option>
                                        <Option value={5}>看看书</Option>
                                        <Option value={6}>跑步</Option>
                                        <Option value={7}>打篮球</Option>
                                        <Option value={8}>王者荣耀</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="生日">
                            {
                                getFieldDecorator("birthday")(
                                    <DatePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址">
                            {
                                getFieldDecorator("address")(
                                    <TextArea rows={4} />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像">
                            {
                                getFieldDecorator("pic")(
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={this.state.fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange2}
                                    >
                                        <div>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">Upload</div>
                                        </div>
                                    </Upload>
                                )
                            }
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                            </Modal>
                        </FormItem>

                        <Form.Item wrapperCol={{ offset: 5 }}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>我已经阅读过</Checkbox>)}
                            <a className="login-form-forgot" href="http://www.baidu.com">
                                《小可爱家法》
                            </a>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 5 }}>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        )
    }
    //单选按钮
    onChange1 = (e) => {
        this.setState({ value: e.target.value });
    }

    //是否已婚
    onChange2 = (checked) => {
        console.log(checked);
    }
    //年龄
    onChange3 = (value) => {
        console.log(value);
    }
    //权限等级
    handleChange = (value) => {
        console.log(value);
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange2 = ({ fileList }) => this.setState({ fileList });
}

export default Form.create()(Reg);
