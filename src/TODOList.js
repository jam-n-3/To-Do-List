import React from 'react';
import './App.css';
import {MdCheck, MdClose, MdEdit} from "react-icons/md";

class TODOList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editing: '', newVal: ''};
    }

    startEditing = (obj) => {
        this.setState({newVal: localStorage.getItem(obj)});
        this.setState({editing: obj});
    }

    edit = (event) => {
        this.setState({newVal: event.target.value});
    }

    stopEditing = (obj) => {
        localStorage.setItem(obj, this.state.newVal);
        this.setState({editing: ''});
    }

    cancelEdit = () => {
        this.setState({editing: ''});
    }

    render() {
        return (
            <div id={'list'}>
                {this.props.keys.map((obj)=>(
                    this.state.editing === obj ?
                        <div className={'entry'}>
                            <input value={this.state.newVal} onChange={this.edit} />
                            <MdCheck className={'edit'} color={'green'} onClick={()=>this.stopEditing(obj)} />
                            <MdClose className={'delete'} color={'red'} onClick={this.cancelEdit} />
                        </div>
                        :
                        <div className={'entry'}>
                            <p className={'text'}>{localStorage.getItem(obj)}</p>
                            <MdEdit className={'edit'} color={'blue'} onClick={()=>this.startEditing(obj)} />
                            <MdClose className={'delete'} color={'red'} onClick={()=>this.props.del(obj)} />
                        </div>
                ))}
            </div>
        )
    }
}

export default TODOList;
