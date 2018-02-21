## Installation:

1. Install Metamask wallet as a browser extension: https://metamask.io/
2. Install Node.js: https://nodejs.org/en/download/package-manager/
3. Install React: https://reactjs.org/docs/installation.html#installing-react
4. Install Material UI: https://www.npmjs.com/package/material-ui
5. Install local Ethereum test network: https://www.npmjs.com/package/truffle-testrpc
6. Install IPFS: https://github.com/ipfs/go-ipfs#install

## Configure IPFS

1. Run `ipfs init`
1. `ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'` 
2. `ipfs config --json Gateway.HTTPHeaders.Access-Control-Allow-Origin '["*"]'`
3. Run `ipfs daemon`

## Running the dApp:

1. Spin off your Ethereum test network by running `testrpc`
2. Take the first private key from the list and use it in MetaMask wallet (make sure you're using private network on localhost)
3. Deploy the contract to blockchain with Remix (https://remix.ethereum.org)
4. Update the contract address in `/web/App.js`
5. Go to `/web/` folder
6. `npm install`
7. `npm start`

## Screenshots: 

[logo]: https://github.com/bdjukic/react-ethereum-ipfs/blob/master/screenshots/tomato_list.png "Tomato list"

[logo]: https://github.com/bdjukic/react-ethereum-ipfs/blob/master/screenshots/add_new_tomato.png "Adding new tomato"

