import React, {Component, Fragment} from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

export default class TacoList extends Component{

    state = {
        tacos: [],
        currentTaco: {},
        showModal: false
    }

    selectedValue = 'active'

    tacoClick = id =>{
        console.log(id);
        axios.get(`http://localhost:5000/${id}`)
        .then(reponse => reponse.data)
        .then(taco => this.props.history.push({pathname: '/edittaco', state: {tacoId: taco.id}}));
    }

    
    componentDidMount(){
        this.watchCode();
    }

    deleteTaco = id =>{
        axios.delete(`http://localhost:5000/${id}`)
            .then(data=>this.props.history.push('/'));
    }

    onSelect = event => event.target.className = `list-group-item ${this.selectedValue}`;
    onDeselect = event => event.target.className = 'list-group-item';

    watchCode = ()=> setTimeout(()=>{
        axios.get('http://localhost:5000')
        .then(reponse => reponse.data)
        .then(tacos => {
            this.setState({tacos: tacos.map(taco =>{
                return <li className={`list-group-item`}>
                            Nombre del Taco: {taco.name}
                            <br></br><br></br>
                            <button onClick={this.handleDelete} className='btn btn-secondary' id="btn-delete-taco">Eliminar</button><span> </span>
                            <span> </span><button onClick={()=>this.tacoClick(taco.id)} className='btn btn-secondary' id="btn-put-taco">Modificar</button>
                        </li>
            })})
        });
        this.watchCode();
    }, 1000);

    saveChanges = () => {
        this.handleClose();
        
    }

    handleClose = () => {
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }
    
    handleShow = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }
    
    
    handleDelete = () => {
        this.setState({showModal: true});
        console.log(this.state.showModal);
    }

    handleShowDelete = () => {
        this.setState({showModalDelete: true});
        console.log(this.state.showModalDelete);
    };

    deleteTaco= id =>{
        axios.delete(`http://localhost:5000/${id}`)
        .then(data => this.props.history.push('/'));
        
    }

    render() {

        return (
            <Fragment>
                <ul style={{
                    cursor: 'pointer'
                }} className='list-group'>
                    {this.state.tacos}
                </ul>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eliminar</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>¿Estas seguro que quieres eliminar este taco?</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <button variant="secondary" onClick={this.handleClose}>Cancelar</button>
                            <button variant="primary" onClick={this.deleteTaco}>Confirmar</button>
                        </Modal.Footer>
                    </Modal>
            </Fragment>
        );
    }
}