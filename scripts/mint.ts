import { ethers } from 'hardhat';
import { connextArbitrumGoerli, connextGoerli } from '../test/helpers/addresses';

// import { abi } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
import { getContract, getTestnetSigner } from '../test/helpers/helpers';
import { abi } from '../test/helpers/testTokenAbi';

// set greeting to goerli
async function main() {
  const amount = ethers.utils.parseEther('100000');
  const address = '0x23b082f6bB8B6A0F51B5D4900Dc1b465d39024D8';

  const testToken = new ethers.Contract(connextArbitrumGoerli.token, abi);
  const signer = await getTestnetSigner();

  console.log(testToken);
  await testToken
    .connect(signer)
    .mint(address, amount)
    .then((tx: any) => tx.wait());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
