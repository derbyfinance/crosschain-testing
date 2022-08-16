const { ethers } = require("hardhat");
var { exec } = require('child_process');
const { setTimeout } = require("timers/promises");

const abi_omnicointer = require('../artifacts/contracts/Mocks/LayerZero/OmniCounter.sol/OmniCounter.json').abi;
const bytecode_omnicounter = require('../artifacts/contracts/Mocks/LayerZero/OmniCounter.sol/OmniCounter.json').bytecode;

const privateKey = process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : [];
const lz_endpoints = {
  "rinkeby": "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA",
  "mumbai": "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8"
};

const main = async () => {
    const deploying = async (testnet) => {
      // deploy
      let url = config.networks[testnet].url;
      let provider = ethers.getDefaultProvider(url);
      let wallet = new ethers.Wallet(privateKey, provider);
      let wallet_address = await wallet.getAddress();
      console.log("wallet address on %s: %s", testnet, wallet_address);

      console.log("deploying omnicounter on %s", testnet);
      let factory = new ethers.ContractFactory(abi_omnicointer, bytecode_omnicounter, wallet);
      let omnicointer = await factory.deploy(lz_endpoints[testnet]);
      await omnicointer.deployed();
      console.log("omnicointer_%s: %s", testnet, omnicointer.address);

    //   //verify source code Multichain contracts
    //   await setTimeout(60000); //timeout to make sure that Etherescan has processed the
    //   exec(`npx hardhat verify --network ${testnet} ${omnicointer.address} ${lz_endpoints[testnet]}`, (err, stdout, stderr) => {
    //       if (err) {
    //         console.error(err);
    //         return;
    //       }
    //       console.log(stdout);
    //   });
    }
    // await deploying("rinkeby");
    await deploying("mumbai");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 