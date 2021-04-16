import React, { Component } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import echartTheme from './../echartTheme';

export default class Bars extends Component {

    componentWillMount() {
        echarts.registerTheme('my_theme', echartTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行单量',
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar'
            }]
        };

        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行单量比较',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    data: ['2012', '2013', '2014', '2015', '2016']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Forest',
                    type: 'bar',
                    barGap: 0,
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: 'Steppe',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: 'Desert',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: 'Wetland',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [98, 77, 101, 99, 40]
                }
            ]
        }
        return option
    }


    render() {
        return (
            <div>
                <Card title="柱形图一">
                    <ReactECharts option={this.getOption()} theme='my_theme' style={{ height: 500 }} />
                </Card>
                <Card title="柱形图二" style={{ margin: "10px 0" }}>
                    <ReactECharts option={this.getOption2()} theme='my_theme' style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
