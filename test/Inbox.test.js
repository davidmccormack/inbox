// testing library
const assert = require('assert');

// tool to run a local ethereum network
const ganache = require('ganache-cli');

// library for interacting with smart contract's ABI via JavaScript
// note: web3 exports a constructor function (hence the capital letter in the const name).
const Web3 = require('web3')

// A 'provider' is an interface to connect to an ethereum network
// (could be a local ganache network or the real eth network).
const web3 = new Web3(ganache.provider());



