import React, { Component } from 'react';
import logo from './logo.png';
import TomatoList from './TomatoList.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  constructor() {
    super();

    var abi = JSON.parse('[ { "constant": true, "inputs": [], "name": "getTomatoCount", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "tomatoId", "type": "uint8" } ], "name": "getTomato", "outputs": [ { "name": "displayName", "type": "string" }, { "name": "description", "type": "string" }, { "name": "price", "type": "uint8" }, { "name": "status", "type": "uint8" }, { "name": "photoIpfsHash", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "message", "type": "string" } ], "name": "Log", "type": "event" }, { "constant": false, "inputs": [ { "name": "displayName", "type": "string" }, { "name": "description", "type": "string" }, { "name": "price", "type": "uint8" }, { "name": "status", "type": "uint8" }, { "name": "photoIpfsHash", "type": "string" } ], "name": "addTomato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]')
    var contractAbi = window.web3.eth.contract(abi)
    
    window.signedInUser = window.web3.eth.accounts[0]
    window.contract = contractAbi.at('0xbae2c018e38cbd9051af3c34c3fbb276a09a6e3b')

    var logEvent = window.contract.Log();

    logEvent.watch(function(error, result){
      if (!error)
          {
            //alert('Method: ' + result.args.methodName + ' Result: ' + result.args.result);
          } else {
            //alert(error);
          }
    });
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Black Market for Tomatos</h1>
          </header>
          <br />
            <TomatoList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
