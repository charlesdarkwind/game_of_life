import React, { Component } from 'react';
import Cell from './Cell';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.updateGrid = this.updateGrid.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.newGeneration = this.newGeneration.bind(this);
    this.addLivingCell = this.addLivingCell.bind(this);
    this.removeLivingCell = this.removeLivingCell.bind(this);
    this.addCell = this.addCell.bind(this);
    this.state = {
      initialized: false,
      ticking: false,
      activeCells: [],
      grid: [],
      next: [],
      livingCells: [],
      height: 0,
      width: 0
    }; 
  }
//[28,29],[28,30],[28,31]
  componentWillMount() {
    this.updateGrid();
  }

  componentDidMount() {
    /*
    this.timerID = setInterval(
      () => this.tick(),
      300
    );
    */
  }

  tick() {   
    if (this.state.ticking) {
      console.log('tick');
      const nextData = this.newGeneration(50, 70);
      this.setState({
        grid: nextData.next,
        livingCells: nextData.nextLiving,
        activeCells: nextData.nextActive
      });
    }
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
      width,
      nextActive: grid
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

    const { livingCells, grid } = this.state;
    const activeCells = [...livingCells, ...this.state.activeCells];
    const next = [];
    const nextLiving = [];
    const nextActive = [];

    // 1. Check if can replace .some for looking up the status of the cell

     // Creating next state array, livingCells and activeCells and returns to tick()
    activeCells.map(cell => {
       
        // console.log(activeCells);
        let status = '';
        const neighbours = this.determineNeighbours(cell[0], cell[1]);
        let liveNeighboursCount = 0;

        // If the state of the cell changed: push it and its 8 neighbours 
        const addToNextActive = (cell) => {
          nextActive.push(this.addCell(cell[0], cell[1], status));
          nextActive.push(neighbours.map(cell => grid[cell]));
        };

        // Count number of live cells in the neighbours
        neighbours.map(neigh => livingCells.map(val => {
          if (neigh[0] === val[0] && neigh[1] === val[1]) liveNeighboursCount++;
        }));

        // If alive & 2 or 3 live neighbours then stay alive
        if (livingCells.some((x) => x[0] === cell[0] && x[1] === cell[1]) && (liveNeighboursCount === 2 || liveNeighboursCount === 3)) {
          nextLiving.push(cell);
          nextActive.push(this.addCell(cell[0], cell[1], 'alive')); 
          // If dead & 3 live neighbours then become alive
        } else if (!livingCells.some((x) => x[0] === cell[0] && x[1] === cell[1]) && liveNeighboursCount === 3) {
          nextLiving.push(cell);
          nextActive.push(this.addCell(cell[0], cell[1], 'alive'));
        } else {
          nextActive.push(cell);
          status = 'dead';
        }

        // All of the cells for the next tick with their new status
        //next.push(this.addCell(cell[0], cell[1], status));    
    });

    return ({
      next,
      nextLiving,
      nextActive
    });
  }

  start() {
    this.setState({
      ticking: true
    });
  }

  pause() {
    console.log('pause');
    this.setState({
      ticking: false
    });
  }

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
    };

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
          <button className="pause" onClick={() => this.pause()}>Pause</button>
          <button className="newGenButton" onClick={() => this.newGeneration(50, 70)}>New generation</button>
        </div>
      </div>
    );
  }
}

export default App;
