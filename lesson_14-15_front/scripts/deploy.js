const hardHat = require("hardhat");
const ethers = hardHat.ethers;
const fs = require("fs");
const path = require("path");
async function main() {
  if (network.name === "hardhat") {
    console.warn("Use localhost");
  }

  const [deployer] = await ethers.getSigners();
  const address = await deployer.getAddress();

  console.log(`Depoloying with ${address}`);

  const DutchAuction = await ethers.getContractFactory(
    "DutchAuction",
    deployer
  );

  // вызывается конструктор контракта
  const auction = await DutchAuction.deploy(
    ethers.utils.parseEther("2.0"),
    1,
    "Motorbike"
  );

  await auction.deployed();

  saveFrontendFiles({
    DutchAuction: auction,
  });
}

function saveFrontendFiles(contracts) {
  const contractDir = path.join(__dirname, "..", "front/contracts");

  if (!fs.existsSync(contractDir)) {
    fs.mkdirSync(contractDir);
  }

  Object.entries(contracts).forEach((contractItem) => {
    const [name, contract] = contractItem;

    if (contract) {
      fs.writeFileSync(
        path.join(contractDir, "/", name + "-contract-address.json"),
        JSON.stringify({ [name]: contract.address }, undefined, 2)
      );
    }
    const ContractArtifact = hardHat.artifacts.readArtifactSync(name);

    fs.writeFileSync(
      path.join(contractDir, "/", name + ".json"),
      JSON.stringify(ContractArtifact, null, 2)
    );
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
