import React, { Component } from 'react';
import '../css/index.css';

class Cell extends Component {  
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.status // dead, alive, trans-live, trans-dead 
    }
  }
  render() {  
    return (     
      <div className={`Cell ${this.props.status}` } onClick={() => console.log(this.props.id)}></div>
    );
  }
}

export default Cell;
