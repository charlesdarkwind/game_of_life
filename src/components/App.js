import React, { Component } from 'react';
import Cell from './Cell';
import '../css/index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.generateGrid = this.generateGrid.bind(this); 
    this.start = this.start.bind(this);
    this.state = {
      grid: [],
      next: []
    } 
  }

  generateGrid() {
    for (let i = 0; i < 3500; i++) {
      this.state.grid.push(
        <Cell          
          key={i}
          index={i}
          status={'dead'}
        />)
    }
    return this.state.grid;

    /*for (let i = 0; i < 3500; i++) {
      this.state.grid.push(<div className="col" key={i}></div>)
    }
    return this.state.grid;*/
  }

  start() {
    const copy = this.state.grid;
    copy[0] = <Cell key={0} index={0} status={'alive'} />;
    copy[90] = <Cell key={90} index={90} status={'alive'} />;
    copy[181] = <Cell key={181} index={181} status={'alive'} />;
    copy[110] = <Cell key={110} index={110} status={'alive'} />;
    copy[251] = <Cell key={251} index={251} status={'alive'} />;
    copy[321] = <Cell key={321} index={321} status={'alive'} />;
    copy[391] = <Cell key={391} index={391} status={'alive'} />;
    copy[461] = <Cell key={461} index={461} status={'alive'} />;
    copy[180] = <Cell key={180} index={180} status={'alive'} />;
    copy[110] = <Cell key={110} index={110} status={'alive'} />;
    copy[250] = <Cell key={250} index={250} status={'alive'} />;
    copy[320] = <Cell key={320} index={320} status={'alive'} />;
    copy[390] = <Cell key={390} index={390} status={'alive'} />;
    copy[460] = <Cell key={460} index={460} status={'alive'} />;
    this.setState({
      grid: copy
    });
  }

  determineNeighbours(cell) {
    // cell must be the index of the cell between 0 and 3499
    const neighbours = {
      '1': -72,
      '2': -71,
      '3': -70,
      '4': -1,
      '5': 1,
      '6': 69,
      '7': 70,
      '8': 71
    };
    const arr = [];
    let i = 0;
    for (const neighbour in neighbours) {
      let num = cell + parseInt(neighbours[i];
      if (num >= 0 && num <= 3499) {
        arr.push(num);
      } else if (num < 0) {
        arr.push()
      }
      
      i++;
    } 
  }

  makeLiveCell() {

  }

  makeDeadCell() {

  }

  render() {  
    return (     
      <div className="App">
        <div className="App-header">
        </div>
        <div className="App-body">
          <div className="grid-wrap">
            <div className="grid">
              {this.state.grid[0] ? this.state.grid : this.generateGrid()}
              {}
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
