import React, { Component } from 'react';
import { Card, Button, notification, Icon } from 'antd';

export default class Notifications extends Component {

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }

    openNotification = (type) => {
        notification.info({
            message: `Notification ${type}`,
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement: type,
        });
    }
    render() {
        return (
            <div>
                <Card title="消息框">
                    <Button type="primary" onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
                    <Button type="dashed" onClick={() => this.openNotificationWithIcon('info')} style={{ margin: "0 10px" }}>Info</Button>
                    <Button type="link" onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                    <Button type="danger" onClick={() => this.openNotificationWithIcon('error')} style={{ marginLeft: 10 }}>Error</Button>
                </Card>

                <Card title="通知提醒框，自定义位置" style={{ margin: "10px 0" }}>
                    <Button type="primary" onClick={() => this.openNotification('topLeft')}>
                        <Icon type="radius-upleft" />
                        topLeft
                    </Button>
                    <Button type="primary" onClick={() => this.openNotification('topRight')} style={{ margin: "0px 10px" }}>
                        <Icon type="radius-upright" />
                        topRight
                    </Button>
                    <Button type="primary" onClick={() => this.openNotification('bottomLeft')}>
                        <Icon type="radius-bottomleft" />
                        bottomLeft
                    </Button>
                    <Button type="primary" onClick={() => this.openNotification('bottomRight')} style={{ margin: "0 10px" }}>
                        <Icon type="radius-bottomright" />
                        bottomRight
                    </Button>
                </Card>

                <Card title="其他类型通知框">
                    <Button type="primary" onClick={this.openNotification}>
                        唯一的key值，更新内容
                    </Button>
                    <Button type="primary" onClick={this.openNotification} style={{ margin: "0px 10px" }}>
                        自定义图标
                    </Button>
                </Card>
            </div>
        )
    }
    //唯一的key值
    openNotification = () => {
        notification.open({
            key: "update",
            message: 'Notification Title',
            description: 'description.',
        });
        setTimeout(() => {
            notification.open({
                key: "update",
                message: 'New Title',
                description: 'New description.',
            });
        }, 1000);
    }
    //自定义图标
    openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    }
}
