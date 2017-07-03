import React, { Component } from 'react';
import '../css/index.css';

class Cell extends Component {  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { status } = this.props;
    if (status === 'dead') {
      this.props.addLivingCell(this.props.id);
    } else if (status === 'alive') {
      this.props.removeLivingCell(this.props.id);
    }
  }

  render() {  
    return (     
      <div className={`Cell ${this.props.status}`} onClick={() => this.handleClick()}></div>
    );
  }
}

export default Cell;
