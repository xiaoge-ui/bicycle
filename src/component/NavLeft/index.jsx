import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import MenuConfig from './../../config/menuConfig';
import './index.less'

const { SubMenu } = Menu;

export default class NavLeft extends Component {
    state = {}

    componentDidMount() {
        const menuTree = this.renderTree(MenuConfig);
        this.setState({ menuTree });
    }
    //左侧菜单栏
    renderTree = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        {this.renderTree(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
                )
            }
        })
    }

    render() {
        let { menuTree } = this.state;
        return (
            <div className="nav-left">
                <div className="logo">
                    <img src="assets/logo-ant.svg" alt="" />
                    <h1>小可爱，来啦</h1>
                </div>
                <Menu mode="vertical" theme="dark">
                    {menuTree}
                </Menu>
            </div>
        )
    }
}
