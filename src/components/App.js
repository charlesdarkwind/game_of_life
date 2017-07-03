import React, { Component } from 'react';
import Cell from './Cell';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.updateGrid = this.updateGrid.bind(this);
    this.start = this.start.bind(this);
    this.newGeneration = this.newGeneration.bind(this);

    // The grid is a 2 dimensional array of rows and columns
    this.state = {
      initialized: false,
      grid: [],
      nextGrid: [],
      livingCells: [],
      height: 0,
      width: 0
    }; 
  }

  componentWillMount() {
    this.updateGrid();
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

  updateGrid() {
    return this.state.initialized ? this.state.grid : this.generateGrid(50, 70);
  }

  start() {
    const copy = this.state.grid;
    copy[30][30] = <Cell          
            key={[30, 30]}
            id={[30, 30]}
            status={'alive'}
          />;
    this.setState({
      grid: copy
    });
  }

  determineNeighbours(cell) {

    // Determines the surrounding neighbours of a cell
    // and "wraps" the edges of the grid resulting 
    // in an infinite grid effect

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

    return [
      [neighbourTopRow(), neighbourLeftCol()], 
      [neighbourTopRow(), col], 
      [neighbourTopRow(), neighbourRightCol()], 
      [row, neighbourLeftCol()], 
      [row, neighbourRightCol()], 
      [neighbourBotRow(), neighbourLeftCol()], 
      [neighbourBotRow(), col], 
      [neighbourBotRow(), neighbourRightCol()]
    ];
  }

  newGeneration() {

  }

  addLivingCell() {

  }

  render() {  
    return (     
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-body">
          <div className="grid-wrap">
            <div className="grid">
              {this.updateGrid()}
            </div>
          </div>
        </div>
        <div className="App-footer">
          <button className="start" onClick={() => this.start()}>Start</button>
          <button className="newGenButton" onClick={() => this.newGeneration()}>New generation</button>
        </div>
      </div>
    );
  }
}

export default App;
