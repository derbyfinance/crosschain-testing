import { ethers } from 'hardhat';
import { connextGoerli, connextMumbai } from '../test/helpers/addresses';
import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting and send funds to mumbai
async function main() {
  const destination = '0xf8c56205CFfF96C7032ee251d61E1A007cF1aa48';
  const destinationDomain = connextGoerli.id;
  const newGreeting = 'Van Opti naar Goerli';
  const relayerFee = ethers.utils.parseEther('0.025');

  const sourceContract = await getContract('AuthGreeterGoerliOptimism', 'AuthGreeter');
  const signer = await getTestnetSigner();

  console.log(sourceContract.address);

  await sourceContract
    .connect(signer)
    .xUpdateGreeting(destination, destinationDomain, newGreeting, relayerFee, {
      value: relayerFee,
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
