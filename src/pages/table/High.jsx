import React, { Component } from 'react';
import { Card, Table, } from 'antd';
import Axios from './../../axios';
import Utils from './../../utils/utils';

export default class High extends Component {

    state = {
        pagination: {}
    }
    params = {
        page: 1
    }
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
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ]

        const columns2 = [
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

        const columns3 = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 100,
                fixed: 'left',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
                width: 100,
                fixed: 'right',
            }
        ]
        return (
            <div>
                <Card title="排序表格">
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={this.state.pagination} />
                </Card>
                <Card title="表头固定" style={{ margin: "10px 0" }}>
                    <Table columns={columns2} dataSource={this.state.dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
                </Card>
                <Card title="列固定" style={{ margin: "10px 0" }}>
                    <Table columns={columns3} dataSource={this.state.dataSource} scroll={{ x: 1300 }} />
                </Card>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }

    request = () => {
        Axios.ajax({
            url: "/table/list",
            data: {
                params: this.params.page
            }
        }).then(res => {
            this.setState({
                dataSource: res.data.result.list, pagination: Utils.pageState(res.data.result, (current) => {
                    this.params.page = current;
                    this.request();
                })
            });
        })
    }
}
