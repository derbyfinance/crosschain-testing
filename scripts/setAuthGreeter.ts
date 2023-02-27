import { ethers } from 'hardhat';
import { connextGoerli, connextMumbai } from '../test/helpers/addresses';
import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting and send funds to mumbai
async function main() {
  const destination = '0xa92854ac369eb7cf4241fd2ebb01b9596892d07e';
  const destinationDomain = connextMumbai.id;
  const newGreeting = 'Heel mooi';
  const relayerFee = ethers.utils.parseEther('0.03');

  const sourceContract = await getContract('AuthGreeterGoerli', 'AuthGreeter');
  const signer = await getTestnetSigner();

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
