import React, { Component } from 'react';
import logo from './logo.png';
import TomatoList from './TomatoList.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import TomatoToolbar from './TomatoToolbar';

class App extends Component {
  constructor() {
    super();

    const ipfsScript = document.createElement("script");
    const fileBufferScript = document.createElement("script");

    ipfsScript.src = "https://unpkg.com/ipfs-api/dist/index.js";
    ipfsScript.async = true;

    fileBufferScript.src = "https://wzrd.in/standalone/buffer";
    fileBufferScript.async = true;

    ipfsScript.addEventListener('load', function () {
      // IPFS configuration once javascript library is loaded

      var ipfsHost    = '127.0.0.1';
      var ipfsAPIPort = '5001';
      var ipfsWebPort = '8080';

      window.ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort)
            
      window.ipfs.swarm.peers(function(err, response) {
        if (err) {
            console.error("Error while connecting to IPFS: " + err);
        } else {
            console.log("IPFS - connected to " + response.length + " peers.");
            console.log(response);
        }
      });
    });

    document.body.appendChild(ipfsScript);
    document.body.appendChild(fileBufferScript);

    // Ethreum configuration
    var abi = JSON.parse('[ { "constant": true, "inputs": [], "name": "getTomatoCount", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "tomatoId", "type": "uint8" } ], "name": "getTomato", "outputs": [ { "name": "displayName", "type": "string" }, { "name": "description", "type": "string" }, { "name": "price", "type": "uint8" }, { "name": "photoIpfsHash", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "methodName", "type": "string" }, { "indexed": false, "name": "message", "type": "string" } ], "name": "Log", "type": "event" }, { "constant": false, "inputs": [ { "name": "displayName", "type": "string" }, { "name": "description", "type": "string" }, { "name": "price", "type": "uint8" }, { "name": "status", "type": "uint8" }, { "name": "photoIpfsHash", "type": "string" } ], "name": "addTomato", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]')
    var contractAbi = window.web3.eth.contract(abi)
    
    window.signedInUser = window.web3.eth.accounts[0]
    window.contract = contractAbi.at('0x9e7fc37369d5a008f4d867d93acbfa6644bad091')
    
    window.contract.Log().watch(function(error, result) {
      if (!error) {
        alert("Tomato added!");
      } else {
        alert("Error while adding tomato: " + error);
      }
    });
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Black Market for Tomatoes</h1>
          </header>
          <TomatoToolbar />
          <br />
          <TomatoList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
