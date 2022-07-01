const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const {interface, bytecode} = require('./compile');
const {RINKEBY_INFRA_URL, ACCOUNT_MNEMONIC} = require('./env');

const provider = new HDWalletProvider( {
    mnemonic: ACCOUNT_MNEMONIC,
    providerOrUrl: RINKEBY_INFRA_URL
})
const web3 = new Web3(provider);

const deploy = async () => {
    const _accounts = await web3.eth.getAccounts();

    const deployOptions = {
        data: bytecode,
        arguments: ["Hi there!"]
    }

    const contract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy(deployOptions)
        .send({gas: 1000000, from: _accounts[0]});

    console.log("Contract has been deployd to: " + contract.options.address);

}

deploy()
    .then(() => console.log("Deployed"))
    .catch(e => console.log(e));