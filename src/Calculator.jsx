import React, { Component } from 'react';
import { Button } from 'reactstrap';
import cn from 'classnames';
import './assets/Calculator.css';
import { calc, isStrFloat, togglePM } from './calc';

class Calculator extends Component {
  state = {
    oldBuffer: null,
    buffer: '0',
    screen: '0',
    calcState: 'READY',
    operation: '',
  };

  pressHandlerAC = () => {
    if (this.state.screen === '0') {
      this.setState({
        oldBuffer: null,
        buffer: '0',
        screen: '0',
        calcState: 'READY',
        operation: '',
      });
    } else {
      this.setState({ screen: '0', calcState: 'READY' });
    }
  };
  pressHandlerOperand = val => () => {
    switch (this.state.calcState) {
      case 'READY': {
        this.setState({ operation: val });
        break;
      }
      case 'INPUT': {
        const newBuffer = this.state.screen;
        const { oldBuffer, operation } = this.state;
        const result = (oldBuffer === null) ?
          newBuffer :
          calc(operation, this.state.oldBuffer, newBuffer);
        this.setState({
          calcState: 'READY',
          oldBuffer: result,
          buffer: newBuffer,
          screen: result,
          operation: val,
        });
        break;
      }
      default:
        console.error('error');
    }
  };
  pressHandler = val => () => {
    switch (this.state.calcState) {
      case 'READY': {
        this.setState({ calcState: 'INPUT', screen: val });
        break;
      }
      case 'INPUT': {
        const { screen } = this.state;
        this.setState({ screen: `${screen}${val}` });
        break;
      }
      default:
        console.error('error');
    }
  };
  pressHandlerSumm = () => {
    const { operation, oldBuffer, buffer } = this.state;
    switch (this.state.calcState) {
      case 'READY': {
        const result = calc(operation, oldBuffer, buffer);
        this.setState({ screen: result, oldBuffer: result });
        break;
      }
      case 'INPUT': {
        const newBuffer = this.state.screen;
        const result = calc(operation, oldBuffer, newBuffer);
        this.setState({
          calcState: 'READY',
          screen: result,
          oldBuffer: result,
          buffer: newBuffer,
        });
        break;
      }
      default:
        console.error('error');
    }
  };
  pressHandlerDivider = () => {
    const { screen } = this.state;
    switch (this.state.calcState) {
      case 'READY': {
        if (!isStrFloat(screen)) {
          this.setState({ calcState: 'INPUT', screen: `${screen}.` });
        }
        break;
      }
      case 'INPUT': {
        if (!isStrFloat(screen)) {
          this.setState({ screen: `${screen}.` });
        }
        break;
      }
      default:
        console.error('error');
    }
  }
  pressHandlerPM = () => {
    const { screen } = this.state;
    switch (this.state.calcState) {
      case 'READY': {
        this.setState({ screen: togglePM(screen), calcState: 'INPUT' });
        break;
      }
      case 'INPUT': {
        this.setState({ screen: togglePM(screen) });
        break;
      }
      default:
        console.error('error');
    }
  }
  render() {
    const returnCn = cn({
      alert: true,
      'alert-dark': true,
      return: true,
      'return-sm': (this.state.screen.length > 12),
      'return-xsm': (this.state.screen.length > 20),
    });
    return (
      <div className="app-wrapper">
        <div className="app-container">
          <div className={returnCn} role="alert">
            {this.state.screen}
          </div>
          <div className="calc-layout">
            <Button
              color="secondary"
              onClick={this.pressHandlerAC}>{(this.state.screen === '0') ? 'AC' : 'C'}</Button>
            <Button
              color="secondary"
              onClick={this.pressHandlerPM}>+/-</Button>
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
