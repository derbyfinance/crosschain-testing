import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = '0xeDb95D8037f769B72AAab41deeC92903A98C9E16'; // mumbai

  await deploy('DestinationGreeter', {
    from: deployer,
    args: [token],
    log: true,
    autoMine: true,
  });
};
export default func;
func.tags = ['DestinationGreeter'];
