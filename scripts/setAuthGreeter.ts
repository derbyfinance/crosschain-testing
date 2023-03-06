import { ethers } from 'hardhat';
import { connextGoerli, connextMumbai } from '../test/helpers/addresses';
import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';

// set greeting and send funds to mumbai
async function main() {
  const destination = '0xa92854Ac369Eb7Cf4241Fd2EbB01B9596892d07E';
  const destinationDomain = connextMumbai.id;
  const newGreeting = 'Goerli => mumbai tx4';
  const relayerFee = ethers.utils.parseEther('0.03');

  const sourceContract = await getContract('AuthGreeterGoerli', 'AuthGreeter');
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
/* 
ConnextExample Goerli => Mumbai DONE
https://testnet.connextscan.io/tx/0x06f7067742c6a9e7f393aae43b6cbf5dde787c71b6cff8203b5c82c237da6a65

AuthGreeter Goerli => Mumbai DONE
https://testnet.connextscan.io/tx/0x20231bc58a71d4e269b776e17f14ddaaad3ac70962275754f680400d7c5a74d4

XProvider Mumbai => Goerli PENDING
https://testnet.connextscan.io/tx/0xcfa0919a59732f29b9afe17e3631388d3309f09417ca0b66fa12b4c202ce94f7

XProvider Mumbai => Optimism Goerli PENDING
https://testnet.connextscan.io/tx/0xd26d1fef0c695707f6e8974af6e40d2a38450b5b72e441f2ec7cad073b5de097

XProvider GoerliOptimism => Goerli PENDING
https://testnet.connextscan.io/tx/0x6dd64a0b86cb015ed1043959d512bd39a6a38c54b9045318a7886df12b60134f?src=search

AuthGreeter GoerliOptimism => Goerli PENDING
https://testnet.connextscan.io/tx/0xbbe5acb557d4057fcb7d886a5e3d8d72dc05f039d26f12cb1ca90537d1adb265?src=search

NotAuthGreeter
https://testnet.connextscan.io/tx/0x0f5b26cec357892e882d6bd41580a96ec77e91db69fbe52f84a5e038e93fa39c?src=search

https://mumbai.polygonscan.com/tx/0x8927b4e77619e2e80252eaf623e3de06eceacc38c37c0a19c4074fb800095e08#eventlog
*/
