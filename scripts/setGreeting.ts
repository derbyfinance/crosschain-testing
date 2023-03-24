import { ethers } from 'hardhat';
import { connextGoerli } from '../test/helpers/addresses';

import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting to goerli
async function main() {
  const amount = 1_000;
  const destination = '0xf8c56205CFfF96C7032ee251d61E1A007cF1aa48';
  const destinationDomain = 1735353714;
  const newGreeting = 'Opti => Goerli :';
  const relayerFee = ethers.utils.parseEther('0.035');

  const signer = await getTestnetSigner();
  const sourceContract = await getContract('SourceGreeter');
  const testToken = new ethers.Contract(connextGoerli.token, abi);

  // await testToken
  //   .connect(signer)
  //   .approve(sourceContract.address, amount)
  //   .then((tx: any) => tx.wait());

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
