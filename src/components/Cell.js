import React, { Component } from 'react';
import '../css/index.css';

class Cell extends Component {  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      status: this.props.status // dead, alive, trans-live, trans-dead 
    }
  }

  handleClick() {
    const next = this.state.status === 'dead' ? 'alive' : 'dead';
    //this.props.addLivingCell(this.props.id);
    this.setState({
      status: next
    });
  }

  render() {  
    return (     
      <div className={`Cell ${this.state.status}` } onClick={() => this.handleClick()}></div>
    );
  }
}

export default Cell;
