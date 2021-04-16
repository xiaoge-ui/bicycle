import React, { Component } from 'react'
import './index.less'

export default class Content extends Component {
    render() {
        return (
            <div className="content1">
                <h1>
                    欢迎<span style={{ color: "#f00" }}>小可爱，来啦</span>进入单车系统
                </h1>
            </div>
        )
    }
}
