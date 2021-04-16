import React, { Component } from 'react';
import { Carousel, Card, } from 'antd';
import './carousel.less';

export default class Carousels extends Component {

    conChange = (a, b, c) => {
        console.log(a, b, c)
    }
    render() {
        return (
            <div>
                <Card title="基本跑马灯">
                    <Carousel afterChange={this.onChange}>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="自动播放的跑马灯" style={{ margin: "10px 0" }}>
                    <Carousel autoplay>
                        <div>
                            <img src="carousel-img/carousel-1.jpg" alt="" style={{ width: "100%", display: "inline-block" }} />
                        </div>
                        <div>
                            <img src="carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
