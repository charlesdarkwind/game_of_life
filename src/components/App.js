import React, { Component } from 'react';
import Cell from './Cell';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.start = this.start.bind(this);

    // The grid is a 2 dimensional array of rows and columns
    this.state = {
      initialized: false,
      grid: [],
      next: [],
      height: 0,
      width: 0
    } 
  }

  componentWillMount() {
    return this.state.initialized ? null : this.generateGrid(50, 70);
  }

  generateGrid(height, width) {
    const grid = [];
    for (let i = 0; i < height; i++) {
      grid.push([]);
      for (let j = 0; j < width; j++) {
        grid[i].push(
          <Cell          
            key={[i, j]}
            id={[i, j]}
            status={'dead'}
          />);
      }    
    }

    this.setState({
      initialized: true,
      grid,
      height,
      width
    });
  }

  start() {
    console.log(this.determineNeighbours([50, 70]));
  }

  determineNeighbours(cell) {

    // Determines the surrounding neighbours of a cell
    // and "wraps" the edges of the grid resulting 
    // in an infinite grid effect.

    //  0 1 2
    //  3   4
    //  5 6 7

    const { height, width } = this.state;
    const row = cell[0];
    const col = cell[1];

    const neighbourTopRow = () => row - 1 === -1 ? height - 1 : row - 1;
    const neighbourBotRow = () => row + 1 === height + 1 ? 0 : row + 1;
    const neighbourLeftCol = () => col - 1 === -1 ? width : col - 1;
    const neighbourRightCol = () => col + 1 === width + 1 ? 0 : col + 1;

    const arr = [
      [neighbourTopRow(), neighbourLeftCol()], 
      [neighbourTopRow(), col], 
      [neighbourTopRow(), neighbourRightCol()], 
      [row, neighbourLeftCol()], 
      [row, neighbourRightCol()], 
      [neighbourBotRow(), neighbourLeftCol()], 
      [neighbourBotRow(), col], 
      [neighbourBotRow(), neighbourRightCol()]
    ];

    /*
    switch(i) {
      case 0:
      // row - 1, col - 1 
        arr.push([neighbourTopRow(), neighbourLeftCol()]);
        break;
      case 1:
      // row - 1, same col
        arr.push([neighbourTopRow(), col]);
        break;
      case 2:
      // row - 1, col + 1
        arr.push([neighbourTopRow(), neighbourRightCol()]);
        break;
      case 3:
      // same row, col - 1
        arr.push([row, neighbourLeftCol()]);
        break;
      case 4:
        // same row, col + 1
        arr.push([row, neighbourRightCol()]);
        break;
      case 5:
        // row + 1, col - 1
        arr.push([neighbourBotRow(), neighbourLeftCol()]);
        break;
      case 6:
        // row + 1, same col
        arr.push([neighbourBotRow(), col]);
        break;
      case 7:
        // row + 1, col + 1
        arr.push([neighbourBotRow(), neighbourRightCol()]);
        break;
    }
    */
    return arr;
  }

  render() {  
    return (     
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-body">
          <div className="grid-wrap">
            <div className="grid">
              {this.state.grid}
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
