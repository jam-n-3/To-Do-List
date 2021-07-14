import React from 'react';
import './App.css';
import {MdClose} from "react-icons/md";
import {MdEdit} from "react-icons/md";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {newTODO: '', TODOs: localStorage.length}
    }

    writeTODO = (event) => {
        this.setState({newTODO: event.target.value});
    }

    submitTODO = (event) => {
        this.setState({newTODO: ''});
        if (localStorage.length > 0) {
            localStorage.setItem((Math.max(...Object.keys(localStorage)) + 1).toString(), this.state.newTODO);
        }
        else {
            localStorage.setItem('0', this.state.newTODO);
        }
        event.preventDefault();
    }

    deleteTODO = (key) => {
        localStorage.removeItem(key);
        this.setState({TODOs: localStorage.length});
    }

    render() {
        return (
            <div id={'body'}>

                <h1>TO DO LIST</h1>

                <form id={'add'} onSubmit={this.submitTODO}>
                    <label>
                        Add new TO DO:
                        <input id={'textIn'} type={'text'} value={this.state.newTODO} onChange={this.writeTODO} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

                <div id={'list'}>
                    {Object.keys(localStorage).map((obj)=>(
                        <div className={'entry'}>
                            <p className={'text'}>{localStorage.getItem(obj)}</p>
                            <MdEdit className={'edit'} color={'blue'} />
                            <MdClose className={'delete'} color={'red'} onClick={()=>this.deleteTODO(obj)} />
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default App;
