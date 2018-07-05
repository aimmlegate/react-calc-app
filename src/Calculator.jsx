import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './assets/Calculator.css';

class Calculator extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="app-container">
          <div className="alert alert-dark return" role="alert">
            123456789012
          </div>
          <div className="calc-layout">
            <Button color="secondary">AC</Button>
            <Button color="secondary">+/-</Button>
            <Button color="secondary">%</Button>
            <Button color="warning">/</Button>
            <Button color="secondary">7</Button>
            <Button color="secondary">8</Button>
            <Button color="secondary">9</Button>
            <Button color="warning">x</Button>
            <Button color="secondary">4</Button>
            <Button color="secondary">5</Button>
            <Button color="secondary">6</Button>
            <Button color="warning">-</Button>
            <Button color="secondary">1</Button>
            <Button color="secondary">2</Button>
            <Button color="secondary">3</Button>
            <Button color="warning">+</Button>
            <Button color="secondary zero-btn">0</Button>
            <Button color="secondary">,</Button>
            <Button color="warning">=</Button>
          </div>
        </div>
      </div> 
    );
  }
}

export default Calculator;
