const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Demo7 test", () => {
  let owner;
  let other_addr;
  let demo;

  beforeEach(async () => {
    [owner, other_addr] = await ethers.getSigners();

    const DemoContract = await ethers.getContractFactory("Demo", owner);
    demo = await DemoContract.deploy(); // отправка транзакции
    await demo.deployed(); // ждем, когда транзакция будет выполнена
  });

  async function sendMoney(sender) {
    const amount = 100;

    const transactionData = {
      to: demo.address,
      value: amount,
    };

    const tx = await sender.sendTransaction(transactionData);
    await tx.wait();

    return [tx, amount];
  }

  it("should allow to send money", async () => {
    const [sendMoneyTx, amount] = await sendMoney(other_addr);
    console.log("sendMoneyTx", sendMoneyTx);

    await expect(() => sendMoneyTx).to.changeEtherBalance(demo, amount);

    const timestamp = (await ethers.provider.getBlock(sendMoneyTx.blockNumber))
      .timestamp;
    console.log("timestamp", timestamp);

    await expect(sendMoneyTx)
      .to.emit(demo, "Paid")
      .withArgs(other_addr.address, amount, timestamp);
  });

  it("should allow owner to withdraw funds", async () => {
    const [_, amount] = await sendMoney(other_addr);

    const tx = await demo.withdraw(owner.address);

    await expect(() => tx).to.changeEtherBalances(
      [demo, owner],
      [-amount, amount]
    );
  });

  it("should not allow owner to withdraw funds", async () => {
    const [_, amount] = await sendMoney(other_addr);

    await expect(
      demo.connect(other_addr).withdraw(owner.address)
    ).to.be.revertedWith("you are not an owner");

    // await expect(() => tx).to.changeEtherBalances(
    //   [demo, owner],
    //   [-amount, amount]
    // );
  });
});
