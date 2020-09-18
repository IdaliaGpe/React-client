import React, {Component} from 'react';
import AddTaco from './AddTaco';
import Container from './Container';
import PageTitle from './PageTitle';
import TacoList from './TacoList';
//import axios from 'axios';

export default class TacosAdmin extends Component{

    render() {
        return (
            <Container>
                <PageTitle text='Tacos Js' color='purple' fontSize={5}/>
                <TacoList/>
                <AddTaco/>
            </Container>
        );
    }
}