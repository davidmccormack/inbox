// we can't simply import our smart contract because it is solidity code, not javascript
// so node does not know how to import it.
// thus, we have to use a filestream.
const path = require('path');
const fs = require('fs');

// __dirname is a node variable that contains the project directory.
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// import solidity compiler and compile contact.
const solc = require('solc');

// Exporting compiled inbox contract.
// Now, whenever we import the compile file, we will have access to our compiled smart contract.
module.exports = solc.compile(source, 1).contracts[':Inbox'];