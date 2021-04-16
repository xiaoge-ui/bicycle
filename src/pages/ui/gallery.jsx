import React, { Component } from 'react';
import { Card, Row, Col, Modal } from 'antd';

const { Meta } = Card;
export default class Gallery extends Component {

    state = {
        visible: false,
        imgs: null,
    }

    haddleClick = (value) => {
        this.setState({ visible: true, imgs: "gallery/" + value });
    }
    render() {
        const imgUrl = [
            ["1.png", "2.png", "3.png", "4.png", "5.png"],
            ["6.png", "7.png", "8.png", "9.png", "10.png"],
            ["11.png", "12.png", "13.png", "14.png", "15.png"],
            ["16.png", "17.png", "18.png", "19.png", "20.png"],
            ["21.png", "22.png", "23.png", "24.png", "25.png"],
        ]
        let i = 0;
        const imgURL = imgUrl.map(item => item.map(value => {
            return (
                <Card
                    key={i++}
                    hoverable={true}
                    cover={<img alt={value} src={`gallery/${value}`} />}
                    onClick={() => this.haddleClick(value)}
                >
                    <Meta title={value} description={`时尚品牌${value}`} />
                </Card>
            )
        }))
        return (
            <div>
                <Row>
                    <Col md={5}>
                        {imgURL[0]}
                    </Col>
                    <Col md={5}>
                        {imgURL[1]}
                    </Col>
                    <Col md={5}>
                        {imgURL[2]}
                    </Col>
                    <Col md={5}>
                        {imgURL[3]}
                    </Col>
                    <Col md={4}>
                        {imgURL[4]}
                    </Col>
                </Row>
                <Modal
                    title="图片详情"
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                    width={600}
                >
                    <img src={this.state.imgs} alt={this.state.imgs} style={{ width: "100%" }} />
                </Modal>
            </div>
        )
    }
}
