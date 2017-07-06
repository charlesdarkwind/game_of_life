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
      livingCells: [[28,29],[28,30],[28,31]],
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
      300
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

  newGeneration(height, width) {

    const { livingCells } = this.state;
    const next = [];
    const nextLivingGen = [];

     // Creating next state array   
    for (let i = 0; i < height; i++) {
      next.push([]);
      for (let j = 0; j < width; j++) {  
       
        const cell = [i, j];
        let status = '';
        const neighbours = this.determineNeighbours(i, j);
        let liveNeighboursCount = 0;

        // Count number of live cells in the neighbours
        neighbours.map(neigh => livingCells.map(val => {
          if (neigh[0] === val[0] && neigh[1] === val[1]) liveNeighboursCount++;
        }));

        // If alive & 2 or 3 live neighbours then stay alive
        if (livingCells.some((x) => x[0] === i && x[1] === j) && (liveNeighboursCount === 2 || liveNeighboursCount === 3)) {
          nextLivingGen.push(cell);
          status = 'alive';  
          
          // If dead & 3 live neighbours then become alive
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

  // }

  determineNeighbours(row, col) {
    // Determines the surrounding neighbours of a cell
    // and "wraps" the edges of the grid resulting 
    // in an infinite (torroidal) grid effect.

    //  0 1 2
    //  3   4
    //  5 6 7

    const { grid, height, width } = this.state;

    // The modulo operator does all the job
    const getElement = (row, col) => {
      return [((row % 50) + 50) % 50,((col % 70) + 70) % 70];
    }

        return ([
      getElement(row - 1, col - 1), 
      getElement(row - 1, col), 
      getElement(row - 1, col + 1), 
      getElement(row, col - 1), 
      getElement(row, col + 1), 
      getElement(row + 1, col - 1), 
      getElement(row + 1, col), 
      getElement(row + 1, col + 1)
    ]);
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
