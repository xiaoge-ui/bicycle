import React, { Component } from 'react'
import { Table } from 'antd';

export default class BaseTable extends Component {
    render() {
        return (
            <div>
                {this.requestTable()}
            </div>
        )
    }

    requestTable = () => {
        let { selectedRowKeys } = this.props;
        let row_Select = this.props.rowSelection;
        let rowSelection = {
            type: "radio",
            selectedRowKeys,
        }

        if (row_Select === false && row_Select === null) {
            row_Select = false;
        } else if (row_Select === "checkbox") {
            rowSelection.type = "checkbox";
        }

        return (
            <Table
                bordered
                {...this.props}
                rowSelection={row_Select ? rowSelection : null}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        }
                    };
                }}
            />
        )
    }

    onRowClick = (record, index) => {
        let rowSelection = this.props.rowSelection

        if (rowSelection === "radio") {
            let selectedRowKeys = [index];
            let selectedItem = record;
            this.props.updateTableValue(selectedRowKeys, selectedItem)
        } else if (rowSelection === "checkbox") {
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds) {
                let i = selectedIds.indexOf(record.key);
                if (i === -1) {
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                    selectedIds.push(record.key);
                } else {
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                    selectedIds.splice(i, 1);
                }
            } else {
                selectedRowKeys = [index];
                selectedItem = [record];
                selectedIds = [record.key];
            }
            this.props.updateTableValue(selectedRowKeys, selectedItem, selectedIds)
        }
    }
}
