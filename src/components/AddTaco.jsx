import React, {Component, Fragment} from 'react';
import axios from 'axios';

export default class AddTaco extends Component{

    state = {
        name: '',
        quantity: 0,
        pica: 'si'
    }

    sendTaco = () =>{
        const {name, quantity, pica} = this.state;
        //console.log({name: name, quantity: quantity, pica: pica});

        axios.post('http://localhost:5000', {name: name, quantity: quantity, pica: pica})
        .then(response => response.data)
        .then(data => this.props.history.push('/'));
    }

    catchName = event => this.setState({name: event.target.value});
    catchQuantity = event => this.setState({quantity: event.target.value});
    catchSpacyness = event => this.setState({pica: event.target.value});

    render() {
        return (
            <Fragment>
                <br/>
                <h3>Agregar Taco:</h3>
                    <br/>
                    <div className='form-group' style={{width: '50%'}}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input onChange={this.catchName} className='form-control' 
                            type="text" name="" id="taco-name" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input onChange={this.catchQuantity} className='form-control' 
                            type="number" name="" id="taco-quantity" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>
                       
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">¿Es picante? (Si/No):</span>
                            </div>
                            <label htmlFor="option-spyciness"></label>
                                <select className='custom-select' onChange={this.catchSpacyness} id="option-spyciness" name="option-spyciness" style={{width: '20%'}}>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <button onClick={this.sendTaco} className='btn btn-secondary' id="btn-post-taco">Crear Taco</button>
                        </div>
                    </div>
            </Fragment>
        );
    }
}