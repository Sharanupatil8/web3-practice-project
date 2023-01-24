const { equal } = require("assert");
const assert = require("assert");
const ganache = require("ganache-cli");
const { describe, beforeEach } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;

//deploying the contract everytime we run tests
beforeEach(async () => {
  // get a list of all the accounts

  accounts = await web3.eth.getAccounts();

  // using one of the account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ["Hi there"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("has a default intial message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Bye").send({
      from: accounts[0],
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye");
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }
//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });
//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
