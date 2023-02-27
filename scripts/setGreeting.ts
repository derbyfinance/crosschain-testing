import { ethers } from 'hardhat';
import { connextGoerli } from '../test/helpers/addresses';

import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting and send funds to mumbai
async function main() {
  const amount = 1_000;
  const destination = '0x79295ebe9CA600Ec831eFa892768F6227ca0b335';
  const destinationDomain = 9991;
  const newGreeting = 'Mooi hoor';
  const relayerFee = ethers.utils.parseEther('0.03');

  const signer = await getTestnetSigner();
  const sourceContract = await getContract('SourceGreeter');
  const testToken = new ethers.Contract(connextGoerli.token, abi);

  await testToken
    .connect(signer)
    .approve(sourceContract.address, amount)
    .then((tx: any) => tx.wait());

  await sourceContract
    .connect(signer)
    .xUpdateGreeting(destination, destinationDomain, newGreeting, amount, relayerFee, {
      value: relayerFee,
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
