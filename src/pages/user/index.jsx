import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker, message } from 'antd';
import Moment from 'moment'
import BaseForm from './../../component/BaseForm';
import BaseTable from './../../component/BaseTable';
import Utils from './../../utils/utils';
import Axios from './../../axios';

const Option = Select.Option
const { TextArea } = Input;
export default class Users extends Component {
    state = {
        visible: false,
    }
    params = {
        page: 1
    }
    formItem = [
        {
            type: "INPUT",
            label: "用户名",
            name: "user_name",
        },
        {
            type: "INPUT",
            label: "手机号",
            name: "user_phone"
        },
        {
            type: "DATAPICKS",
            label: "用户日期"
        }
    ]
    render() {
        const columns = [
            {
                title: '用户工号',
                dataIndex: 'user_id',
                key: 'user_id',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '性别',
                dataIndex: 'user_sex',
                key: 'user_sex',
            },

            {
                title: '年龄',
                dataIndex: 'user_age',
                key: 'user_age',

            },
            {
                title: '职位',
                dataIndex: 'status',
                key: 'status',
                render(status) {
                    return {
                        "1": "主管",
                        "2": "项目经理",
                        "3": "UI组长",
                        "4": "前端组长",
                        "5": "后端组长"
                    }[status]
                }
            },
            {
                title: '爱好',
                dataIndex: 'enjoy',
                key: 'enjoy',
                render(enjoy) {
                    return {
                        "1": "打乒乓球",
                        "2": "中国象棋",
                        "3": "王者",
                        "4": "吃鸡",
                        "5": "打篮球",
                        "6": "踢足球"
                    }[enjoy]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                key: 'address',
            }
        ]
        let footer = {};
        if (this.state.type === "detail") {
            footer = {
                footer: null
            }
        }
        return (
            <div>
                <Card>
                    <BaseForm formItem={this.formItem} getFormValue={this.getFormValue} />
                </Card>
                <Card>
                    <Button type="primary" icon="plus" onClick={() => this.haddleClick("create")}>创建员工</Button>
                    <Button type="primary" icon="edit" style={{ margin: "0 10px" }} onClick={() => this.haddleClick("edit")}>编辑员工</Button>
                    <Button type="primary" onClick={() => this.haddleClick("detail")}>员工详情</Button>
                    <Button type="danger" icon="delete" style={{ margin: "0 10px" }} onClick={() => this.haddleClick("delete")}>删除员工</Button>
                </Card>
                <div style={{ background: "#fff" }}>
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={this.state.pagination}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        rowSelection="radio"
                    />
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onCancel={() => { this.form.props.form.resetFields(); this.setState({ visible: false, formInfo: "" }) }}
                    onOk={this.haddleOk}
                    {...footer}
                >
                    <FormItem
                        wrappedComponentRef={(form) => this.form = form}
                        formInfo={this.state.formInfo}
                        type={this.state.type}
                    />
                </Modal>
            </div >
        )
    }

    componentDidMount() {
        this.request();
    }

    //获取表单数据
    request = () => {
        Axios.ajax({
            url: "https://mock.mengxuegu.com/mock/605592e20d58b864da03d1f8/mockapi/user/list",
            data: {
                params: this.params
            }
        }).then(res => {
            this.setState({ dataSource: res.data.result.list });
        })
    }
    //Button按钮的单击事件
    haddleClick = (type) => {
        if (type === "create") {
            this.setState(
                {
                    visible: true,
                    type,
                    title: "创建员工"
                }
            );
        } else if (type === "edit" || type === "detail") {
            let item = this.state.selectedItem;
            if (!item) {
                message.info(`请选择一条数据`)
            } else {
                this.setState(
                    {
                        visible: true,
                        formInfo: this.state.selectedItem,
                        type,
                        title: type === "edit" ? "员工编辑" : "员工详情"
                    }
                );
            }
        } else if (type === "delete") {
            let item = this.state.selectedItem;
            if (!item) {
                message.info(`请选择一条数据`)
            } else {
                Modal.info({
                    title: "删除员工",
                    content: `确定要删除id为${item.user_id}`,
                    onOk: () => {
                        this.request();
                    }
                })
            }
        }
    }
    //模态框中确认按钮的单击事件
    haddleOk = () => {
        console.log(this.form.props.form.getFieldsValue())
        this.setState({ visible: false }, () => {
            this.request();
        });
    }
}


class FormItem extends Component {
    render() {
        let { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            },
        };
        const { type, formInfo } = this.props;
        let formInfo1 = formInfo || {};
        console.log(this.props.formInfo)
        return (
            <div>
                <Form {...formItemLayout}>
                    <Form.Item
                        label="姓名"

                    >
                        {
                            formInfo1 && type === "detail" ? formInfo.user_name :
                                getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                    initialValue: formInfo.user_name
                                })(
                                    <Input
                                        placeholder="Username"
                                    />,
                                )
                        }
                    </Form.Item>

                    <Form.Item
                        label="性别"
                    >
                        {
                            formInfo1 && type === "detail" ? formInfo.user_sex === "男" ? "男" : "女" :
                                getFieldDecorator('user_sex', {
                                    rules: [{ required: true, message: 'Please input your user_sex!' }],
                                    initialValue: formInfo.user_sex
                                })(
                                    <Radio.Group >
                                        <Radio value="男">男</Radio>
                                        <Radio value="女">女</Radio>
                                    </Radio.Group>
                                )}
                    </Form.Item>

                    <Form.Item
                        label="状态"
                    >
                        {
                            formInfo1 && type === "detail" ? formInfo.status :
                                getFieldDecorator('status', {
                                    rules: [{ required: true, message: 'Please input your status' }],
                                    initialValue: formInfo.status
                                })(
                                    <Select>
                                        <Option value={1}>前端组长</Option>
                                        <Option value={2}>项目组组长</Option>
                                        <Option value={3}>UI组长</Option>
                                        <Option value={4}>后端组长</Option>
                                    </Select>
                                )}
                    </Form.Item>

                    <Form.Item
                        label="生日"
                    >
                        {formInfo1 && type === "detail" ? formInfo.birthday :
                            getFieldDecorator('birthday', {
                                rules: [{ required: true, message: 'Please input your birthday' }],
                                initialValue: Moment(formInfo.birthday)
                            })(
                                <DatePicker />
                            )}
                    </Form.Item>

                    <Form.Item
                        label="联系地址"
                    >
                        {formInfo1 && type === "detail" ? formInfo.address :
                            getFieldDecorator('address', {
                                rules: [{ required: true, message: 'Please input your address' }],
                                initialValue: formInfo.address
                            })(
                                <TextArea rows={4} />
                            )}
                    </Form.Item>
                </Form>
            </div >
        )
    }
}
FormItem = Form.create()(FormItem)