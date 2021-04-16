import React, { Component } from 'react';
import { Layout, Row } from 'antd';
import NavLeft from './component/NavLeft';
import Header from './component/Header';
import Footer from './component/Footer';
import './style/common.less'

const { Sider } = Layout;

export default class Admin extends Component {
    render() {
        return (
            <Layout className="container">
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    className="nav-left"
                >
                    <NavLeft />
                </Sider>
                <Layout className="main">
                    <Header />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Layout>
            </Layout>
        )
    }
}
