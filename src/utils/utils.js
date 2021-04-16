import { Select } from 'antd';
const Option = Select.Option;
//eslint-disable-next-line
export default {
    getDate(data) {
        let time = new Date(data);
        let month, date, hour, minutes, seconds;
        if ((time.getMonth() + 1) < 10) {
            month = "0" + (time.getMonth() + 1);
        } else {
            month = time.getMonth() + 1;
        }

        if (time.getDate() < 10) {
            date = "0" + time.getDate();
        } else {
            date = time.getDate();
        }

        if (time.getHours() < 10) {
            hour = "0" + time.getHours();
        } else {
            hour = time.getHours();
        }


        if (time.getMinutes() < 10) {
            minutes = "0" + time.getMinutes();
        } else {
            minutes = time.getMinutes();
        }


        if (time.getSeconds() < 10) {
            seconds = "0" + time.getSeconds();
        } else {
            seconds = time.getSeconds();
        }

        return time.getFullYear() + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;
    },
    //获取选中的数据
    updateTableValue(key, index, index1) {
        console.log("aaaa", this);
        if (index1) {
            this.setState({
                selectedRowKeys: key,
                selectedItem: index,
                selectedIds: index1,
            });
        } else {
            this.setState({
                selectedRowKeys: key,
                selectedItem: index
            });
        }
    },

    //表格分页
    pageState(data, callback) {
        return {
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showQuickJumper: true,
            showTotal: () => {
                return `共有${data.total}条`
            },
            onChange: (current) => {
                return callback(current)
            }
        }

    },

    //获取下拉框的数据
    getOptions(item) {
        if (!item) {
            return [];
        }
        let OptionValue = [];
        item.map(value => {
            return (
                OptionValue.push(<Option value={value.id} key={value.id}>{value.value}</Option>)
            )
        });
        return OptionValue;
    }
}