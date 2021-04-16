import React, { Component } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import Utils from './../../utils/utils';
import './index.less';

export default class Header extends Component {

    state = {

    }
    render() {
        return (
            <div className="header">
                <Row>
                    <Col span={24} className="header-top">
                        <span>欢迎小可爱，来啦</span>
                        <a href="http://www.baidu.com">退出</a>
                    </Col>
                </Row>
                <Row className="header-bottom">
                    <Col span={5} className="header-bottom-left">
                        <h3>首页</h3>
                        <span></span>
                    </Col>
                    <Col span={19} className="header-bottom-right">
                        <span>{this.state.date}</span>
                        <img src={`color-256/${this.state.picUrl}.png`} alt="" />
                        <span>{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.getWeather();
        //获取当前的时间
        let date = Utils.getDate(new Date().getTime());
        setInterval(() => {
            let date = Utils.getDate(new Date().getTime())
            this.setState({ date });
        }, 1000);
        this.setState({ date });

    }

    getWeather = () => {
        axios.get("https://devapi.qweather.com/v7/weather/now?location=101010100&key=edfbb55fa73b442293d860de43adcdae").then(res => {
            if (res.data.code === "200") {
                this.setState(
                    {
                        weather: res.data.now.text,
                        picUrl: res.data.now.icon
                    }
                );
            }
        })
    }
}
