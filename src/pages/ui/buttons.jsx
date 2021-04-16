import React, { Component } from 'react';
import { Button, Card, Icon, Radio } from 'antd';

const ButtonGroup = Button.Group;

export default class sss extends Component {

    state = {
        loading: true,
        size: "default"
    }
    enterLoading = () => {
        this.setState({ loading: true });
    }

    isLoading = () => {
        let { loading } = this.state;
        if (loading) {
            this.setState({ loading: false });
        } else {
            this.setState({ loading: true });
        }
    }

    handleSizeChange = (e) => {
        this.setState({ size: e.target.value });
    }
    render() {
        let { size } = this.state
        return (
            <div>
                <Card title="基本按钮类型">
                    <Button type="primary" style={{ marginRight: 10 }}>Primary</Button>
                    <Button type="danger" style={{ marginRight: 10 }}>Danger</Button>
                    <Button type="link" style={{ marginRight: 10 }}>Link</Button>
                    <Button type="dashed" style={{ marginRight: 10 }}>Dashed</Button>
                    <Button>Default</Button>
                </Card>
                <Card title="带图标按钮类型" style={{ margin: "10px 0" }}>
                    <Button type="link" shape="circle" icon="search" />
                    <Button type="dashed" shape="circle" style={{ margin: "0 10px" }}>A</Button>
                    <Button type="primary" icon="step-backward">加油</Button>
                    <Button icon="question" style={{ margin: "0 10px" }}>加油</Button>
                    <Button type="danger" icon="question">最棒的</Button>
                </Card>

                <Card title="带loading按钮类型" style={{ margin: "10px 0" }}>
                    <Button type="primary" {...this.state}>Loading</Button>
                    <Button
                        type="primary"
                        loading={this.state.loading}
                        onClick={this.enterLoading}
                        style={{ margin: "0px 10px" }}
                    >
                        Click me!
                    </Button>
                    <Button type="primary" {...this.state} />
                    <Button type="primary" shape="circle" {...this.state} style={{ margin: "0px 10px" }} />
                    <Button type="danger" shape="round"{...this.state} />
                    <Button onClick={this.isLoading} style={{ marginLeft: 10 }}>改变loading状态</Button>
                </Card>

                <Card title="组合按钮类型" style={{ margin: "10px 0" }}>
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />
                            Go back
                        </Button>
                        <Button type="primary">
                            Go forward
                        <Icon type="right" />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup style={{ margin: "0px 10px" }}>
                        <Button type="primary" icon="cloud" />
                        <Button type="primary" icon="cloud-download" />
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="primary" size="small" icon="cloud" />
                        <Button type="primary" size="small" icon="cloud-download" />
                    </ButtonGroup>
                </Card>

                <Card title="尺寸大小按钮类型">
                    <Radio.Group value={size} onChange={this.handleSizeChange} style={{ marginRight: 10 }}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default" style={{ margin: "0 10px" }}>Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <Button type="primary" size={size}>
                        Primary
                    </Button>
                    <Button size={size} style={{ margin: "0 10px" }}>Normal</Button>
                    <Button type="dashed" size={size}>
                        Dashed
                    </Button>
                    <Button type="danger" size={size} style={{ margin: "0 10px" }}>
                        Danger
                    </Button>
                    <Button type="link" size={size}>
                        Link
                    </Button>
                </Card>
            </div>
        )
    }
}
