import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';


export default class EditTaco extends Component{

    state = {
        taco: {},
        name: '',
        quantity: 0,
        pica: 'si',
        //nameField: this.nameFieldStart()
        showModal: false
    }

    catchName = event => this.setState({name: event.target.value});
    catchQuantity = event => this.setState({quantity: event.target.value});
    catchSpacyness = event => this.setState({pica: event.target.value});

    componentDidMount(){
        const tacoId = this.props.history.location.state.tacoId;
        axios.get(`http://localhost:5000/${tacoId}`)
        .then(reponse => reponse.data)
        .then(taco => {
            this.setState({taco: taco})
            console.log(this.state.taco)
        });
    }

    saveChanges = () => {
        this.handleClose();
        const {taco, name, quantity, pica} = this.state;
        axios.put(`http://localhost:5000/${taco.id}`, {
            name: name,
            quantity: quantity,
            pica: pica
        });
        this.props.history.push('/');
    }

    handleClose = () => {
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    /*nameFieldStart = ()=>{
        return <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                </div>
                <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                type="text" name="" id="taco-name" placeholder='eje: tu taco'
                aria-label="Default" aria-describedby="inputGroup-sizing-default" value={this.state.name}/>
            </div>; 
    } 
    
    nameFieldEdit = ()=> <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                        </div>
                        <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                        type="text" name="" id="taco-name" placeholder='eje: tu taco'
                        aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                    </div>; 

    editName = ()=>{
        this.setState({nameField: this.nameFieldEdit});
        console.log('click');
    }*/

    comprobarData= () =>{
        if(this.state.name==='' || this.state.quantity<=0) 
        {
            //console.log("escribe algo");

            this.handleShowData();
            
        }
        else {
            //console.log("no se que ta pasando")
            
            this.handleShow();
        }
    }

    handleShowData = () => {
        this.setState({showModalData: true});

    };

    handleCloseData = () => {
        this.setState({showModalData: false})
    };

    render() {
        const {name, quantity, pica, showModal} = this.state.taco;
        return (
             <Fragment>
                <br/>
                <h3>Editar Taco:</h3>
                    <br/>
                    <div className='form-group' style={{width: '50%'}}>
                    <label>{`Nombre Actual: ${name}`}</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            </div>
                            <input onClick={this.editName} onChange={this.catchName} className='form-control' 
                            type="text" name="" id="taco-name" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
                        </div>

                        <label>{`Valor Actual: ${quantity}`}</label>
                        <div className="input-group mb-3">
                            
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Cantidad</span>
                            </div>
                            <input onChange={this.catchQuantity} className='form-control' 
                            type="number" name="" id="taco-quantity" placeholder='eje: tu taco'
                            aria-label="Default" aria-describedby="inputGroup-sizing-default" />
                        </div>
                        <label>{`Valor Actual: ${pica}`}</label>
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
                            <button onClick={this.comprobarData} className='btn btn-dark' id="btn-post-taco">Guardar</button>
                        </div>
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar Cambios</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>¿Estas Seguro que quieres guardar estos cambios?</p>
                        <div className="row">
                        <div className="col-md-5">
                            <h4>Valores Nuevos</h4>
                            <h4>Nombre Taco:</h4>
                            <div>{this.state.name}</div>
                            <h4>Cantidad Taco:</h4>
                            <div>{this.state.quantity}</div>
                            <h4>Es picante:</h4>
                            <div>{this.state.pica}</div>
                        </div>
                        <div className="col-md-7">
                        <div> 
                            <h4>Valores Anteriores</h4>
                            <h4>Nombre Taco:</h4>
                            <div>{name}</div>
                            <h4>Cantidad Taco:</h4>
                            <div>{quantity}</div>
                            <h4>Es picante:</h4>
                            <div>{pica}</div>
                        </div>
                        </div>
                        </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleClose}>Cancelar</button>
                            <button variant="primary" onClick={this.saveChanges}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={this.state.showModalData} onHide={this.handleCloseData} >
                        <Modal.Header closeButton>
                            <Modal.Title> Syntax Error</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Complete el formulario</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleCloseData} >Cerrar</button>

                        </Modal.Footer>
                    </Modal>

            </Fragment>
        );
    }
}