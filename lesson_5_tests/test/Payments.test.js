const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Payments smart contract", () => {
  let payments;
  let acc1;
  let acc2;

  beforeEach(async () => {
    [acc1, acc2] = await ethers.getSigners();
    const Payments = await ethers.getContractFactory("Payments", acc1);
    payments = await Payments.deploy(); // отправка транзакции
    await payments.deployed(); // ждем, когда транзакция будет выполнена

    console.log("----payments.address", payments.address);
  });

  it("should be deployed", async () => {
    expect(payments.address).to.be.properAddress;
    console.log("success");
  });

  it("should has 0 ethers by default", async () => {
    const balance = await payments.currentBalance();
    console.log("balance", balance);
    expect(balance).to.eq(0);
  });

  it("should be posible to send funds", async () => {
    const SUM = 100;
    const MSG = "Hello from test";

    const transaction = await payments.connect(acc2).pay(MSG, { value: SUM });

    await expect(() => transaction).to.changeEtherBalances(
      [acc2, payments],
      [-SUM, SUM]
    );
    await transaction.wait();

    const balance = await payments.currentBalance();
    console.log("---balance", balance);

    const newPayment = await payments.getPayment(acc2.address, 0);

    console.log("---new payment", newPayment);

    expect(newPayment.message).to.eq(MSG);
    expect(newPayment.amount).to.eq(SUM);
    expect(newPayment.from).to.eq(acc2.address);

    // const ava = await ethers.getSigners();
    // console.log("---ava", ava[0]);
  });
});
