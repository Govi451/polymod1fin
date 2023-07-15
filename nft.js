const { ethers, upgrades } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("deploy.sol");
  const contract = await upgrades.upgradeProxy("0x096dc87756120e795796f421498829297f38bf18", Contract);

  const quantity = 5;
  await contract.mintNFT(quantity);
  console.log("Batch minting completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
