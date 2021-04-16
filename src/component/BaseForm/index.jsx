import React, { Component } from 'react';
import { Form, Button, Select, DatePicker, Input } from 'antd';
import Utils from './../../utils/utils';

class BaseForm extends Component {
    getFormRequest = () => {
        let { formItem } = this.props;
        let { getFieldDecorator } = this.props.form;
        let formItemList = [];
        if (formItem && formItem.length > 0) {
            formItem.forEach((item, index) => {
                if (item.type === "SELECT") {
                    const SELECT_LIST = <Form.Item
                        label={item.label}
                        key={index}
                    >
                        {
                            getFieldDecorator(item.name, {
                                initialValue: "全部"
                            })(
                                <Select style={{ width: 120 }}>
                                    {Utils.getOptions(item.list)}
                                </Select>
                            )
                        }
                    </Form.Item>
                    formItemList.push(SELECT_LIST)
                } else if (item.type === "时间控件") {
                    let DatePick = <Form.Item
                        label="开始时间"
                        key="time"
                    >
                        {
                            getFieldDecorator("time")(
                                <DatePicker />
                            )
                        }
                    </Form.Item>

                    formItemList.push(DatePick);

                    let DatePick1 = <Form.Item
                        label="~"
                        colon={false}
                        key="time1"
                    >
                        {
                            getFieldDecorator("time")(
                                <DatePicker />
                            )
                        }
                    </Form.Item>

                    formItemList.push(DatePick1);
                } else if (item.type === "INPUT") {
                    let INPUT = <Form.Item
                        label={item.label}
                        key={index}
                    >
                        {
                            getFieldDecorator(item.name)(
                                <Input />
                            )
                        }
                    </Form.Item>
                    formItemList.push(INPUT)
                } else if (item.type === "DATAPICKS") {
                    let DATAPICKS = <Form.Item
                        label={item.label}
                        key={index}
                    >
                        {
                            getFieldDecorator("time")(
                                <DatePicker />
                            )
                        }
                    </Form.Item>

                    formItemList.push(DATAPICKS);
                }
            });
        }

        return formItemList;
    }
    render() {
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    {this.getFormRequest()}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ margin: "0 10px" }}>查询</Button>
                        <Button type="primary" onClick={this.haddleClear}>重置</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.getFormValue(values);
            }
        });
    }

    haddleClear = () => {
        this.props.form.resetFields();
    }
}

export default Form.create()(BaseForm)
