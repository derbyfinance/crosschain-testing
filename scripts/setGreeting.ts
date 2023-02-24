import { deployments, ethers, getNamedAccounts } from 'hardhat';
import { goerliTestToken } from '../test/addresses';

import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';

// set greeting and send funds to mumbai
async function main() {
  const amount = 1_000;
  const destination = '0x79295ebe9CA600Ec831eFa892768F6227ca0b335';
  const destinationDomain = 9991;
  const newGreeting = 'Mooi hoor';
  const relayerFee = ethers.utils.parseEther('0.03');

  const { deployer } = await getNamedAccounts();
  const signer = ethers.provider.getSigner(deployer);

  const deployment = await deployments.get('SourceGreeter');
  const source = await ethers.getContractAt('SourceGreeter', deployment.address);

  const testToken = new ethers.Contract(goerliTestToken, abi);

  await testToken
    .connect(signer)
    .approve(source.address, amount)
    .then((tx: any) => tx.wait());

  await source
    .connect(signer)
    .xUpdateGreeting(destination, destinationDomain, newGreeting, amount, relayerFee, {
      value: relayerFee,
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
