import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';

export default class Modals extends Component {
    state = {
        visible: false,
        isVisible: false,
        modal1Visible: false,
    }

    haddleOk = () => {
        this.setState({ visible: true });
    }
    haddleOk1 = () => {
        this.setState({ isVisible: true });
    }

    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
    }
    render() {
        return (
            <div>
                <Card title="基本模态框">
                    <Button type="primary" onClick={this.haddleOk}>打开模态框</Button>
                    <Button type="primary" onClick={this.haddleOk1} style={{ margin: "0px 10px" }}
                    >打开第二个模态框</Button>
                    <Button type="primary" onClick={() => this.setModal1Visible(true)}>
                        Display a modal dialog at 20px to Top
                    </Button>
                    <Modal
                        title="第一个模态框"
                        visible={this.state.visible}
                        onOk={() => this.setState({ visible: false })}
                        onCancel={() => this.setState({ visible: false })}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                    <Modal
                        title="第二个模态框"
                        visible={this.state.isVisible}
                        onCancel={() => this.setState({ isVisible: false })}
                        footer={null}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                    <Modal
                        title="20px to Top"
                        style={{ top: 20 }}
                        visible={this.state.modal1Visible}
                        onOk={() => this.setModal1Visible(false)}
                        onCancel={() => this.setModal1Visible(false)}
                    >
                        <p>some contents...</p>
                        <p>some contents...</p>
                        <p>some contents...</p>
                    </Modal>
                </Card>

                <Card title="弹出式模态框">
                    <Button onClick={() => this.haddleChange("info")}>Info</Button>
                    <Button type="primary" onClick={() => this.haddleChange("success")} style={{ margin: "0 10px" }}>Success</Button>
                    <Button onClick={() => this.haddleChange("error")}>Error</Button>
                    <Button onClick={() => this.haddleChange("warning")} style={{ marginLeft: 10 }}>Warning</Button>
                </Card>
            </div >
        )
    }

    haddleChange = (type) => {
        Modal[type]({
            title: 'This is a notification message',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
        })
    }
}
