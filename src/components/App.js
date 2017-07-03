import React, { Component } from 'react';
import Cell from './Cell';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.updateGrid = this.updateGrid.bind(this);
    //this.start = this.start.bind(this);
    this.newGeneration = this.newGeneration.bind(this);
    this.addLivingCell = this.addLivingCell.bind(this);
    this.removeLivingCell = this.removeLivingCell.bind(this);
    this.addCell = this.addCell.bind(this);

    // The grid is a 2 dimensional array of rows and columns
    this.state = {
      initialized: false,
      grid: [],
      next: [],
      livingCells: [],
      height: 0,
      width: 0
    }; 
  }

  componentWillMount() {
    this.updateGrid();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      400
    );
  }

  tick() {
    console.log('tick');
    const nextData = this.newGeneration(50, 70);
    this.setState({
      grid: nextData.next,
      livingCells: nextData.nextLivingGen
    });
  }

  generateGrid(height, width) {
    const grid = [];
    for (let i = 0; i < height; i++) {
      grid.push([]);
      for (let j = 0; j < width; j++) {
        grid[i].push(this.addCell(i, j, 'dead'));
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

  addCell(row, col, status) {
    return (
      <Cell          
            key={[row, col,]}
            id={[row, col,]}
            addLivingCell={this.addLivingCell}
            removeLivingCell={this.removeLivingCell}
            status={status}
          />
    );
  }

  // newGeneration(height, width) {

  // }

  newGeneration(height, width) {
    const { livingCells } = this.state;
    const next = [];
    const nextLivingGen = [];

    for (let i = 0; i < height; i++) {
      next.push([]);
      for (let j = 0; j < width; j++) {  
        // Creating next state array   
        const cell = [i, j];
        let status = '';
        const neighbours = this.determineNeighbours(cell);
        let liveNeighboursCount = 0;

        neighbours.forEach(neigh => livingCells.forEach(val => {
          if (neigh[0] === val[0] && neigh[1] === val[1]) liveNeighboursCount++;
        }));

        if (livingCells.some((x) => x[0] === i && x[1] === j) && (liveNeighboursCount === 2 || liveNeighboursCount === 3)) {
          nextLivingGen.push(cell);
          status = 'alive';    
        } else if (!livingCells.some((x) => x[0] === i && x[1] === j) && liveNeighboursCount === 3) {
          nextLivingGen.push(cell);
          status = 'alive'; 
        } else {
          status = 'dead';
        }
        next[i].push(this.addCell(i, j, status));
      }    
    }
    return ({
      next,
      nextLivingGen
    });
  }

  // start() {
  //   setInterval(function() {
  //     this.newGeneration(50, 70);
  //   }, 500);
  // }

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

  addLivingCell(id) {
    const { livingCells, grid } = this.state;
    grid[id[0]][id[1]] = this.addCell(id[0], id[1], 'alive');
    livingCells.push(id);
    this.setState({
      livingCells,
      grid
    });
  }

  removeLivingCell(id) {
    const { livingCells, grid } = this.state;
    const index = livingCells.map(x => {
      return x[0] === id[0] && x[1] === id[1] ? livingCells.indexOf(x) : null;
    });
    grid[id[0]][id[1]] = this.addCell(id[0], id[1], 'dead');
    livingCells.splice(index, 1);
    this.setState({
      livingCells,
      grid
    });
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
          <button className="newGenButton" onClick={() => this.newGeneration(50, 70)}>New generation</button>
        </div>
      </div>
    );
  }
}

export default App;
