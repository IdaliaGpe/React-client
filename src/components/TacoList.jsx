import React, {Component, Fragment} from 'react';
import axios from 'axios';

export default class TacoList extends Component{

    state = {
        tacos: [],
        currentTaco: {},
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

    onSelect = event => event.target.className = `list-group-item ${this.selectedValue}`;
    onDeselect = event => event.target.className = 'list-group-item';

    watchCode = ()=> setTimeout(()=>{
        axios.get('http://localhost:5000')
        .then(reponse => reponse.data)
        .then(tacos => {
            this.setState({tacos: tacos.map(taco =>{
                return <li className={`list-group-item`} key={taco.id} onClick={()=>this.tacoClick(taco.id)}
                onMouseOver={this.onSelect} onMouseOut={this.onDeselect}>
                            Nombre del taco: {taco.name}
                        </li>
            })})
        });

        this.watchCode();
    }, 1000);

    render() {

        const {name, quantity, pica} = this.state.currentTaco;
        return (
            <Fragment>
                <div className="card" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">La orden viene con {quantity} tacos y {pica} pica.</p>
                    </div>
                </div>
                <ul style = {{
                    cursor: 'pointer'
                }} className='list-group'>
                    {this.state.tacos}
                </ul>
            </Fragment>
        );
    }
}