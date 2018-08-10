import React, { Component } from 'react';
export class Square extends Component{
  render(){
    return(
      <button  buttonValue={ this.props.value }  className="btn btn-outline-info button" onClick={this.props.onClick } >{ this.props.value}</button>
    )
    
  }
}