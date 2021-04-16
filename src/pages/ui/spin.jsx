import React, { Component } from 'react';
import { Spin, Card, Icon, Alert } from 'antd';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
export default class Spins extends Component {

    state = {
        loading: true
    }
    render() {
        return (
            <div>
                <Card title="spin用法">
                    <Spin size="small" />
                    <Spin style={{ margin: "0 10px" }} />
                    <Spin size="large" />
                    <Spin indicator={antIcon} style={{ marginLeft: 10 }} />
                </Card>
                <Card title="内容遮罩" style={{ margin: "10px 0" }}>
                    <Spin tip="Loading...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                        />
                    </Spin>
                    <Spin spinning={this.state.loading} delay={500}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="success"
                        />
                    </Spin>

                    <Spin spinning={this.state.loading} delay={500}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                        />
                    </Spin>
                    <Spin spinning={this.state.loading} delay={500}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="error"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
