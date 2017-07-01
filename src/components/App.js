import React, { Component } from 'react';
import '../css/index.css';

class App extends Component {
  constructor() {
    super()
    //this.generateRow = this.generateRow.bind(this);
  }

  generateRow() {
    
  }

  componentDidMount() {
    const grid = document.querySelector('.grid');
    console.log(grid);
    for (let i = 0; i < 67; i++) {
      grid.appendChild(document.createElement('div'));
    }
  }
/*
  generateRowCell(id) {
    console.log('hi');
    return '<div className="col"></div>';
  }*/

  render() {  
    return (
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-body">
          <div className="grid-wrap">
            <div className="grid">
              <div className="col"></div>
              <div className="col"></div>
              <div className="col"></div>
              {/*this.generateRow()*/}
            </div>
          </div>
        </div>
        <div className="App-footer">
        </div>
      </div>
    );
  }
}

export default App;
