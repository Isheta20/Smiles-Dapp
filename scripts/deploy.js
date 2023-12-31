const hre = require("hardhat");

async function main() {
  const initSmiles = 10;
  const EthAssessment = await hre.ethers.getContractFactory("EthAvaxAssessment");
  const ethassessment = await EthAssessment.deploy(initSmiles);
  await ethassessment.waitForDeployment();

  const address = await ethassessment.getAddress();
  console.log("EthAvaxAssessment is deployed to: ",address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
