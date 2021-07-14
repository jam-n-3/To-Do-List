import React from 'react';
import './App.css';
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

    componentDidMount() {
        this.sortKeys();
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

                <TODOList keys={this.state.sortedKeys} del={this.deleteTODO} />
            </div>
        );
    }
}

export default App;
