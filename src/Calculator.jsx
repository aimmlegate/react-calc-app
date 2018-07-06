import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './assets/Calculator.css';

class Calculator extends Component {
  state = { screen: '0', calcState: 'READY' };

  pressHandlerAC = () => {};
  pressHandlerPM = () => {};
  pressHandlerOperand = () => {};
  pressHandler = val => () => {
    switch (this.state.calcState) {
      case 'READY':
        this.setState({ screen: `${val}`, calcState: 'INPUT' });
        break;
      case 'INPUT':
        this.setState({ screen: `${this.state.screen}${val}` });
        break;
      default:
        console.error('wtf');
    }
  };
  render() {
    return (
      <div className="app-wrapper">
        <div className="app-container">
          <div className="alert alert-dark return" role="alert">
            {this.state.screen}
          </div>
          <div className="calc-layout">
            <Button
              color="secondary"
              onClick={this.pressHandlerAC}>{(this.state.calcState === 'INPUT') ? 'C' : 'AC'}</Button>
            <Button
              color="secondary"
              onClick={this.pressHandlerPM('+/-')}>+/-</Button>
            <Button
              color="secondary"
              disabled>%</Button>
            <Button
              color="warning"
              onClick={this.pressHandlerOperand('/')}>/</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('7')}>7</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('8')}>8</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('9')}>9</Button>
            <Button
              color="warning"
              onClick={this.pressHandlerOperand('x')}>x</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('4')}>4</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('5')}>5</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('6')}>6</Button>
            <Button
              color="warning"
              onClick={this.pressHandlerOperand('-')}>-</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('1')}>1</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('2')}>2</Button>
            <Button
              color="secondary"
              onClick={this.pressHandler('3')}>3</Button>
            <Button
              color="warning"
              onClick={this.pressHandlerOperand('+')}>+</Button>
            <Button
              color="secondary zero-btn"
              onClick={this.pressHandler('0')}>0</Button>
            <Button
              color="secondary"
              onClick={this.pressHandlerOperand('.')}>.</Button>
            <Button
              color="warning"
              onClick={this.pressHandlerSumm}>=</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
