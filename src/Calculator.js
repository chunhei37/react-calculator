import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faBackspace } from '@fortawesome/free-solid-svg-icons'
import "./Calculator.css";
import "./bootstrap.min.css";

function NumKey(props) {
  return (
    <div className={'numkey' + (props.isFun ? ' funKey' : '')} data-value={props.value} onClick={props.onClick}>
      <span className={'pt-1'}>{props.text}</span>
    </div>
  );
}

class NumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleKeyClick(e.currentTarget.dataset.value);
  }

  numKey(i, t, isFun) {
    isFun = typeof (isFun) == 'undefined' ? true : false;
    return <NumKey key={i} value={i} onClick={i => this.handleClick(i)} text={t} isFun={isFun} />;
  }

  multiNumKeys(i) {
    return i.map(x => this.numKey(x, x, 'false'));
  }

  render() {
    return (
      <Container>
        <Row>
          {this.numKey('percentage', (<span>&#37;</span>))}{this.numKey('sqrt', (<span>&#8730;</span>))}{this.numKey('square', (<span>x<sup>2</sup></span>))}{this.numKey('onedividex', (<span>&#x215F;<sub>x</sub></span>))}
        </Row>
        <Row>
          {this.numKey('ce', 'CE')}{this.numKey('c', 'C')}{this.numKey('backspace', (<FontAwesomeIcon icon={faBackspace} size="xs" />))}{this.numKey('divide', (<span>&#247;</span>))}
        </Row>
        <Row>
          {this.multiNumKeys([7, 8, 9])}{this.numKey('times', (<span>&#215;</span>))}
        </Row>
        <Row>
          {this.multiNumKeys([4, 5, 6])}{this.numKey('minus', (<span>&#8722;</span>))}
        </Row>
        <Row>
          {this.multiNumKeys([1, 2, 3])}{this.numKey('plus', (<span>&#43;</span>))}
        </Row>
        <Row>
          {this.numKey('negate', (<span>&#177;</span>))}
          {this.numKey('0', '0', false)}
          {this.numKey('dot', (<span>&#8901;</span>))}
          {this.numKey('equal', (<span>&#61;</span>))}
        </Row>
      </Container>
    );
  }
}

class DisplayPanel extends React.Component {
  render() {
    return (
      <Container className="displayPanel mb-2">
        <Row>
          <span className="upperPart">{this.props.upperMsg}</span>
        </Row>
        <Row>
          <span className="bottomPart">{this.props.bottomMsg}</span>
        </Row>
      </Container>
    );
  };
}

export default class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      prevAction: null,
      prevNum: 0,
      upperMsg: '',
      bottomMsg: '',
      isOutput: false,
    }

    this.handleKeyClick = this.handleKeyClick.bind(this);
  }

  // updateOutput = bool => this.setState({ isOutput: bool });
  // updateRecentInput = str => this.setState({ recentInput: str });
  // updatePrevAction = str => this.setState({prevAction: str});

  updateMsg(str, msg) {
    if(typeof(msg) == 'undefined' || msg === null) {
      return str;
    } else {
      return `${msg}${str}`;
    }
  }

  reset(isAll) {
    if(isAll) {
      this.setState({
      prevAction:null,
      prevNum: null,
      upperMsg:''
      });
    }
    this.setState({bottomMsg:0});
  }

  handleKeyClick(action) {
    // alert(action);
    let str,
    bottomMsg = this.state.bottomMsg,
    upperMsg = this.state.upperMsg;
    switch(String(action)) {
      case 'equal':
        break;
      case 'c':
        this.reset(true);
        break;
      case 'ce':
        this.reset(false);
        break;
      case 'plus':
        bottomMsg = null;
        break;
      case 'minus':
        break;
      case 'times':
        break;
      case 'divide':
        break;
      case 'percentage':
        break;
      case 'backspace':
        break;
      case 'square':
        break;
      case 'dot':
        break;
      case 'negate':
        break;
      case 'onedividex':
        break;
      case 'sqrt':
        break;
      default:
          str = Number(action);
          if(bottomMsg != null) {
            this.setState({bottomMsg:this.updateMsg(str, bottomMsg)});
          } else {
            this.setState({upperMsg:this.updateMsg(str, upperMsg)});
          }
    }
    
  }
  
  // calculate(num) {
  //   let action = this.state.prevAction,
  //     prevNum = this.state.prevNum,
  //     result = 0;
  //     console.log(action);
  //   switch (action) {
  //     case 'times': result = prevNum * num;
  //       break;
  //     case 'plus': result = prevNum + num;
  //       break;
  //     case 'minus': result = prevNum - num;
  //       break;
  //     case 'divide': result = prevNum / num;
  //       break;
  //     case 'sqrt': result = Math.sqrt(num);
  //       break;
  //     default:
  //       result = 'error';
  //   }
  //   this.updateRecentInput(result);
  //   return result;
  // }


  // handleKeyClick(input) {
  //   let num = Number(this.state.recentInput),
  //     record = null;
  //   if (this.state.isOutput) {
  //     this.updateOutput(false);
  //     num = 0;
  //   }
  //   switch ('' + input) {
  //     case 'equal':
  //       num = this.calculate(num);
  //       this.updateOutput(true);
  //       this.setState({ recordedInput: '' })
  //       break;
  //     case 'sqrt':
  //       record = 'sqrt(' + num + ')';
  //       num = this.calculate(num);
  //       this.updateOutput(true);
  //       break;
  //     case 'times':
  //       record = num + ' x ';
  //       this.updateOutput(true);
  //       break;
  //     case 'plus':
  //       this.updatePrevAction(input);
  //       record = num + ' + ';
  //       this.updateOutput(true);
  //       break;
  //     case 'c': this.setState({ recordedInput: '' });
  //     // eslint-disable-next-line no-fallthrough
  //     case 'ce': num = 0;
  //       break;
  //     case 'backspace':
  //       num = Number(String(num).slice(0, -1));
  //       break;
  //     case 'negate':
  //       if (num < 0) {
  //         num = Math.abs(num);
  //       } else {
  //         num = -Math.abs(num);
  //       }
  //       break;
  //     default:
  //       if (num === 0) {
  //         num = `${input}`;
  //       } else {
  //         num = `${num}${input}`;
  //       }
  //   }
  //   if (record) {
  //     this.setState({ prevNum: num })
  //     this.setState({ recordedInput: record })
  //   }
  //   this.updateRecentInput(num);
  // }

  render() {
    return (
      <Container className="pt-5">
        <h1 className="text-light text-center">{(<FontAwesomeIcon icon={faCalculator} size="xs" />)} Calculator</h1>
        <Row>
            <Card className="mx-auto" style={{width: '20rem'}}>
              <Card.Body className="mx-auto">
                <DisplayPanel upperMsg={this.state.upperMsg} bottomMsg={this.state.bottomMsg}>
                </DisplayPanel>
                <NumPad handleKeyClick={this.handleKeyClick}>
                </NumPad>
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
}
