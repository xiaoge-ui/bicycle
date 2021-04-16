import React, { Component } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';

export default class Line extends Component {

    componentWillMount() {
        echarts.registerTheme('my_theme', echartTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: "用户骑行量"
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        return option
    }

    getOption3 = () => {
        let option = {
            title: {
                text: "用户骑行量"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return option
    }


    render() {
        return (
            <div>
                <Card title="折线图一">
                    <ReactECharts option={this.getOption()} theme='my_theme' style={{ height: 500 }} />
                </Card>
                <Card title="折线图二" style={{ margin: "10px 0" }}>
                    <ReactECharts option={this.getOption2()} theme='my_theme' style={{ height: 500 }} />
                </Card>
                <Card title="折线图三" style={{ margin: "10px 0" }}>
                    <ReactECharts option={this.getOption3()} theme='my_theme' style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
