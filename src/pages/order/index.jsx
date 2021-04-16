import React, { Component } from 'react';
import { Card, Button, message, Modal, Form } from 'antd';
import BaseForm from './../../component/BaseForm';
import Axios from './../../axios';
import Utils from './../../utils/utils';
import BaseTable from './../../component/BaseTable';

export default class Order extends Component {
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
            type: "时间控件",
        },
        {
            type: "SELECT",
            label: "订单管理",
            name: "order_message",
            placeholder: "全部",
            list: [{ id: 0, value: "全部" }, { id: 1, value: "进行中" }, { id: 2, value: "已完成" }]
        }
    ]
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_id',
                key: 'order_id',
            },
            {
                title: '车辆编号',
                dataIndex: 'vehicle_number',
                key: 'vehicle_number',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '里程',
                dataIndex: 'mileage',
                key: 'mileage',
                render(value) {
                    return value / 1000 + "Km"
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'driving_time',
                key: 'driving_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',

            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'order_amount',
                key: 'order_amount',

            },
            {
                title: '实付金额',
                dataIndex: 'user_paid',
                key: 'user_paid',
            },
        ];
        return (
            <div>
                <Card>
                    <BaseForm formItem={this.formItem} getFormValue={this.getFormValue} />
                </Card>
                <Card style={{ margin: "10px 0 0 0" }}>
                    <Button type="primary" style={{ margin: "0 10px" }} onClick={this.haddleOk}>订单详情</Button>
                    <Button type="primary" onClick={this.haddleVisible}>结束订单</Button>
                    <Modal
                        title="结束订单"
                        visible={this.state.visible}
                        onOk={this.haddleCancel}
                        onCancel={() => this.setState({ visible: false })}
                    >
                        <Form
                            labelCol={{ span: 5 }}
                            wrapperCol={{ span: 19 }}
                        >
                            <Form.Item label="车辆编号">
                                AWID125894
                            </Form.Item>
                            <Form.Item label="剩余电量">
                                {98 + "%"}
                            </Form.Item>
                            <Form.Item label="行程开始时间">
                                {2 + "Km"}
                            </Form.Item>
                            <Form.Item label="车辆编号">
                                ASFWE781564
                            </Form.Item>
                        </Form>
                    </Modal>
                </Card>
                <div style={{ background: "#fff" }}>
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        rowSelection="radio"
                    />
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }

    haddleVisible = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择一条信息来结束订单"
            })
            return;
        }
        Axios.ajax({
            url: "/order/list",
            data: {
                params: {
                    order_id: item.order_id,
                }
            }
        }).then(res => {
            this.setState({
                visible: true,
                formInfo: res.data.result,
            });
        })
    }
    //获取表格数据
    request = () => {
        Axios.ajax({
            url: "/order/list",
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

    //结束订单
    haddleCancel = () => {
        let selectedItem = this.state.selectedItem;

        Axios.ajax({
            url: "/table/success",
            data: {
                params: {
                    order_id: selectedItem.order_id
                }
            }
        }).then(res => {
            if (res.data.success === "ok") {
                this.setState({ visible: false }, () => {
                    this.request();
                    message.success(res.data.msg);
                });
            }
        })
    }

    //点击订单详情
    haddleOk = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: "提示信息",
                content: "请选择一条信息来查看订单"
            })
            return;
        }
        window.open(`#/common/detail/order/${item.order_id}`, "_blank")
    }
}
