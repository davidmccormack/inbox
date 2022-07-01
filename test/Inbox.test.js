// testing library
const assert = require('assert');

// tool to run a local ethereum network and deploy our contract
// supplies us with test accounts that we can use
const ganache = require('ganache-cli');

// library for interacting with smart contract's ABI via JavaScript
// note: web3 exports a constructor function (hence the capital letter in the const name).
const Web3 = require('web3')

// A 'provider' is an interface to connect to an ethereum network
// (could be a local ganache network or the real eth network).
const web3 = new Web3(ganache.provider());

/*
* Test structure is as follows
* 1. Deploy contract in a beforeEach
* 2. Modify contract
* 3. Perform Assertions
* */


// Get compiled contract interface & bitecode from our compiled contract
const { interface, bytecode } = require('../compile');
let _accounts;
let _inbox;

beforeEach(async () => {
    // Get a list of all accounts
    _accounts = await web3.eth.getAccounts();


    // Use one of those accounts to deploy the contract
    const deployOptions = {
        data: bytecode,
        arguments: ['Hi there!']
    }
    _inbox = await new
        web3.eth.Contract(JSON.parse(interface))            // loads interface into a new contract
        .deploy(deployOptions)                              // loads bitecode and initial value into contract
        .send({from: _accounts[0], gas:1000000})    // creates a transaction to append contract to blockchain.
                                                            // _inbox = reference to inbox contract.
})

describe('Inbox', function () {

    it('should deploy the Inbox contract', () => {
        assert.ok(_inbox.options.address);
    })

    it('has an initial message', async () => {
        // All contract methods can be found within the .methods interface.
        const message = await _inbox.methods.message().call();
        assert.strictEqual(message, "Hi there!");
    })

    it('can change the message', async () => {
        const NEW_MESSAGE = "Hello World!"
        await _inbox.methods.setMessage(NEW_MESSAGE).send(_accounts[0]);
        const message = await _inbox.methods.message().call();
        assert.strictEqual(message, NEW_MESSAGE);
    })



});

