import React from 'react';
import './App.css';
import {MdClose} from "react-icons/md";

class App extends React.Component {
    render() {
        return (
            <div id={'body'}>

                <h1>TO DO LIST</h1>

                <form id={'add'}>
                    <label>
                        Add new TO DO:
                        <input id={'textin'} type={'text'} name={'new'}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>

                <div>
                    <input type={'checkbox'} name={'done'}/>
                    <p>Example</p>
                    <MdClose color={'red'}/>
                </div>

            </div>
        );
    }
}

export default App;
