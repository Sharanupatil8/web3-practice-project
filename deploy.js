const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "giraffe material champion edge item mention insane cloud close twist shallow hockey",
  "https://goerli.infura.io/v3/9f069cd3bbc84da5bb2d617aa2db33e0"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy from accounts", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi There!"],
    })
    .send({
      gas: "1000000",
      from: accounts[0],
    });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
