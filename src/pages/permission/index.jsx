import React, { Component } from 'react';
import { Card, Button, Modal, Form, Input, Select, message, Tree } from 'antd';
import BaseTable from './../../component/BaseTable';
import Utils from './../../utils/utils';
import Axios from './../../axios';
import menuConfig from './../../config/menuconfig1';

const Option = Select.Option;
const { TreeNode } = Tree;
export default class Permission extends Component {

    state = {
        visible: false,
        isVisible: false,
    }
    params = {
        page: 1
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'role_id',
                key: 'role_id',
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                key: 'role_name',
                render: (status) => {
                    return {
                        1: "客服专员",
                        2: "财务专员",
                        3: "管理人员",
                        4: "市场专员",
                        5: "产品经理"
                    }[status]
                }
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: (status) => {
                    return Utils.getDate(status)
                }
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                key: 'status',
                render: (status) => {
                    return status === 1 ? "启用" : "禁止"
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorization_time',
                key: 'authorization_time',
            },
            {
                title: '授权人',
                dataIndex: 'authorization_person',
                key: 'authorization_person',
            },
        ]
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.haddleCreate}>创建角色</Button>
                    <Button type="primary" onClick={this.haddleJWT} style={{ margin: "0px 10px" }}>设置权限</Button>
                    <Button type="primary">用户权限</Button>
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
                <Modal
                    title="创建用户"
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    onOk={this.haddleOk}
                >
                    <FormItem wrappedComponentRef={(form) => this.form = form} />
                </Modal>

                <Modal
                    title="设置权限"
                    visible={this.state.isVisible}
                    onCancel={() => this.setState({ isVisible: false })}
                    onOk={this.haddleOk2}
                >
                    <FormItem2
                        wrappedComponentRef={(form) => this.form1 = form}
                        selectedItem={this.state.selectedItem}
                        menuInfo={this.state.menuInfo}
                        getMenuInfo={data => {
                            this.setState({ menuInfo: data });
                        }}
                    />
                </Modal>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }
    //获取表格数据
    request = () => {
        Axios.ajax({
            url: "https://mock.mengxuegu.com/mock/605592e20d58b864da03d1f8/mockapi/role/list",
            data: {
                params: this.params
            }
        }).then(res => {
            this.setState({
                dataSource: res.data.result.list, pagination: Utils.pageState(res.data.result, (current) => {
                    this.params.page = current;
                    this.request()
                })
            });
        })
    }

    //创建角色
    haddleCreate = () => {
        this.setState({ visible: true });
    }

    //获取表单的数据，传给后台
    haddleOk = () => {
        let formValue = this.form.props.form.getFieldsValue()
        Axios.ajax({
            url: "https://mock.mengxuegu.com/mock/605592e20d58b864da03d1f8/mockapi/role/success",
            data: {
                params: formValue
            }
        }).then(res => {
            this.setState({ visible: false }, () => {
                message.success(res.data.msg);
                this.request();
            });
        })
    }

    //设置权限
    haddleJWT = () => {
        let item = this.state.selectedItem;
        if (item) {
            this.setState({ isVisible: true, menuInfo: item.menus });
        } else {
            message.info(`请选择一条记录`)
        }
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
                    <Form.Item label="用户名">
                        {
                            getFieldDecorator("user_name")(
                                <Input placeholder="请输入用户名" />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="状态">
                        {
                            getFieldDecorator("status", {
                                initialValue: 1
                            })(
                                <Select>
                                    <Option value={1}>禁用</Option>
                                    <Option value={2}>启用</Option>
                                </Select>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

FormItem = Form.create()(FormItem)

class FormItem2 extends Component {
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
                    <Form.Item label="用户名">
                        {
                            getFieldDecorator("user_name")(
                                <Input placeholder={this.props.selectedItem.authorization_person || {}} disabled={true} />
                            )
                        }
                    </Form.Item>
                    <Form.Item label="状态">
                        {
                            getFieldDecorator("status", {
                                initialValue: 1
                            })(
                                <Select>
                                    <Option value={1}>禁用</Option>
                                    <Option value={2}>启用</Option>
                                </Select>
                            )
                        }
                    </Form.Item>

                    <Tree
                        checkable
                        defaultExpandAll
                        onCheck={this.onCheck}
                        checkedKeys={this.props.menuInfo}
                    >
                        <TreeNode title="平台权限" key="platform_all">
                            {this.renderTreeNodes(menuConfig)}
                        </TreeNode>
                    </Tree>
                </Form>
            </div>
        )
    }

    renderTreeNodes = (data) => {
        console.log(data);
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });
    }
    onCheck = checkedKeys => {
        this.props.getMenuInfo(checkedKeys);
    };
}

FormItem2 = Form.create()(FormItem2)
