import React, { Component } from 'react';
import { message, Card, Button } from 'antd';

export default class Messages extends Component {

    haddleMessage = (type) => {
        message[type](`this is ${type} page`)
    }
    render() {
        return (
            <div>
                <Card title="基本提示框">
                    <Button type="primary" onClick={() => this.haddleMessage("success")}>Success</Button>
                    <Button type="error" onClick={() => this.haddleMessage("error")} style={{ margin: "0 10px" }}>Error</Button>
                    <Button type="dashed" onClick={() => this.haddleMessage("warning")}>Warning</Button>
                    <Button onClick={() => this.haddleMessage("info")} style={{ margin: "0 10px" }}>Info</Button>
                </Card>
            </div>
        )
    }
}
