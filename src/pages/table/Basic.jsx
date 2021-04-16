import React, { Component } from 'react';
import { Card } from 'antd';
import Axios from './../../axios'
import BaseTable from '../../component/BaseTable';
import Utils from './../../utils/utils';

export default class Basic extends Component {

    state = {
        dataSource: [],
        selectedRowKeys: [],
        selectedItem: [],
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
            },
            {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }
        ]
        return (
            <div>
                <Card title="基本表格">
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        rowSelection={null}
                    />
                </Card>

                <Card title="带单选按钮的表格" style={{ margin: "10px 0" }}>
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        rowSelection="radio"
                    />
                </Card>

                <Card title="带复选框按钮的表格">
                    <BaseTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                        updateTableValue={Utils.updateTableValue.bind(this)}
                        rowSelection="checkbox"
                    />
                </Card>
            </div>
        )
    }

    componentDidMount() {
        this.request();
    }

    //动态表格请求数据
    request = () => {
        Axios.ajax({
            url: "/table/list",
            data: {
                params: {
                    page: 1
                }
            }
        }).then(res => {
            this.setState({ dataSource: res.data.result.list });
        })
    }

}
