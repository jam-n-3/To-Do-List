import React from 'react';
import './App.css';
import {MdAdd} from "react-icons/md";
import TODOList from "./TODOList";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {newTODO: '', sortedKeys: []};
    }

    sortKeys = () => {
        if (localStorage.length > 0) {
            let lsArr = [];
            for (let i=0; i<localStorage.length; i++) {
                lsArr[i] = parseInt(localStorage.key(i));
            }
            let srtArr = lsArr.sort((a, b) => a - b);
            this.setState({sortedKeys: srtArr});
        }
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
        this.sortKeys();
    }

    deleteTODO = (key) => {
        localStorage.removeItem(key);
        this.setState({sortedKeys: Object.keys(localStorage)});
        this.sortKeys();
    }

    keySubmit = (event) => {
        if (event.key === 'Enter') {
            this.submitTODO(event);
        }
    }

    componentDidMount() {
        this.sortKeys();
    }

    render() {
        return (
            <div id={'body'}>

                <div id={'addBar'}>
                    <input className={'textIn'} type={'text'} value={this.state.newTODO}
                           onChange={this.writeTODO} placeholder={"Add New 'To Do'"} onKeyDown={this.keySubmit} />
                    <div className={'addBox'}>
                        <MdAdd className={'add'} color={'grey'} onClick={this.submitTODO} />
                    </div>
                </div>

                <div id={'heading'}>
                    <p>TO DO LIST</p>
                </div>

                <TODOList keys={this.state.sortedKeys} del={this.deleteTODO} />

                <span className={'bottom'} />
            </div>
        );
    }
}

export default App;
