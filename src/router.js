import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App'
import Admin from './Admin';
import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Modals from './pages/ui/modals';
import Spins from './pages/ui/spin';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/message';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import Login from './pages/form/login';
import Reg from './pages/form/reg';
import Basic from './pages/table/Basic';
import High from './pages/table/High';
import Rich from './pages/rich';
import City from './pages/city';
import Order from './pages/order';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Users from './pages/user/index';
import Common from './Common.jsx';
import Deatils from './pages/order/deatil';
import BikeMap from './pages/car/bikemap';
import Permission from './pages/permission';

export default class Router1 extends Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/common' render={() => {
                            return (
                                <Common>
                                    <Switch>
                                        <Route path='/common/detail/order/:id' component={Deatils} />
                                        <Route render={() => {
                                            return (
                                                <div>
                                                    没有找到页面
                                                </div>
                                            )
                                        }} />

                                    </Switch>
                                </Common>
                            )
                        }} />

                        <Redirect exact path="/" to="/home" />
                        <Route path='/' render={() => {
                            return (
                                <Admin>
                                    <Switch>
                                        <Route path='/home' component={Home} />
                                        <Route path='/ui/buttons' component={Buttons} />
                                        <Route path='/ui/modals' component={Modals} />
                                        <Route path='/ui/loadings' component={Spins} />
                                        <Route path='/ui/notification' component={Notifications} />
                                        <Route path='/ui/messages' component={Messages} />
                                        <Route path='/ui/tabs' component={Tabs} />
                                        <Route path='/ui/gallery' component={Gallery} />
                                        <Route path='/ui/carousel' component={Carousels} />
                                        <Route path='/form/login' component={Login} />
                                        <Route path='/form/reg' component={Reg} />
                                        <Route path='/table/basic' component={Basic} />
                                        <Route path='/table/high' component={High} />
                                        <Route path='/rich' component={Rich} />
                                        <Route path='/city' component={City} />
                                        <Route path='/order' component={Order} />
                                        <Route path='/charts/bar' component={Bar} />
                                        <Route path='/charts/pie' component={Pie} />
                                        <Route path='/charts/line' component={Line} />
                                        <Route path='/user' component={Users} />
                                        <Route path='/bikeMap' component={BikeMap} />
                                        <Route path='/permission' component={Permission} />

                                        <Route render={() => {
                                            return (
                                                <div>
                                                    没有找到页面
                                                </div>
                                            )
                                        }} />

                                    </Switch>
                                </Admin>
                            )
                        }} />

                    </Switch>
                </App>
            </Router>
        )
    }
}
