import React, { Component } from 'react';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.state = {
      grid: [],
      next: []
    } 
  }

  generateGrid() {
    for (let i = 0; i < 3500; i++) {
      this.state.grid.push(<div className="col" key={i}></div>)
    }
    return this.state.grid;
  }

  start() {
    console.log('hi')
  }

  render() {  
    return (     
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-body">
          <div className="grid-wrap">
            <div className="grid">
              {
                this.generateGrid()
              }
            </div>
          </div>
        </div>
        <div className="App-footer">
          <button className="start" onClick={() => this.start()}>Start</button>
        </div>
      </div>
    );
  }
}

export default App;
