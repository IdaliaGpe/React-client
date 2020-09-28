import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

import TacoList from './TacoList';
import AddTaco from './AddTaco';

export default class Routes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Link to='/'>home</Link>
                <Link to='/addtaco'>agregar tacos</Link>
                <Switch>
                    <Route path='/addtaco' component={AddTaco}/>
                    <Route path='/' component={TacoList}/>
                </Switch>
            </BrowserRouter>
        );
    }
}