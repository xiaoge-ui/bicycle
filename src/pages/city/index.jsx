import React, { Component } from 'react';
import { Card, Button, Form, Modal, Select, message } from 'antd';
import BaseForm from './../../component/BaseForm';
import BaseTable from './../../component/BaseTable';
import Utils from './../../utils/utils';
import Axios from './../../axios';

const Option = Select.Option;
export default class City extends Component {
    state = {
        visible: false,
    }
    params = {
        page: 1
    }

    formItem = [
        {
            type: "SELECT",
            label: "城市",
            name: "city_select",
            placeholder: "全部",
            list: [{ id: 0, value: "全部" }, { id: 1, value: "河北省" }, { id: 2, value: "北京市" }, { id: 3, value: "天津市" }]
        },
        {
            type: "SELECT",
            label: "停车模式",
            name: "parking_mode",
            placeholder: "全部",
            list: [{ id: 0, value: "全部" }, { id: 1, value: "指定点停车模式" }, { id: 2, value: "禁停区模式" }]
        },
        {
            type: "SELECT",
            label: "加盟商授权状态",
            name: "operation_mode",
            placeholder: "全部",
            list: [{ id: 0, value: "全部" }, { id: 1, value: "进行中" }, { id: 2, value: "已完成" }]
        }

    ]
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ]
        return (
            <div>
                <Card>
                    <BaseForm formItem={this.formItem} getFormValue={this.getFormValue} />
                </Card>
                <Card style={{ margin: "10px 0" }}>
                    <Button type="primary" onClick={() => this.setState({ visible: true })}>开通城市</Button>
                    <Modal
                        title="开通城市"
                        visible={this.state.visible}
                        onCancel={() => this.setState({ visible: false })}
                        onOk={this.haddleOnOk}
                    >
                        <FormItem wrappedComponentRef={(form) => this.form = form} />
                    </Modal>
                </Card>

                <div style={{ background: "#fff" }}>
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        rowSelection={null}
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }
    //获取表格数据
    request = () => {
        Axios.ajax({
            url: "/table/list",
            data: {
                params: this.params.page
            }
        }).then(res => {
            if (res.data.success === "ok") {
                this.setState({
                    dataSource: res.data.result.list, pagination: Utils.pageState(res.data.result, (current) => {
                        this.params.page = current;
                        this.request();
                    })
                });
            }
        })
    }
    //往后台传送数据
    haddleOnOk = () => {
        let formValue = this.form.props.form.getFieldsValue()
        if (formValue.city_select === undefined || formValue.operation_mode === undefined || formValue.parking_mode === undefined) {
            message.info("请把信息填写完整")
            return;
        }
        Axios.ajax({
            url: "/table/success",
            data: {
                params: formValue
            },
        }).then(res => {
            if (res.data.success === "ok") {
                this.setState({ visible: false }, () => {
                    message.success(res.data.msg);
                    this.request();
                });
            }
        })
    }

    getFormValue = (value) => {
        Axios.ajax({
            url: "/table/success",
            data: {
                params: value
            },
        }).then(res => {
            if (res.data.success === "ok") {
                this.setState({ visible: false }, () => {
                    message.success(res.data.msg);
                    this.request();
                });
            }
        })
    }
}


class FormItem extends Component {
    render() {
        let { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 19
            },
        };
        return (
            <div>
                <Form {...formItemLayout}>
                    <Form.Item
                        label="选择城市"
                    >
                        {
                            getFieldDecorator("city_select", {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择城市',
                                    },
                                ]
                            })(
                                <Select placeholder="请选择城市">
                                    <Option value={1}>河北省</Option>
                                    <Option value={2}>北京市</Option>
                                    <Option value={3}>天津市</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        label="运营模式"
                    >
                        {
                            getFieldDecorator("operation_mode", {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择运营模式',
                                    },
                                ]
                            })(
                                <Select placeholder="请选择运营模式">
                                    <Option value={1}>自营</Option>
                                    <Option value={2}>加盟</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        label="用车模式"
                    >
                        {
                            getFieldDecorator("parking_mode", {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择用车模式',
                                    },
                                ]
                            })(
                                <Select placeholder="请选择用车模式">
                                    <Option value={1}>指定点停车模式</Option>
                                    <Option value={2}>禁停区模式</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                </Form>
            </div >
        )
    }
}

FormItem = Form.create()(FormItem)

