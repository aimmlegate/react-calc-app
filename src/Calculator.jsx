import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './assets/Calculator.css';
import { calc, isStrFloat } from './calc';

class Calculator extends Component {
  state = {
    oldBuffer: '0',
    buffer: '0',
    screen: '0',
    calcState: 'READY',
  };

  pressHandlerAC = () => {
    if (this.state.screen === '0') {
      this.setState({
        oldBuffer: '0',
        buffer: '0',
        screen: '0',
        calcState: 'READY',
      });
    } else {
      this.setState({ screen: '0', calcState: 'READY' });
    }
  };
  pressHandlerPM = () => {};
  pressHandlerOperand = val => () => {
    switch (this.state.calcState) {
      case 'INPUT': {
        const newBuffer = this.state.screen;
        const result = calc(val, this.state.oldBuffer, newBuffer);
        this.setState({
          buffer: newBuffer,
          screen: result,
          operation: val,
          calcState: 'OPERATION',
        });
        break;
      }
      case 'OPERATION':
        this.setState({ operation: val });
        break;
      default:
        console.error('wtf');
    }
  };
  pressHandler = val => () => {
    switch (this.state.calcState) {
      case 'READY':
        this.setState({ screen: `${val}`, calcState: 'INPUT' });
        break;
      case 'INPUT':
        this.setState({ screen: `${this.state.screen}${val}` });
        break;
      case 'OPERATION': {
        this.setState({
          buffer: this.state.buffer,
          screen: `${val}`,
          calcState: 'INPUT',
          oldBuffer: calc(this.state.operation, this.state.oldBuffer, this.state.buffer),
        });
        break;
      }
      default:
        console.error('wtf');
    }
  };
  pressHandlerSumm = () => {
    switch (this.state.calcState) {
      case 'READY': {
        const result = calc(this.state.operation, this.state.oldBuffer, this.state.buffer);
        this.setState({
          screen: result,
          oldBuffer: result,
        });
        break;
      }
      case 'INPUT': {
        const newBuffer = this.state.screen;
        const result = calc(this.state.operation, this.state.oldBuffer, newBuffer);
        this.setState({
          buffer: newBuffer,
          oldBuffer: result,
          screen: result,
          calcState: 'READY',
        });
        break;
      }
      case 'OPERATION': {
        const result = (this.state.oldBuffer === '0') ?
          calc(this.state.operation, this.state.buffer) :
          calc(this.state.operation, this.state.oldBuffer, this.state.buffer);
        this.setState({
          screen: result,
          oldBuffer: result,
        });
        break;
      }
      default:
        console.error('wtf');
    }
  };
  pressHandlerDivider = () => {

    switch (this.state.calcState) {
      case 'READY': {
        this.setState({
          screen: (isStrFloat(this.state.screen) ? this.state.screen : `${this.state.screen}.`),
          calcState: 'INPUT',
        });
        break;
      }
      case 'INPUT': {
        this.setState({
          screen: (isStrFloat(this.state.screen) ? this.state.screen : `${this.state.screen}.`),
        });
        break;
      }
      default:
        console.error('wtf');
    }
  }
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
              onClick={this.pressHandlerAC}>{(this.state.screen === '0') ? 'AC' : 'C'}</Button>
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
              onClick={this.pressHandlerDivider}>.</Button>
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
